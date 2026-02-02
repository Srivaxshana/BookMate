# BookMate DevOps Setup Instructions

## Overview
This project uses:
- **GitHub** → Source control
- **Jenkins** → CI/CD automation
- **Docker Hub** → Container registry
- **AWS EC2** → Single instance deployment (t3.micro with Elastic IP)
- **Docker Compose** → Orchestrates MySQL, Backend (Spring Boot), Frontend (React)

## One-Time Setup Steps

### 1. Clean Up Old AWS Resources (DO THIS FIRST)

```bash
cd terraform
terraform destroy -auto-approve
```

This will delete all old EC2 instances and Elastic IPs.

### 2. Create Fresh Infrastructure

```bash
terraform init
terraform apply -auto-approve
```

This creates:
- ONE EC2 instance (t3.micro)
- ONE Elastic IP (permanent)
- Security groups

**Note the Elastic IP** - it won't change on future builds!

### 3. Configure Jenkins Credentials

#### A. Docker Hub Credentials
1. Go to Jenkins → Manage Jenkins → Credentials
2. Add new credential:
   - **ID**: `dockerhub-credentials`
   - **Type**: Username with password
   - **Username**: Your Docker Hub username
   - **Password**: Your Docker Hub password or access token

#### B. AWS EC2 SSH Key (Already configured)
- **ID**: `ec2-ssh-key`
- **Type**: SSH Username + private key
- **Username**: `ubuntu`

### 4. Update Jenkinsfile

Open `Jenkinsfile` and change line 371:
```groovy
DOCKERHUB_USERNAME = 'your-dockerhub-username'  // Change to YOUR username
```

Replace `'your-dockerhub-username'` with your actual Docker Hub username.

### 5. Push Changes to GitHub

```bash
git add .
git commit -m "Setup: Configure Docker Hub integration and single EC2 deployment"
git push origin main
```

### 6. Run Jenkins Pipeline

1. Go to Jenkins → BookMate-Pipeline
2. Click **"Build Now"**
3. Watch the pipeline execute:
   - ✅ Checkout SCM
   - ✅ Tool Install
   - ✅ Terraform Init & Plan
   - ✅ Terraform Apply (reuses existing instance)
   - ✅ Get EC2 IP
   - ✅ Build & Test Backend
   - ✅ Build Docker Images
   - ✅ **Push to Docker Hub** (NEW)
   - ✅ **Deploy to EC2** (updates same instance)

## How It Works

### First Build
1. Creates ONE EC2 instance with ONE Elastic IP
2. Builds Docker images
3. Pushes images to Docker Hub
4. Deploys to EC2

### Every Subsequent Build
1. **Does NOT create new EC2 instance**
2. Reuses the same Elastic IP
3. Builds new Docker images with version tags
4. Pushes to Docker Hub
5. **Updates the existing EC2 instance** with new images
6. MySQL data persists (EBS volume)

## Infrastructure Details

### EC2 Instance
- **Type**: t3.micro (eligible for free tier)
- **OS**: Ubuntu 20.04
- **Fixed IP**: Via Elastic IP (doesn't change)
- **Ports Open**:
  - 22 (SSH)
  - 80 (HTTP/Nginx)
  - 3000 (React Frontend)
  - 8081 (Spring Boot Backend)
  - 3306 (MySQL - VPC only)

### Docker Containers (Order maintained)
1. **MySQL** - Database with persistent EBS volume
2. **Backend** - Spring Boot API (depends on MySQL)
3. **Frontend** - React app (depends on Backend)

## Accessing Your Application

After successful deployment:
- **Frontend**: http://YOUR_ELASTIC_IP:80
- **Backend API**: http://YOUR_ELASTIC_IP:8081
- **React Dev**: http://YOUR_ELASTIC_IP:3000

Get your Elastic IP from Terraform output or Jenkins logs.

## Troubleshooting

### If t3.micro doesn't work
Edit `terraform/main.tf` line 68:
```hcl
instance_type = "t3.small"  # Change from t3.micro
```

Then run:
```bash
cd terraform
terraform apply -auto-approve
```

### To check container status
SSH into EC2:
```bash
ssh -i ~/.ssh/bookmate-deploy-key.pem ubuntu@YOUR_ELASTIC_IP
docker ps
docker logs bookmate-backend
docker logs bookmate-frontend
docker logs bookmate-mysql
```

### To manually restart containers
```bash
cd /opt/bookmate
docker-compose down
docker-compose up -d
```

## Cost Optimization

- **t3.micro**: Free tier eligible (750 hours/month)
- **Elastic IP**: Free when attached to running instance
- **EBS Volume**: Minimal cost (~$0.10/month for 8GB)

**Total estimated cost**: $0 (if within free tier) to ~$8/month

## Notes

- The same EC2 instance is reused on every build
- MySQL data persists across deployments
- Elastic IP remains constant (no DNS updates needed)
- Old Docker images are cleaned up automatically
