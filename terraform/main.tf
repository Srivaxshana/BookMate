data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"] # Canonical
  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }
}

resource "aws_security_group" "bookmate_sg" {
  name_prefix        = "bookmate-sg"
  description = "Security group for BookMate EC2 instance"

  ingress {
    description      = "SSH"
    from_port        = 22
    to_port          = 22
    protocol         = "tcp"
    cidr_blocks      = [var.ssh_cidr]
  }

  ingress {
    description = "HTTP(Nginx)"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

    ingress {
    description = "React Frontend"
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }


  ingress {
    description = "Spring Boot Backend"
    from_port   = 8081
    to_port     = 8081
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "MySQL Database"
    from_port   = 3306
    to_port     = 3306
    protocol    = "tcp"
    cidr_blocks = ["172.31.0.0/16"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "bookmate-sg"
  }
}

resource "aws_instance" "bookmate" {
  ami                    = data.aws_ami.ubuntu.id
  instance_type          = "t3.small"
  associate_public_ip_address = true
  vpc_security_group_ids = [aws_security_group.bookmate_sg.id]
  key_name               = var.key_name

  tags = {
    Name = "BookMate-App"
    Environment = "Dev"
    Owner       = "Sri"
  }

  # Prevent recreation - keep instance stable across deploys
  lifecycle {
    ignore_changes = [ami, user_data]
  }

  user_data = <<-EOF
              #!/bin/bash
              set -e
              
              # Wait for SSH daemon to be fully ready before proceeding
              echo "Waiting for SSH daemon to be ready..."
              for i in {1..60}; do
                if systemctl is-active --quiet ssh; then
                  echo "SSH daemon is active"
                  break
                fi
                echo "Waiting for SSH... ($i/60)"
                sleep 1
              done
              
              apt-get update -y
              apt-get install -y \
                docker.io \
                git \
                curl \
                wget
              systemctl start docker
              systemctl enable docker
              
              # Install Docker Compose V2 (supports healthcheck conditions)
              DOCKER_COMPOSE_VERSION="2.24.5"
              curl -SL "https://github.com/docker/compose/releases/download/v$${DOCKER_COMPOSE_VERSION}/docker-compose-linux-x86_64" -o /usr/local/bin/docker-compose
              chmod +x /usr/local/bin/docker-compose
              ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
              
              # Add ubuntu user to docker group
              usermod -aG docker ubuntu
              
              # Wait for docker to be ready
              sleep 10
              
              # Mount EBS volumes for data persistence
              echo "Setting up EBS volumes..."
              
              # Function to mount EBS volume
              mount_ebs_volume() {
                local device=$1
                local mount_point=$2
                local description=$3
                
                if [ -b "$device" ]; then
                  mkdir -p "$mount_point"
                  
                  # Check if filesystem exists, if not create one
                  if ! blkid "$device" 2>/dev/null; then
                    echo "Creating filesystem on $device for $description..."
                    mkfs.ext4 -F "$device"
                  fi
                  
                  # Mount the volume
                  mount "$device" "$mount_point"
                  
                  # Add to fstab for persistence
                  echo "$device $mount_point ext4 defaults,nofail 0 2" >> /etc/fstab
                  
                  # Set permissions for docker
                  chmod 755 "$mount_point"
                  chown -R ubuntu:ubuntu "$mount_point"
                  
                  echo "EBS volume mounted successfully at $mount_point ($description)"
                else
                  echo "WARNING: $device not found for $description"
                  mkdir -p "$mount_point"
                  chmod 755 "$mount_point"
                fi
              }
              
              # Wait for volumes to be attached
              echo "Waiting for volume attachments..."
              for i in {1..30}; do
                NVME1_FOUND=false
                NVME2_FOUND=false
                
                [ -b /dev/nvme1n1 ] && NVME1_FOUND=true
                [ -b /dev/nvme2n1 ] && NVME2_FOUND=true
                [ -b /dev/xvdf ] && NVME1_FOUND=true
                [ -b /dev/xvdg ] && NVME2_FOUND=true
                
                if [ "$NVME1_FOUND" = true ] && [ "$NVME2_FOUND" = true ]; then
                  echo "Both volumes found"
                  break
                fi
                
                echo "Waiting for volumes... ($i/30)"
                sleep 1
              done
              
              # Determine actual device paths and mount them
              if [ -b /dev/nvme1n1 ]; then
                mount_ebs_volume "/dev/nvme1n1" "/mnt/mysql-data" "MySQL Data"
              elif [ -b /dev/xvdf ]; then
                mount_ebs_volume "/dev/xvdf" "/mnt/mysql-data" "MySQL Data"
              fi
              
              if [ -b /dev/nvme2n1 ]; then
                mount_ebs_volume "/dev/nvme2n1" "/mnt/app-data" "App Data (Backend/Frontend)"
              elif [ -b /dev/xvdg ]; then
                mount_ebs_volume "/dev/xvdg" "/mnt/app-data" "App Data (Backend/Frontend)"
              fi
              
              # Clone the repository
              mkdir -p /opt/bookmate
              cd /opt/bookmate
              
              # Use sudo to clone as this script runs as root
              sudo -u ubuntu git clone https://github.com/Srivaxshana/BookMate.git . || git clone https://github.com/Srivaxshana/BookMate.git .
              
              # Fix ownership so ubuntu user can access it
              chown -R ubuntu:ubuntu /opt/bookmate
              chmod -R 755 /opt/bookmate
              chmod g+s /opt/bookmate
              
              # Start containers (using internal Docker network for API communication)
              cd /opt/bookmate
              docker-compose up -d
              
              # Wait for services to be ready
              sleep 15
              
              # Get the Elastic IP for logging
              ELASTIC_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)
              echo "BookMate services started successfully at $ELASTIC_IP" >> /var/log/user-data.log
              EOF
}

# EBS Volume for MySQL data persistence
resource "aws_ebs_volume" "mysql_data" {
  availability_zone = aws_instance.bookmate.availability_zone
  size              = 20  # 20 GiB for MySQL data
  type              = "gp2"
  encrypted         = false
  
  tags = {
    Name = "bookmate-mysql-data"
  }
}

# Attach EBS volume for MySQL to EC2 instance
resource "aws_volume_attachment" "mysql_data" {
  device_name = "/dev/sdf"
  volume_id   = aws_ebs_volume.mysql_data.id
  instance_id = aws_instance.bookmate.id
  
  depends_on = [aws_instance.bookmate]
}

# EBS Volume for App data (Frontend/Backend) persistence
resource "aws_ebs_volume" "app_data" {
  availability_zone = aws_instance.bookmate.availability_zone
  size              = 30  # 30 GiB for app logs, cache, etc
  type              = "gp2"
  encrypted         = false
  
  tags = {
    Name = "bookmate-app-data"
  }
}

# Attach EBS volume for app data to EC2 instance
resource "aws_volume_attachment" "app_data" {
  device_name = "/dev/sdg"
  volume_id   = aws_ebs_volume.app_data.id
  instance_id = aws_instance.bookmate.id
  
  depends_on = [aws_instance.bookmate]
}

# Using existing Elastic IP: 52.205.189.191 (eipalloc-0fe2a0f8314d0c4b5)
# Import with: terraform import aws_eip.bookmate_eip eipalloc-0fe2a0f8314d0c4b5
resource "aws_eip_association" "bookmate_eip_assoc" {
  instance_id   = aws_instance.bookmate.id
  allocation_id = "eipalloc-0fe2a0f8314d0c4b5"  # 52.205.189.191
  
  depends_on = [aws_instance.bookmate]
}

# Data source to reference the existing EIP for outputs
data "aws_eip" "bookmate_eip" {
  id = "eipalloc-0fe2a0f8314d0c4b5"
}