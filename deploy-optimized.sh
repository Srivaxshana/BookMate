#!/usr/bin/env bash
set -e

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║     📦 BookMate Automated Deployment Script (OPTIMIZED)    ║"
echo "║     Using: docker-compose (standalone version)             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

APP_DIR="/opt/bookmate"
DOCKERHUB_USERNAME="srivaxshana"

# ==============================================================================
# STEP 1: Setup Directory & Prerequisites
# ==============================================================================
echo "=== STEP 1: SETUP DIRECTORY ==="
sudo mkdir -p "$APP_DIR"
cd "$APP_DIR"
echo "✅ Working directory: $(pwd)"
echo ""

# ==============================================================================
# STEP 2: Verify Prerequisites
# ==============================================================================
echo "=== STEP 2: VERIFYING PREREQUISITES ==="

# Check Docker
if ! command -v docker &> /dev/null; then
    echo "❌ ERROR: Docker not installed!"
    exit 1
fi
echo "✅ Docker: $(docker --version)"

# Check docker-compose (standalone, not docker compose v2)
if ! command -v docker-compose &> /dev/null; then
    echo "❌ ERROR: docker-compose (standalone) not found!"
    echo "   To install: sudo apt install -y docker-compose"
    exit 1
fi
echo "✅ Docker Compose: $(docker-compose --version)"

# Check Git
if ! command -v git &> /dev/null; then
    echo "❌ ERROR: Git not installed!"
    exit 1
fi
echo "✅ Git: $(git --version)"
echo ""

# ==============================================================================
# STEP 3: Clone/Update Repository
# ==============================================================================
echo "=== STEP 3: REPOSITORY SETUP ==="
if [ -d .git ]; then
    echo "📦 Repository exists, pulling latest code..."
    git pull origin main || {
        echo "⚠️  Pull failed, doing hard reset..."
        git fetch --all
        git reset --hard origin/main
    }
else
    echo "📦 Cloning repository from GitHub..."
    git clone https://github.com/Srivaxshana/BookMate.git . || {
        echo "❌ Clone failed - repository may already be partially initialized"
        exit 1
    }
fi
echo "✅ Repository synchronized"
echo ""

# ==============================================================================
# STEP 4: Verify docker-compose.yml
# ==============================================================================
echo "=== STEP 4: VERIFY DOCKER-COMPOSE.YML ==="
if [ ! -f "docker-compose.yml" ]; then
    echo "❌ ERROR: docker-compose.yml NOT FOUND in $APP_DIR"
    echo "📁 Contents of $APP_DIR:"
    ls -la
    exit 1
fi
echo "✅ docker-compose.yml found"
echo ""

# ==============================================================================
# STEP 5: Prepare Docker Environment
# ==============================================================================
echo "=== STEP 5: PREPARE DOCKER ENVIRONMENT ==="
# Add ubuntu user to docker group
sudo usermod -aG docker ubuntu 2>/dev/null || true
echo "✅ Docker permissions configured"
echo ""

# ==============================================================================
# STEP 6: Stop & Clean Existing Containers
# ==============================================================================
echo "=== STEP 6: STOP EXISTING CONTAINERS ==="
echo "Running: docker-compose down"
docker-compose down -v 2>&1 || echo "⚠️  No containers to stop (first run is OK)"
echo "✅ Old containers cleaned"
echo ""

# ==============================================================================
# STEP 7: Pull Latest Images from Docker Hub
# ==============================================================================
echo "=== STEP 7: PULL LATEST IMAGES FROM DOCKER HUB ==="
echo "Pulling: ${DOCKERHUB_USERNAME}/bookmate-backend:latest"
docker pull ${DOCKERHUB_USERNAME}/bookmate-backend:latest

echo "Pulling: ${DOCKERHUB_USERNAME}/bookmate-frontend:latest"
docker pull ${DOCKERHUB_USERNAME}/bookmate-frontend:latest
echo "✅ Images pulled successfully"
echo ""

# ==============================================================================
# STEP 8: Set Volume Permissions
# ==============================================================================
echo "=== STEP 8: PREPARE VOLUMES ==="
mkdir -p /mnt/mysql-data /mnt/app-data/backend /mnt/app-data/frontend 2>/dev/null || {
    echo "⚠️  Could not create /mnt volumes (may not have permissions)"
}
echo "✅ Volumes prepared"
echo ""

# ==============================================================================
# STEP 9: Start Services with docker-compose
# ==============================================================================
echo "╔════════════════════════════════════════════════════════════╗"
echo "║          🚀 STARTING SERVICES WITH docker-compose          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo "Running: docker-compose up -d"
docker-compose up -d
echo "✅ Containers started"
echo ""

# ==============================================================================
# STEP 10: Wait for Services to Initialize
# ==============================================================================
echo "=== STEP 10: HEALTH CHECK & STARTUP WAIT ==="
echo "⏳ Waiting 15 seconds for services to initialize..."
sleep 15
echo ""

# ==============================================================================
# STEP 11: Display Status
# ==============================================================================
echo "=== RUNNING CONTAINERS ==="
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo ""

# ==============================================================================
# STEP 12: Verify Backend Health
# ==============================================================================
echo "=== BACKEND HEALTH CHECK ==="
if docker exec bookmate-backend curl -s http://localhost:8080/actuator/health > /dev/null 2>&1; then
    echo "✅ Backend is responding"
else
    echo "⚠️  Backend still starting... Check logs in 30s with:"
    echo "   docker logs -f bookmate-backend"
fi
echo ""

# ==============================================================================
# FINAL: Display Access Information
# ==============================================================================
echo "╔════════════════════════════════════════════════════════════╗"
echo "║              ✅ DEPLOYMENT SUCCESSFUL! ✅                   ║"
echo "╠════════════════════════════════════════════════════════════╣"
echo "║                                                             ║"
echo "║ 📍 PORTS & SERVICES                                         ║"
echo "║   🌐 Frontend:  Port 80  (http://EC2_IP)                   ║"
echo "║   🔌 Backend:   Port 8081 (http://EC2_IP:8081/api)         ║"
echo "║   🗄️  MySQL:    Port 3306 (internal only)                   ║"
echo "║                                                             ║"
echo "║ 📋 USEFUL COMMANDS                                          ║"
echo "║   View frontend logs:  docker logs -f bookmate-frontend    ║"
echo "║   View backend logs:   docker logs -f bookmate-backend     ║"
echo "║   View MySQL logs:     docker logs -f bookmate-mysql       ║"
echo "║   View all services:   docker-compose ps                   ║"
echo "║   Stop all:            docker-compose down                 ║"
echo "║   Restart:             docker-compose restart              ║"
echo "║   View logs follow:    docker-compose logs -f              ║"
echo "║                                                             ║"
echo "║ 🔗 ACCESS YOUR APPLICATION                                 ║"
echo "║   Frontend: http://<EC2_PUBLIC_IP>/                        ║"
echo "║   Backend:  http://<EC2_PUBLIC_IP>:8081/api/books          ║"
echo "║                                                             ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
