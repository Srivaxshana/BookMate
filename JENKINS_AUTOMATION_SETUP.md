# Jenkins Automated Deployment Setup Guide

## 🎯 Overview
Your BookMate application has a complete CI/CD pipeline configured in the `Jenkinsfile`. This guide will help you set up **automatic deployments** when you push code to GitHub.

---

## 📋 Prerequisites

You need:
1. **Jenkins Server** running on EC2 or locally
2. **GitHub Account** with repository access
3. **Docker Hub Account** for image registry (srivaxshana)
4. **AWS Credentials** configured in Jenkins
5. **SSH Key** (`ec2-ssh-key`) to EC2 instance

---

## 🔧 Step 1: Install Jenkins on EC2

### Option A: Quick Installation on EC2
```bash
# SSH into a new EC2 instance
ssh -i ~/.ssh/bookmate-deploy-key.pem ubuntu@<JENKINS_IP>

# Install Java 17+ (required for Jenkins)
sudo apt update
sudo apt install -y openjdk-17-jdk

# Add Jenkins repository and install
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/ | sudo tee /etc/apt/sources.list.d/jenkins.list > /dev/null

sudo apt update
sudo apt install -y jenkins docker.io

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Get initial admin password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword

# Access Jenkins at: http://<JENKINS_IP>:8080
```

### Option B: Run Jenkins in Docker
```bash
docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  -v /root/.ssh:/root/.ssh \
  jenkins/jenkins:lts
```

---

## 🔑 Step 2: Configure Jenkins Credentials

### 1. Create AWS Credentials
1. Go to **Jenkins Dashboard** → **Manage Jenkins** → **Manage Credentials**
2. Click **Global** → **Add Credentials**
3. Create **Username with password** credential:
   - **ID**: `aws-creds-id`
   - **Username**: `AWS_ACCESS_KEY_ID`
   - **Password**: `AWS_SECRET_ACCESS_KEY`

### 2. Create Docker Hub Credentials
1. Same location as above
2. Create **Username with password** credential:
   - **ID**: `dockerhub-credentials`
   - **Username**: `srivaxshana`
   - **Password**: Docker Hub access token

### 3. Create EC2 SSH Key
1. Click **Add Credentials**
2. Select **SSH Username with private key**
   - **ID**: `ec2-ssh-key`
   - **Username**: `ubuntu`
   - **Private Key**: Paste contents of `~/.ssh/bookmate-deploy-key.pem`

---

## 📦 Step 3: Create Jenkins Pipeline Job

### 1. Create New Job
1. Click **New Item** on Jenkins Dashboard
2. Enter name: `BookMate-Deploy`
3. Select **Pipeline**
4. Click **OK**

### 2. Configure Pipeline

**In the Pipeline section:**

```groovy
// Option 1: Pipeline Script from SCM (Recommended)
Definition: Pipeline script from SCM
SCM: Git
Repository URL: https://github.com/Srivaxshana/BookMate.git
Branch: */main
Script Path: Jenkinsfile
```

OR

```groovy
// Option 2: Direct Pipeline Script
Definition: Pipeline script
Paste contents of Jenkinsfile directly
```

### 3. Add Build Triggers

Check **GitHub hook trigger for GITScm polling**

This enables GitHub webhooks to trigger builds automatically.

---

## 🪝 Step 4: Configure GitHub Webhook

### 1. In GitHub Repository
1. Go to **Settings** → **Webhooks**
2. Click **Add webhook**
3. Fill in:
   - **Payload URL**: `http://<JENKINS_IP>:8080/github-webhook/`
   - **Content type**: `application/json`
   - **Events**: Select "Just the push event"
   - **Active**: ✅ Checked

4. Click **Add webhook**

### 2. Test Webhook
GitHub will show a green checkmark ✅ if successful.

---

## 🚀 Step 5: Run Your First Pipeline

### Option 1: Manual Trigger
1. Go to Jenkins job `BookMate-Deploy`
2. Click **Build with Parameters**
3. Set parameters:
   - **RUN_TERRAFORM**: `false` (for first deployment)
   - **DEPLOY_INSTANCE_TAG**: `BookMate-App`
   - Click **Build**

### Option 2: Automatic on Git Push
```bash
# Commit and push to main branch
git add .
git commit -m "Trigger Jenkins deployment"
git push origin main
```

Jenkins will automatically trigger the pipeline! 🎉

---

## 📊 Pipeline Stages

Your pipeline will execute:

1. **Checkout** - Clone latest code from GitHub
2. **Build & Test Backend** - Maven build with integration tests
3. **Build Docker Images** - Create backend and frontend images
4. **Push to Docker Hub** - Push images to registry
5. **Deploy to EC2** - Deploy containers via SSH

---

## 🔍 Monitoring the Pipeline

### In Jenkins UI
1. Click on the job run number
2. View **Console Output** for real-time logs
3. Green ✅ = Success, Red ❌ = Failure

### SSH Logs
```bash
# Check deployment logs on EC2
ssh -i ~/.ssh/bookmate-deploy-key.pem ubuntu@52.203.189.191

# View container logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Check status
docker-compose ps
```

---

## ✅ Automation Checklist

- [ ] Jenkins installed and running at `http://<JENKINS_IP>:8080`
- [ ] AWS credentials added (ID: `aws-creds-id`)
- [ ] Docker Hub credentials added (ID: `dockerhub-credentials`)
- [ ] EC2 SSH key added (ID: `ec2-ssh-key`)
- [ ] Pipeline job created (`BookMate-Deploy`)
- [ ] GitHub webhook configured and active
- [ ] First manual run successful
- [ ] Git push auto-triggers pipeline build

---

## 🛠️ Troubleshooting

### Webhook Not Triggering
```bash
# Check Jenkins is accessible
curl http://<JENKINS_IP>:8080/api/json

# In GitHub, check Recent Deliveries in webhook settings
# Look for successful requests (200 response)
```

### Build Fails
1. Check **Console Output** for error messages
2. Verify credentials are correct:
   ```bash
   # SSH connectivity
   ssh -i ~/.ssh/bookmate-deploy-key.pem ubuntu@52.203.189.191 "echo OK"
   ```
3. Check EC2 has Docker and Docker Compose installed

### SSH Key Issues
```bash
# Verify key has correct permissions
chmod 600 ~/.ssh/bookmate-deploy-key.pem

# Test SSH manually
ssh -i ~/.ssh/bookmate-deploy-key.pem ubuntu@52.203.189.191 "docker info"
```

---

## 📈 Advanced: Multi-Environment Deployments

To deploy to multiple environments:

1. Create different pipeline jobs:
   - `BookMate-Deploy-Dev`
   - `BookMate-Deploy-Staging`
   - `BookMate-Deploy-Prod`

2. Use different EC2 instance tags or IPs for each

3. Update `DEPLOY_INSTANCE_TAG` and `ELASTIC_IP` parameters accordingly

---

## 🎉 You're All Set!

Your BookMate application now has:
- ✅ **Automated Testing** on every commit
- ✅ **Docker Image Building** 
- ✅ **Automatic Deployment** to EC2
- ✅ **Version Control Integration** via GitHub webhooks

Push code → GitHub → Webhook triggers → Jenkins Pipeline → Auto Deploy to EC2 🚀

