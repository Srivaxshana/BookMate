# BookMate Deployment Guide

## ✅ Production Instance (STABLE - Keep this)
- **Instance ID**: i-068934ba8e6895d0b
- **Elastic IP**: 52.203.189.191
- **Region**: us-east-1
- **Status**: Healthy with containers running
- **Tagged**: Name="BookMate-App", Environment="Dev", Owner="Sri"

## 🚀 Deployment Instructions

### Important: DO NOT run Terraform for routine deploys!

### Option 1: Use Jenkins Pipeline (Recommended)
1. Go to Jenkins dashboard
2. Click **Build with Parameters** on BookMate job
3. **Set parameters as follows:**
   ```
   RUN_TERRAFORM = false  ✅ (ALWAYS false for normal deploys)
   DEPLOY_INSTANCE_TAG = BookMate-App
   ELASTIC_IP = 52.203.189.191
   ```
4. Click **Build**
5. Jenkins will:
   - ✅ Build backend (Maven)
   - ✅ Build frontend (React)
   - ✅ Build Docker images
   - ✅ Push to Docker Hub
   - ✅ Deploy to existing instance (52.203.189.191)
   - ✅ Restart containers

### Option 2: Manual SSH Deployment
```bash
# SSH into the working instance
ssh -i ~/.ssh/bookmate-deploy-key.pem ubuntu@52.203.189.191

# Run the deployment script
bash /tmp/deploy.sh

# Or manually:
cd /opt/bookmate
git pull origin main
sudo docker-compose down -v
sudo docker pull srivaxshana/bookmate-backend:latest
sudo docker pull srivaxshana/bookmate-frontend:latest
sudo docker-compose up -d
```

### Option 3: Using Session Manager (if SSH fails)
```bash
aws ssm start-session --target i-068934ba8e6895d0b --region us-east-1
# Then run deployment commands as above
```

## 🚀 Only use RUN_TERRAFORM=true IF:
- You need to:
  - **Recreate the entire infrastructure**
  - Change EC2 instance type, region, or security group
  - Completely rebuild from scratch
- **WARNING**: This will terminate the old instance and create a new one (data loss if not backed up)

## 📊 Application URLs
- **Frontend**: http://52.203.189.191 (port 80)
- **Backend API**: http://52.203.189.191:8081 (port 8081)
- **MySQL**: 52.203.189.191:3306 (internal only, via bridge network)

## 🔍 Verify Deployment Health
```bash
# Check container status
curl http://52.203.189.191/health || curl http://52.203.189.191

# Check backend health
curl http://52.203.189.191:8081/actuator/health

# SSH into instance and check logs
sudo docker ps
sudo docker logs bookmate-mysql --tail 50
sudo docker logs bookmate-backend --tail 50
sudo docker logs bookmate-frontend --tail 50
```

## ❌ Never Do This (causes infrastructure duplication):
```
# BAD - This recreates all resources!
jenkins_build --with RUN_TERRAFORM=true
```

## 💾 If you need Infrastructure Changes:
Contact the DevOps team to:
1. Plan Terraform changes
2. Review and test changes
3. Import old resources into new state
4. Controlled terraform apply
