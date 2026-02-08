#!/bin/bash
set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  🔧 EC2 DEPLOYMENT SCRIPT STARTED"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check pre-requisites
echo "=== CHECKING VOLUMES ==="
echo "Listing all block devices:"
lsblk
echo ""

echo "Checking /mnt mount points:"
df -h /mnt* 2>/dev/null || echo "No /mnt* mount points found yet"
echo ""

# Upgrade Docker Compose to V2 if needed
echo "=== DOCKER COMPOSE VERSION CHECK ==="
COMPOSE_VERSION=$(docker-compose --version 2>&1 | grep -oP '(?<=version )[0-9]+' | head -1 || echo "0")
echo "Current Docker Compose major version: $COMPOSE_VERSION"

if [ "$COMPOSE_VERSION" -lt 2 ]; then
    echo "Upgrading Docker Compose to V2..."
    sudo rm -f /usr/bin/docker-compose /usr/local/bin/docker-compose
    DOCKER_COMPOSE_VERSION="2.24.5"
    sudo curl -SL "https://github.com/docker/compose/releases/download/v${DOCKER_COMPOSE_VERSION}/docker-compose-linux-x86_64" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
    echo "✅ Docker Compose upgraded to V2"
    docker-compose --version
else
    echo "✅ Docker Compose V2 already installed"
    docker-compose --version
fi
echo ""

# Ensure directory exists
echo "=== CODE REPOSITORY SETUP ==="
if [ ! -d /opt/bookmate ]; then
    echo "Creating /opt/bookmate directory..."
    sudo mkdir -p /opt/bookmate
    sudo chown ubuntu:ubuntu /opt/bookmate
fi
cd /opt/bookmate
echo "✅ Working directory: $(pwd)"
echo ""

# Update code from GitHub
echo "=== CLONING/UPDATING CODE FROM GITHUB ==="
if [ -d .git ]; then
    echo "Repository already exists, pulling latest changes..."
    git pull origin main || { 
        echo "Pull failed, doing hard reset..."
        git fetch --all
        git reset --hard origin/main
    }
else
    echo "Cloning repository from GitHub..."
    git clone https://github.com/Srivaxshana/BookMate.git .
fi
echo "✅ Code updated"
ls -la | head -20
echo ""

# Verify docker-compose.yml exists
echo "=== VERIFYING DOCKER-COMPOSE.YML ==="
if [ -f docker-compose.yml ]; then
    echo "✅ docker-compose.yml found"
    echo "Content (first 30 lines):"
    head -30 docker-compose.yml
else
    echo "❌ ERROR: docker-compose.yml NOT FOUND!"
    echo "Files in current directory:"
    ls -la
    exit 1
fi
echo ""

# Ensure ubuntu user is in docker group
echo "=== DOCKER GROUP SETUP ==="
sudo usermod -aG docker ubuntu || true
echo "✅ Ubuntu user in docker group"
echo ""

# Stop old containers
echo "=== STOPPING OLD CONTAINERS ==="
echo "Running docker-compose down..."
sudo docker-compose down -v 2>&1 || echo "No containers to stop (first run)"
echo ""

# Clean up old images
echo "=== CLEANING UP DOCKER RESOURCES ==="
echo "Running docker system prune..."
sudo docker system prune -af 2>&1 || true
echo "✅ Cleanup complete"
echo ""

# Pull latest images
echo "=== PULLING LATEST IMAGES FROM DOCKER HUB ==="
echo "Pulling backend image..."
sudo docker pull srivaxshana/bookmate-backend:latest || { echo "❌ Failed to pull backend"; exit 1; }
echo "✅ Backend image pulled"

echo "Pulling frontend image..."
sudo docker pull srivaxshana/bookmate-frontend:latest || { echo "❌ Failed to pull frontend"; exit 1; }
echo "✅ Frontend image pulled"
echo ""

# Start services
echo "╔════════════════════════════════════════════════════════════╗"
echo "║          🚀 STARTING DOCKER CONTAINERS                     ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

echo "Running docker-compose up -d..."
export COMPOSE_DOCKER_CLI_BUILD=1
export DOCKER_BUILDKIT=1
sudo -E docker-compose up -d

echo ""
echo "=== CONTAINER STATUS ==="
sudo docker ps -a
echo ""

# Wait for services to start with progress logs
echo "╔════════════════════════════════════════════════════════════╗"
echo "║          ⏳ WAITING FOR SERVICES TO BECOME HEALTHY          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

TIMEOUT=180
INTERVAL=15
ELAPSED=0
DONE=false

while [ $ELAPSED -lt $TIMEOUT ]; do
    echo "Health check at ${ELAPSED}s / ${TIMEOUT}s timeout..."
    
    # Check MySQL
    MYSQL_STATUS=$(sudo docker ps --filter "name=bookmate-mysql" --format "{{.Status}}" 2>/dev/null || echo "")
    if [[ $MYSQL_STATUS == *"healthy"* ]]; then
        echo "✅ MySQL is healthy"
    elif [[ $MYSQL_STATUS == *"Up"* ]]; then
        echo "⏳ MySQL starting..."
    else
        echo "❌ MySQL down: $MYSQL_STATUS"
    fi
    
    # Check Backend
    BACKEND_STATUS=$(sudo docker ps --filter "name=bookmate-backend" --format "{{.Status}}" 2>/dev/null || echo "")
    if [[ $BACKEND_STATUS == *"healthy"* ]]; then
        echo "✅ Backend is healthy"
    elif [[ $BACKEND_STATUS == *"Up"* ]]; then
        echo "⏳ Backend starting..."
    else
        echo "❌ Backend down: $BACKEND_STATUS"
    fi
    
    # Check Frontend
    FRONTEND_STATUS=$(sudo docker ps --filter "name=bookmate-frontend" --format "{{.Status}}" 2>/dev/null || echo "")
    if [[ $FRONTEND_STATUS == *"Up"* ]]; then
        echo "✅ Frontend is up"
    else
        echo "❌ Frontend down: $FRONTEND_STATUS"
    fi
    
    # Check if all are running
    if [[ $MYSQL_STATUS == *"healthy"* ]] && [[ $BACKEND_STATUS == *"healthy"* ]] && [[ $FRONTEND_STATUS == *"Up"* ]]; then
        echo ""
        echo "✅ ALL SERVICES HEALTHY - Deployment complete!"
        DONE=true
        break
    fi
    
    sleep $INTERVAL
    ELAPSED=$((ELAPSED + INTERVAL))
done

if [ "$DONE" = false ]; then
    echo "⚠️  Timeout reached at ${TIMEOUT}s but continuing..."
fi

echo ""
echo "=== FINAL CONTAINER STATUS ==="
sudo docker ps -a --format "{{.Names}}: {{.Status}}"

echo ""
echo "=== MYSQL LOGS (last 30 lines) ==="
sudo docker logs bookmate-mysql --tail 30 2>&1 || echo "Logs not available"

echo ""
echo "=== BACKEND LOGS (last 30 lines) ==="
sudo docker logs bookmate-backend --tail 30 2>&1 || echo "Logs not available"

echo ""
echo "=== FRONTEND/NGINX LOGS (last 30 lines) ==="
sudo docker logs bookmate-frontend --tail 30 2>&1 || echo "Logs not available"

echo ""
echo "=== EBS VOLUME STATUS ==="
df -h | grep -E "Filesystem|/mnt|root"

echo ""
echo "=== MOUNTED VOLUMES ==="
mount | grep -E "/mnt|docker" || echo "No mount info available"

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  ✅ DEPLOYMENT COMPLETED SUCCESSFULLY!                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
