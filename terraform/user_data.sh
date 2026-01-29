#!/bin/bash
set -e

# Update system packages
apt-get update
apt-get upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
rm get-docker.sh

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Install Jenkins
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | apt-key add -
sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
apt-get update
apt-get install -y openjdk-21-jdk jenkins

# Install Maven
apt-get install -y maven

# Install Git
apt-get install -y git

# Start Docker and Jenkins
systemctl start docker
systemctl enable docker
systemctl start jenkins
systemctl enable jenkins

# Add jenkins user to docker group
usermod -aG docker jenkins

# Configure AWS CLI (optional - uncomment if needed)
# apt-get install -y awscli

# Log Jenkins initial password
echo "Jenkins initial password:" > /tmp/jenkins-init.log
cat /var/lib/jenkins/secrets/initialAdminPassword >> /tmp/jenkins-init.log

# Create CloudWatch logs for monitoring (optional)
# apt-get install -y awslogs

echo "Bootstrap script completed successfully!"
