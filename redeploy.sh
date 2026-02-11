#!/bin/bash
set -e

TARGET_IP="52.203.189.191"
SSH_KEY="$HOME/.ssh/bookmate-deploy-key.pem"

echo "=== Starting Redeployment ===="
echo "Pulling latest code..."
ssh -o StrictHostKeyChecking=no -i "$SSH_KEY" ubuntu@"$TARGET_IP" "cd /opt/bookmate && git pull origin main"

echo ""
echo "Stopping old containers..."
ssh -o StrictHostKeyChecking=no -i "$SSH_KEY" ubuntu@"$TARGET_IP" "cd /opt/bookmate && sudo docker-compose down"

echo ""
echo "Fixing volume permissions..."
ssh -o StrictHostKeyChecking=no -i "$SSH_KEY" ubuntu@"$TARGET_IP" "sudo rm -rf /mnt/mysql-data/backend /mnt/mysql-data/frontend /mnt/mysql-data/lost+found 2>/dev/null || true && sudo chown -R 999:999 /mnt/mysql-data && sudo chmod 755 /mnt/mysql-data && sudo chown -R 1000:1000 /mnt/app-data && sudo chmod 755 /mnt/app-data"

echo ""
echo "Starting new containers with fixed healthcheck..."
ssh -o StrictHostKeyChecking=no -i "$SSH_KEY" ubuntu@"$TARGET_IP" "cd /opt/bookmate && sudo docker-compose up -d"

echo ""
echo "Waiting 10 seconds for containers to start..."
sleep 10

echo ""
echo "Checking container status..."
ssh -o StrictHostKeyChecking=no -i "$SSH_KEY" ubuntu@"$TARGET_IP" "cd /opt/bookmate && sudo docker-compose ps"

echo ""
echo "=== Redeployment Complete ===="
