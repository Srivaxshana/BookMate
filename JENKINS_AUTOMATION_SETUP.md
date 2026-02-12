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

## � QUICK START: Jenkins on EC2 Automated Pipeline Setup

**Use this guide if you've already installed Jenkins on EC2 and want to set up automated builds.**

### 📍 Your Current State
- ✅ Jenkins installed on EC2
- ⏳ Need to configure automated pipeline
- ⏳ Need to connect to GitHub for auto-builds

---

### Step 1: Access and Unlock Jenkins

**1.1 Get Your EC2 Public IP:**
```powershell
# From AWS Console, copy your EC2 instance's Public IPv4 address
# Example: 52.203.189.191
```

**1.2 Access Jenkins in Browser:**
```
http://<EC2_PUBLIC_IP>:8080
```

**1.3 Unlock Jenkins:**

SSH into your EC2 instance and get the initial admin password:

```bash
# SSH to EC2
ssh -i ~/.ssh/bookmate-deploy-key.pem ubuntu@<EC2_PUBLIC_IP>

# Get the unlock password
sudo cat /var/lib/jenkins/secrets/initialAdminPassword

# Copy this password (looks like: a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6)
```

Paste the password in Jenkins UI and click **Continue**.

---

### Step 2: Install Required Plugins

**2.1 Select Plugin Installation:**
- Choose **"Install suggested plugins"** (recommended)
- Wait for installation to complete (2-5 minutes)

**2.2 Install Additional Required Plugins:**

After initial setup, go to **Manage Jenkins** → **Manage Plugins** → **Available** tab

Search and install these plugins:
- ✅ **Git Plugin** (for GitHub integration)
- ✅ **GitHub Integration Plugin** (for webhooks)
- ✅ **Pipeline** (for Jenkinsfile)
- ✅ **Docker Pipeline** (if using Docker)
- ✅ **SSH Agent Plugin** (for EC2 deployment)
- ✅ **Credentials Binding Plugin**

Click **Install without restart** checkbox at bottom.

---

### Step 3: Create Jenkins Admin User

**3.1 Create First Admin User:**
- Username: `admin` (or your preferred username)
- Password: Create a strong password
- Full name: Your name
- Email: Your email

Click **Save and Continue**.

**3.2 Configure Jenkins URL:**
- Jenkins URL: `http://<EC2_PUBLIC_IP>:8080/`
- Click **Save and Finish**
- Click **Start using Jenkins**

---

### Step 4: Configure Jenkins Credentials

**4.1 Navigate to Credentials:**
```
Jenkins Dashboard → Manage Jenkins → Manage Credentials → System → Global credentials → Add Credentials
```

---

**4.2 Add GitHub Credentials (for private repos):**

*Skip this if your repository is public.*

- **Kind**: Username with password
- **Username**: Your GitHub username
- **Password**: GitHub Personal Access Token (PAT)
  - Create PAT at: https://github.com/settings/tokens
  - Scopes needed: `repo`, `admin:repo_hook`
- **ID**: `github-credentials`
- **Description**: GitHub Access Token
- Click **Create**

---

**4.3 Add Docker Hub Credentials:**

- **Kind**: Username with password
- **Username**: `srivaxshana`
- **Password**: Your Docker Hub password or access token
  - Create token at: https://hub.docker.com/settings/security
- **ID**: `dockerhub-credentials`
- **Description**: Docker Hub Credentials
- Click **Create**

---

**4.4 Add AWS Credentials (if deploying to AWS):**

- **Kind**: Username with password
- **Username**: Your AWS Access Key ID
- **Password**: Your AWS Secret Access Key
- **ID**: `aws-creds-id`
- **Description**: AWS Credentials
- Click **Create**

---

**4.5 Add EC2 SSH Key (for deployment):**

- **Kind**: SSH Username with private key
- **ID**: `ec2-ssh-key`
- **Username**: `ubuntu`
- **Private Key**: Select **Enter directly**
- Paste your private key content:
  ```bash
  # On your local machine, get the key content:
  cat ~/.ssh/bookmate-deploy-key.pem
  # Copy the entire output including:
  # -----BEGIN RSA PRIVATE KEY-----
  # ... key content ...
  # -----END RSA PRIVATE KEY-----
  ```
- **Description**: EC2 SSH Key for Deployment
- Click **Create**

---

### Step 5: Install Required Tools on Jenkins EC2

SSH into your Jenkins EC2 and install necessary tools:

```bash
# SSH to EC2
ssh -i ~/.ssh/bookmate-deploy-key.pem ubuntu@<EC2_PUBLIC_IP>

# Install Docker (if not already installed)
sudo apt update
sudo apt install -y docker.io docker-compose

# Add jenkins user to docker group
sudo usermod -aG docker jenkins

# Install Maven (for Java builds)
sudo apt install -y maven

# Install Node.js (for frontend builds)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installations
docker --version
docker-compose --version
mvn --version
node --version
npm --version

# Restart Jenkins to apply group changes
sudo systemctl restart jenkins

# Wait 30 seconds for Jenkins to restart
echo "Waiting for Jenkins to restart..."
sleep 30
```

---

### Step 6: Create Jenkins Pipeline Job

**6.1 Create New Pipeline:**
1. Go to **Jenkins Dashboard**
2. Click **New Item**
3. Enter item name: `BookMate-Deploy`
4. Select **Pipeline**
5. Click **OK**

---

**6.2 Configure General Settings:**

✅ Check **GitHub project**
- Project url: `https://github.com/Srivaxshana/BookMate/`

✅ Check **This project is parameterized** (optional)
- Add String Parameter:
  - Name: `DEPLOY_INSTANCE_TAG`
  - Default Value: `BookMate-App`
  - Description: EC2 instance tag for deployment

---

**6.3 Configure Build Triggers:**

✅ Check **GitHub hook trigger for GITScm polling**

This enables automatic builds when you push to GitHub.

---

**6.4 Configure Pipeline:**

Select **Pipeline script from SCM**

**SCM Settings:**
- **SCM**: Git
- **Repository URL**: `https://github.com/Srivaxshana/BookMate.git`
- **Credentials**: 
  - Select `github-credentials` (if private repo)
  - Leave as `- none -` (if public repo)
- **Branch Specifier**: `*/main` (or `*/master` if you use master)
- **Script Path**: `Jenkinsfile`

Click **Save**.

---

### Step 7: Setup GitHub Webhook

**7.1 Get Your Jenkins Webhook URL:**
```
http://<EC2_PUBLIC_IP>:8080/github-webhook/
```

**7.2 Configure in GitHub:**

1. Go to your GitHub repository: `https://github.com/Srivaxshana/BookMate`
2. Click **Settings** → **Webhooks** → **Add webhook**
3. Fill in:
   - **Payload URL**: `http://<EC2_PUBLIC_IP>:8080/github-webhook/`
   - **Content type**: `application/json`
   - **Secret**: Leave empty (or add for security)
   - **Which events**: Select **"Just the push event"**
   - **Active**: ✅ Checked

4. Click **Add webhook**

**7.3 Verify Webhook:**
- GitHub will send a test ping
- Check for ✅ green checkmark next to webhook
- Click on webhook → **Recent Deliveries** tab
- Should see successful delivery with `200` response

---

### Step 8: Test Your Pipeline

**8.1 Manual Test First:**

1. Go to Jenkins Dashboard
2. Click on `BookMate-Deploy` job
3. Click **Build Now** (or **Build with Parameters** if you added params)
4. Watch the build progress in **Build History**
5. Click on build number (e.g., `#1`) → **Console Output** to see logs

**Expected Stages:**
```
✅ Checkout - Cloning code from GitHub
✅ Build Backend - Maven build
✅ Build Frontend - NPM build
✅ Docker Build - Creating images
✅ Docker Push - Pushing to Docker Hub
✅ Deploy - Deploying to EC2
```

---

**8.2 Test Automatic Trigger:**

Make a small change and push to GitHub:

```bash
# On your local machine
cd /path/to/BookMate

# Make a small change
echo "# Test Jenkins automation" >> README.md

# Commit and push
git add README.md
git commit -m "Test Jenkins auto-build"
git push origin main
```

**What Should Happen:**
1. GitHub receives push
2. GitHub sends webhook to Jenkins
3. Jenkins automatically starts build
4. Build runs through all stages
5. Application deploys to EC2

**Check Jenkins Dashboard:**
- You should see a new build starting automatically within seconds
- Build number will increment (e.g., `#2`)

---

### Step 9: Verify Deployment

**9.1 Check Build Success:**
- In Jenkins, build should show ✅ green/blue ball (success)
- Console output should end with `Finished: SUCCESS`

**9.2 Check Application on EC2:**

```bash
# SSH to your EC2
ssh -i ~/.ssh/bookmate-deploy-key.pem ubuntu@<EC2_PUBLIC_IP>

# Check Docker containers are running
docker ps

# Should see containers like:
# bookmate-backend
# bookmate-frontend
# postgres or mysql

# Check logs
docker logs bookmate-backend
docker logs bookmate-frontend

# Test application (adjust port as needed)
curl http://localhost:3000  # Frontend
curl http://localhost:8080/api/books  # Backend API
```

**9.3 Access Application in Browser:**
```
http://<EC2_PUBLIC_IP>:3000
```

You should see your BookMate application running! 🎉

---

### Step 10: Configure EC2 Security Group

Make sure your EC2 Security Group allows traffic:

**Inbound Rules to Add:**
```
Type            Port    Source          Description
-----------------------------------------------------------
HTTP            80      0.0.0.0/0       Web traffic
Custom TCP      3000    0.0.0.0/0       Frontend (React)
Custom TCP      8080    0.0.0.0/0       Jenkins UI / Backend API
Custom TCP      5432    Your-IP/32      PostgreSQL (restrict!)
SSH             22      Your-IP/32      SSH access
```

**In AWS Console:**
1. Go to **EC2** → **Security Groups**
2. Find your instance's security group
3. Click **Edit inbound rules**
4. Add the rules above
5. Click **Save rules**

---

## ✅ Complete Automation Checklist

Mark off each step as you complete it:

### Initial Setup
- [ ] Jenkins accessible at `http://<EC2_IP>:8080`
- [ ] Jenkins unlocked with initial admin password
- [ ] Plugins installed (Git, GitHub, Pipeline, Docker, SSH)
- [ ] Admin user created

### Credentials Configured
- [ ] GitHub credentials added (if private repo)
- [ ] Docker Hub credentials added (`dockerhub-credentials`)
- [ ] AWS credentials added (if needed)
- [ ] EC2 SSH key added (`ec2-ssh-key`)

### Pipeline Setup
- [ ] Pipeline job `BookMate-Deploy` created
- [ ] Connected to GitHub repository
- [ ] Jenkinsfile path configured
- [ ] Build triggers enabled (GitHub hook)

### GitHub Integration
- [ ] Webhook added in GitHub repository
- [ ] Webhook shows ✅ green checkmark
- [ ] Test ping successful (200 response)

### Tools on EC2
- [ ] Docker installed and jenkins user added to docker group
- [ ] Docker Compose installed
- [ ] Maven installed (for Java backend)
- [ ] Node.js installed (for React frontend)
- [ ] Jenkins restarted after tool installation

### Testing
- [ ] Manual build successful
- [ ] Automatic build triggered on git push
- [ ] All pipeline stages pass
- [ ] Application deployed and accessible
- [ ] EC2 security group configured

---

## 🔍 Monitoring Your Builds

### Jenkins Dashboard
```
http://<EC2_PUBLIC_IP>:8080/job/BookMate-Deploy/
```

**Key Views:**
- **Build History** - All past builds
- **Console Output** - Real-time build logs
- **Build Trends** - Success/failure statistics
- **Pipeline Visualization** - Stage-by-stage view

### Email Notifications (Optional)

Add email notifications on build failure:

1. **Manage Jenkins** → **Configure System**
2. Scroll to **Email Notification**
3. Configure SMTP server (e.g., Gmail):
   - SMTP server: `smtp.gmail.com`
   - Use SSL: ✅
   - Port: `465`
   - Credentials: Add Gmail app password
4. In your Jenkinsfile, add post-build action:
   ```groovy
   post {
       failure {
           mail to: 'your-email@example.com',
                subject: "Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: "Check console output at ${env.BUILD_URL}"
       }
   }
   ```

---

## 🛠️ Troubleshooting Common Issues

### Issue 1: Webhook Not Triggering

**Symptoms:** GitHub push doesn't trigger Jenkins build

**Solutions:**
```bash
# 1. Check Jenkins is accessible from internet
curl http://<EC2_PUBLIC_IP>:8080/github-webhook/

# 2. Check GitHub webhook recent deliveries
# GitHub → Settings → Webhooks → Click your webhook → Recent Deliveries
# Look for 200 OK responses

# 3. Verify security group allows port 8080
# AWS Console → EC2 → Security Groups → Check inbound rules

# 4. Check Jenkins system log
# Jenkins → Manage Jenkins → System Log
```

---

### Issue 2: Build Fails at Docker Stage

**Symptoms:** Error: "Cannot connect to Docker daemon"

**Solutions:**
```bash
# SSH to EC2
ssh -i ~/.ssh/bookmate-deploy-key.pem ubuntu@<EC2_PUBLIC_IP>

# Check jenkins user is in docker group
groups jenkins

# If 'docker' not listed, add it:
sudo usermod -aG docker jenkins
sudo systemctl restart jenkins

# Verify docker works
sudo -u jenkins docker ps
```

---

### Issue 3: Git Clone Fails

**Symptoms:** Error: "Failed to connect to repository"

**Solutions:**
1. **For public repos:** Use HTTPS URL without credentials
   - `https://github.com/Srivaxshana/BookMate.git`

2. **For private repos:** Check GitHub credentials
   - Verify PAT has `repo` scope
   - Test credential:
     ```bash
     git ls-remote https://<TOKEN>@github.com/Srivaxshana/BookMate.git
     ```

3. **Check Jenkins has git installed:**
   ```bash
   ssh ubuntu@<EC2_IP>
   which git
   git --version
   ```

---

### Issue 4: Maven/NPM Build Fails

**Symptoms:** "mvn: command not found" or "npm: command not found"

**Solutions:**
```bash
# SSH to EC2
ssh -i ~/.ssh/bookmate-deploy-key.pem ubuntu@<EC2_PUBLIC_IP>

# Install Maven
sudo apt update
sudo apt install -y maven

# Install Node.js & NPM
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Verify
mvn --version
node --version
npm --version

# Configure in Jenkins
# Manage Jenkins → Global Tool Configuration
# Add Maven and NodeJS installations
```

---

### Issue 5: Permission Denied on Deployment

**Symptoms:** SSH connection fails during deployment stage

**Solutions:**
```bash
# 1. Verify SSH key is correct in Jenkins credentials
# Test manually:
ssh -i ~/.ssh/bookmate-deploy-key.pem ubuntu@<TARGET_EC2_IP> "echo OK"

# 2. Check key permissions
chmod 600 ~/.ssh/bookmate-deploy-key.pem

# 3. Verify target EC2 security group allows SSH from Jenkins EC2
# AWS Console → EC2 → Security Groups
# Add rule: SSH (22) from Jenkins EC2's security group or IP
```

---

## 📊 Pipeline Workflow Diagram

```
Developer                GitHub              Jenkins EC2           Target EC2
    |                       |                     |                    |
    |-- git push ---------->|                     |                    |
    |                       |-- webhook --------->|                    |
    |                       |                     |-- checkout code -->|
    |                       |<-- clone ---------- |                    |
    |                       |                     |-- maven build ---->|
    |                       |                     |-- npm build ------>|
    |                       |                     |-- docker build --->|
    |                       |                     |-- push to hub ---->|
    |                       |                     |                    |
    |                       |                     |-- SSH deploy ----->|
    |                       |                     |                    |-- pull images
    |                       |                     |                    |-- docker-compose up
    |                       |                     |<-- success --------|
    |<-- notification ------|--------------------|                    |
    |                       |                     |                    |
    
    ✅ Build Success! Application deployed automatically! 🚀
```

---

## 🎯 Next Steps

Now that your automated pipeline is working:

1. **Add More Environments:**
   - Create separate jobs for Dev, Staging, Production
   - Use different branches (dev, staging, main)

2. **Add Testing Stages:**
   - Unit tests (Maven: `mvn test`)
   - Integration tests
   - Security scans (OWASP, SonarQube)

3. **Improve Security:**
   - Add GitHub webhook secret
   - Use Jenkins role-based access control
   - Scan Docker images for vulnerabilities

4. **Add Monitoring:**
   - Application performance monitoring (APM)
   - Log aggregation (ELK stack)
   - Uptime monitoring (Pingdom, UptimeRobot)

5. **Optimize Builds:**
   - Use Docker layer caching
   - Parallel stage execution
   - Incremental builds

---

## 🎉 Congratulations!

You now have a fully automated CI/CD pipeline! Every time you push code to GitHub:

1. 🔔 GitHub sends webhook to Jenkins
2. 🏗️ Jenkins builds your application
3. 🐳 Docker images are created and pushed
4. 🚀 Application automatically deploys to EC2
5. ✅ You get notified of success/failure

**Your workflow:** Write code → Commit → Push → ☕ Get coffee → Application deployed! 

---

## �🔧 Step 1: Install Jenkins on EC2

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

### Method A: Public EC2 Jenkins (Default)

#### 1. In GitHub Repository
1. Go to **Settings** → **Webhooks**
2. Click **Add webhook**
3. Fill in:
   - **Payload URL**: `http://<JENKINS_IP>:8080/github-webhook/`
   - **Content type**: `application/json`
   - **Events**: Select "Just the push event"
   - **Active**: ✅ Checked

4. Click **Add webhook**

#### 2. Test Webhook
GitHub will show a green checkmark ✅ if successful.

---

### Method B: Local Jenkins with Cloudflare Tunnel (Recommended) 🌐

**Use this method if:**
- Jenkins is running on your local machine
- You want a stable, secure public URL
- You own a domain in Cloudflare

#### Prerequisites
- ✅ Cloudflare account with a domain (e.g., `example.com`)
- ✅ Jenkins running locally on `http://localhost:8080`

---

#### Step 1: Install Cloudflared on Windows

**Option 1: Download Installer**
```powershell
# Download from official site
https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe

# Move to a permanent location
mkdir C:\cloudflared
move cloudflared-windows-amd64.exe C:\cloudflared\cloudflared.exe

# Add to PATH
$env:Path += ";C:\cloudflared"
[Environment]::SetEnvironmentVariable("Path", $env:Path, [System.EnvironmentVariableTarget]::User)

# Verify installation
cloudflared --version
```

**Option 2: Using Chocolatey**
```powershell
choco install cloudflared
```

**Option 3: Using Scoop**
```powershell
scoop install cloudflared
```

---

#### Step 2: Login to Cloudflare

```powershell
cloudflared tunnel login
```

**Detailed Steps:**

1. **Run the command in PowerShell:**
   ```powershell
   cloudflared tunnel login
   ```

2. **Browser Opens Automatically:**
   - Your default browser will open automatically
   - You'll be redirected to: `https://dash.cloudflare.com/argotunnel`
   - If browser doesn't open, manually visit the URL shown in terminal

3. **Login to Cloudflare:**
   - If not already logged in, enter your Cloudflare credentials
   - Email and password OR SSO login

4. **Select Your Domain:**
   - You'll see a page titled **"Authorize Cloudflare Tunnel"**
   - A list of all domains in your Cloudflare account will appear
   - **Select the domain** you want to use for Jenkins (e.g., `example.com`)
   - Click **"Authorize"** button

5. **Authorization Success:**
   - Browser shows: **"You have successfully authorized Cloudflare Tunnel"**
   - You can close the browser window
   - Terminal shows: `You have successfully logged in`

6. **Credentials Saved:**
   - Certificate saved to: `C:\Users\<USERNAME>\.cloudflared\cert.pem`
   - This file authorizes your machine to create tunnels for that domain

**Verify Login:**
```powershell
# Check if cert.pem exists
Test-Path C:\Users\$env:USERNAME\.cloudflared\cert.pem

# Should return: True
```

**Troubleshooting Login:**

```powershell
# If browser doesn't open automatically
# Terminal will show a URL like:
# Please visit https://dash.cloudflare.com/argotunnel?callback=https://...
# Copy and paste this URL into your browser manually

# If you don't see any domains
# Check you're logged into the correct Cloudflare account
# Make sure you have at least one domain added to Cloudflare

# If login fails
# Try logging out first
cloudflared tunnel logout
# Then login again
cloudflared tunnel login
```

**Note:** You only need to do this login **once per machine**. The certificate is reused for all tunnels you create.

---

#### Step 3: Create a Named Tunnel

```powershell
# Create tunnel named "jenkins-local"
cloudflared tunnel create jenkins-local
```

**Output will show:**
```
Tunnel credentials written to C:\Users\<USERNAME>\.cloudflared\<TUNNEL_ID>.json
Created tunnel jenkins-local with id <TUNNEL_ID>
```

**‼️ Important:** Save the `<TUNNEL_ID>` - you'll need it!

---

#### Step 4: Create Tunnel Configuration File

Create `C:\Users\<USERNAME>\.cloudflared\config.yml`:

```yaml
tunnel: jenkins-local
credentials-file: C:\Users\<USERNAME>\.cloudflared\<TUNNEL_ID>.json

ingress:
  - hostname: jenkins.yourdomain.com
    service: http://localhost:8080
  - service: http_status:404
```

**Replace:**
- `<USERNAME>` - Your Windows username
- `<TUNNEL_ID>` - The tunnel ID from Step 3
- `jenkins.yourdomain.com` - Your desired subdomain

**To create the file:**

```powershell
# Replace <USERNAME> and <TUNNEL_ID> with actual values
$username = $env:USERNAME
$tunnelId = "<TUNNEL_ID>"  # Replace this!

@"
tunnel: jenkins-local
credentials-file: C:\Users\$username\.cloudflared\$tunnelId.json

ingress:
  - hostname: jenkins.yourdomain.com
    service: http://localhost:8080
  - service: http_status:404
"@ | Out-File -FilePath "C:\Users\$username\.cloudflared\config.yml" -Encoding UTF8
```

---

#### Step 5: Create DNS Record in Cloudflare

```powershell
# This creates a CNAME record pointing to your tunnel
cloudflared tunnel route dns jenkins-local jenkins.yourdomain.com
```

**Expected Output:**
```
Created CNAME record for jenkins.yourdomain.com
```

**Verify in Cloudflare Dashboard:**
1. Go to **DNS** → **Records**
2. You should see: `jenkins.yourdomain.com` → `<TUNNEL_ID>.cfargotunnel.com`

---

#### Step 6: Test the Tunnel

```powershell
# Run tunnel in foreground (for testing)
cloudflared tunnel run jenkins-local
```

**Expected Output:**
```
2026-02-11T... INF Starting tunnel tunnelID=<TUNNEL_ID>
2026-02-11T... INF Connection registered connIndex=0
2026-02-11T... INF Connection registered connIndex=1
```

**Test Access:**
1. Open browser: `https://jenkins.yourdomain.com`
2. You should see Jenkins login page! 🎉

**Stop the test:** Press `Ctrl+C`

---

#### Step 7: Install as Windows Service (Background Mode)

```powershell
# Install cloudflared as a Windows service
cloudflared service install

# Start the service
cloudflared service start

# Verify service is running
Get-Service cloudflared
```

**Expected Output:**
```
Status   Name               DisplayName
------   ----               -----------
Running  cloudflared        cloudflared
```

**Service Management Commands:**
```powershell
# Stop service
cloudflared service stop

# Restart service
cloudflared service install  # Reinstalls with latest config
cloudflared service start

# Uninstall service
cloudflared service uninstall
```

**Check Service Logs:**
```powershell
# Windows Event Viewer
eventvwr.msc
# Navigate to: Windows Logs → Application
# Filter by Source: cloudflared
```

---

#### Step 8: Configure Jenkins URL

1. Go to **Manage Jenkins** → **System**
2. Scroll to **Jenkins URL**
3. Set to: `https://jenkins.yourdomain.com/`
4. Click **Save**

This ensures Jenkins generates correct URLs in webhooks and notifications.

---

#### Step 9: Configure GitHub Webhook

Now use your public Cloudflare URL in GitHub:

1. Go to GitHub Repository → **Settings** → **Webhooks**
2. Click **Add webhook**
3. Fill in:
   - **Payload URL**: `https://jenkins.yourdomain.com/github-webhook/`
   - **Content type**: `application/json`
   - **Events**: Select **"Just the push event"**
   - **Active**: ✅ Checked
   - **SSL verification**: ✅ Enable (Cloudflare provides free SSL)

4. Click **Add webhook**

**Test the Webhook:**
- GitHub will immediately send a ping
- Check **Recent Deliveries** tab
- Should see ✅ green checkmark with `200 OK`

---

#### Step 10: Verify End-to-End

1. **Make a test commit:**
   ```bash
   git add .
   git commit -m "Test Jenkins webhook via Cloudflare Tunnel"
   git push origin main
   ```

2. **Check GitHub Webhook:**
   - Go to **Settings** → **Webhooks** → **Recent Deliveries**
   - Should show successful delivery with `200` response

3. **Check Jenkins:**
   - Job should trigger automatically
   - View build in Jenkins dashboard

---

#### 🔧 Troubleshooting Cloudflare Tunnel

**Tunnel won't start:**
```powershell
# Check config file syntax
Get-Content C:\Users\$env:USERNAME\.cloudflared\config.yml

# Test tunnel manually
cloudflared tunnel run jenkins-local --loglevel debug
```

**DNS not resolving:**
```powershell
# Check DNS propagation
nslookup jenkins.yourdomain.com

# Force cloudflare DNS check
nslookup jenkins.yourdomain.com 1.1.1.1
```

**Jenkins not accessible:**
```powershell
# Verify Jenkins is running locally
curl http://localhost:8080

# Check tunnel status
cloudflared tunnel info jenkins-local
```

**Service not starting:**
```powershell
# Check service status
Get-Service cloudflared

# View detailed service info
Get-WmiObject Win32_Service | Where-Object {$_.Name -eq "cloudflared"} | Select-Object *

# Reinstall service with fresh config
cloudflared service uninstall
cloudflared service install
cloudflared service start
```

**Webhook returns 403/502:**
```powershell
# Check Jenkins URL is set correctly
# Manage Jenkins → System → Jenkins URL should be https://jenkins.yourdomain.com/

# Restart Jenkins
# From Jenkins UI: Manage Jenkins → Reload Configuration from Disk
```

---

#### 📊 Cloudflare Tunnel Benefits

✅ **Secure:** No open ports on your router  
✅ **Free SSL:** Automatic HTTPS certificates  
✅ **Stable:** Same URL even if your IP changes  
✅ **DDoS Protection:** Cloudflare's network protection  
✅ **Zero NAT/Firewall config:** Works from anywhere  

---

#### 🔐 Security Best Practices

1. **Enable Cloudflare Access (Optional but Recommended):**
   - Cloudflare Dashboard → **Access** → **Applications**
   - Create policy to restrict who can access Jenkins
   - Add email-based authentication

2. **Restrict in Jenkins:**
   - Configure **Security Realm** (LDAP, GitHub OAuth, etc.)
   - Enable **Matrix-based security**

3. **Webhook Secret:**
   - In GitHub webhook settings, add a **Secret**
   - Configure Jenkins to validate the secret

---

#### 📝 Quick Reference Commands

```powershell
# Check tunnel status
cloudflared tunnel info jenkins-local

# List all tunnels
cloudflared tunnel list

# View tunnel config
Get-Content C:\Users\$env:USERNAME\.cloudflared\config.yml

# Test tunnel connectivity
cloudflared tunnel run jenkins-local --loglevel debug

# Service management
cloudflared service start
cloudflared service stop
cloudflared service install
cloudflared service uninstall
Get-Service cloudflared

# Delete tunnel (if starting over)
cloudflared tunnel delete jenkins-local
```

---

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

---

## 🌟 OPTIMIZED SETUP: Using Standalone docker-compose

**Use this if:** Your system has the **standalone `docker-compose`** command installed (not `docker compose` v2).

Your system uses: `docker-compose` (with hyphen) ✅

---

### Key Difference

**Your System (Standalone docker-compose):**
```bash
docker-compose --version      # ✅ Works
docker-compose up -d          # ✅ Works
docker-compose down           # ✅ Works
```

**NOT using (Docker Compose v2):**
```bash
docker compose --version      # ❌ Won't work
docker compose up -d          # ❌ Won't work
docker compose down           # ❌ Won't work
```

---

### ✅ Optimized Files Created

We've prepared **two new optimized files** in your repository:

#### 1. **deploy-optimized.sh**
Streamlined deployment script that:
- Uses `docker-compose` (standalone) ✅
- Pulls pre-built images from Docker Hub
- Starts containers efficiently
- Provides clear progress feedback
- Performs health checks

**Features:**
```bash
# Standalone docker-compose commands
docker-compose down -v
docker pull srivaxshana/bookmate-backend:latest
docker pull srivaxshana/bookmate-frontend:latest
docker-compose up -d
```

---

#### 2. **Jenkinsfile-optimized**
Optimized Jenkins pipeline that:
- Builds Docker images from source
- Pushes to Docker Hub (srivaxshana)
- Copies `deploy-optimized.sh` to EC2
- Executes deployment on EC2 (52.203.189.191)
- Verifies deployment

**Pipeline Stages:**
```
Checkout
    ↓
Build Docker Images
    ↓
Push to Docker Hub
    ↓
Deploy to EC2
    ↓
Verify Status ✅
```

---

### 🚀 How to Use

#### Step 1: Prepare Repository
```bash
cd /path/to/BookMate

# Make scripts executable
chmod +x deploy-optimized.sh

# Commit to GitHub
git add deploy-optimized.sh Jenkinsfile-optimized
git commit -m "Add optimized docker-compose deployment scripts"
git push origin main
```

#### Step 2: Replace Jenkinsfile in Jenkins
```bash
# Option A: Via Jenkins UI
# Jenkins Dashboard → BookMate-Deploy → Configure
# Pipeline section → Definition: Pipeline script from SCM
# Script Path: Jenkinsfile (keep as is, it will use latest from main)

# Option B: Replace in repository
mv Jenkinsfile Jenkinsfile-backup
cp Jenkinsfile-optimized Jenkinsfile
git add Jenkinsfile
git commit -m "Use optimized Jenkinsfile with docker-compose"
git push origin main
```

#### Step 3: Verify EC2 Setup
```bash
# SSH to EC2
ssh -i ~/.ssh/bookmate-deploy-key.pem ubuntu@52.203.189.191

# Verify docker-compose is installed
docker-compose --version

# Verify docker-compose.yml exists
ls -la /opt/bookmate/docker-compose.yml

# Check docker is running
docker ps
```

#### Step 4: Trigger First Build
```
Option A: Manual
Jenkins Dashboard → BookMate-Deploy → Build Now

Option B: Automatic
git add test.txt
git commit -m "Trigger build"
git push origin main
```

---

### 📊 Deployment Flow

```
Developer's Machine
    ↓ git push
GitHub Repository
    ↓ webhook trigger
Jenkins EC2 (52.203.189.191:8080)
    ├─ Stage 1: Checkout
    ├─ Stage 2: Build Docker Images
    ├─ Stage 3: Push to Docker Hub
    └─ Stage 4: Deploy to EC2
            ↓ SSH + SCP
Target EC2 (52.203.189.191)
    ├─ docker-compose down
    ├─ docker pull images
    ├─ docker-compose up -d
    └─ Health Check ✅
    
Result: Application Updated & Running!
```

---

### 🔐 EC2 Security Group

Ensure inbound rules allow:

| Type | Port | Source | Purpose |
|------|------|--------|---------|
| HTTP | 80 | 0.0.0.0/0 | Frontend |
| Custom TCP | 8081 | 0.0.0.0/0 | Backend API |
| SSH | 22 | 0.0.0.0/0 | Jenkins deployment |

---

### 📋 Port Configuration

Based on your docker-compose.yml:

```yaml
Frontend:
  - Port 80 → http://52.203.189.191

Backend:
  - Port 8081 → http://52.203.189.191:8081/api

MySQL:
  - Port 3306 (internal only)
```

---

### ✅ Automation Checklist

- [ ] Files committed to GitHub
- [ ] Docker-compose verified on EC2
- [ ] Jenkins job configured with GitHub webhook
- [ ] First manual build successful
- [ ] Application accessible at http://52.203.189.191
- [ ] Git push triggers build automatically
- [ ] Security group ports 80, 8081, 22 open
- [ ] Backend API responding at http://52.203.189.191:8081/api

---

### 🔍 Monitor Your Deployment

**Jenkins Console:**
```
Jenkins → BookMate-Deploy → [Build #N] → Console Output
```

**EC2 Logs:**
```bash
ssh -i ~/.ssh/bookmate-deploy-key.pem ubuntu@52.203.189.191

# View all containers
docker ps

# View logs
docker logs -f bookmate-backend
docker logs -f bookmate-frontend
docker logs -f bookmate-mysql

# Restart if needed
docker-compose restart
```

**Health Check:**
```bash
# Backend health
curl http://52.203.189.191:8081/actuator/health

# API test
curl http://52.203.189.191:8081/api/books
```

---

### 🛠️ Quick Troubleshooting

| Issue | Solution |
|-------|----------|
| Build fails at Deploy stage | Check SSH key in Jenkins credentials |
| docker-compose command not found | Install: `sudo apt install -y docker-compose` |
| Webhook not triggering | Check GitHub webhook Recent Deliveries tab |
| Containers not starting | SSH to EC2 and check: `docker-compose logs` |
| Port conflicts | Check: `docker ps` and stop conflicting containers |

---

### 📈 Next Improvements

1. **Add Unit Tests**
   ```groovy
   stage('Backend Tests') {
     steps {
       dir('bookmate-backend') {
         sh 'mvn test'
       }
     }
   }
   ```

2. **Add Notifications**
   - Slack webhook on build success/failure
   - Email notifications

3. **Multi-Environment**
   - Create Dev, Staging, Production pipelines
   - Use different EC2 instances

4. **Security Enhancements**
   - Add GitHub webhook secret
   - Add SonarQube code quality
   - Add Docker image vulnerability scans

---

## 🎉 Congratulations!

You now have a **fully automated CI/CD pipeline**:

```
Code Commit → GitHub → Webhook → Jenkins Build → Docker Push → EC2 Deploy ✅
```

**Just push to main and your app auto-deploys! 🚀**


