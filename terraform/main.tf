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
  instance_type          = "t3.micro"
  associate_public_ip_address = true
  vpc_security_group_ids = [aws_security_group.bookmate_sg.id]
  key_name               = var.key_name

  tags = {
    Name = "BookMate-App"
    Environment = "Dev"
    Owner       = "Sri"
  }

  # Prevent recreation - only update in place
  lifecycle {
    ignore_changes = [ami]
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
              
              # Mount EBS volume for MySQL data persistence
              echo "Setting up EBS volume for MySQL data..."
              
              # Wait for volume to be attached (usually /dev/xvdf)
              for i in {1..30}; do
                if [ -b /dev/nvme1n1 ]; then
                  VOLUME_DEVICE="/dev/nvme1n1"
                  echo "Found NVMe volume at $VOLUME_DEVICE"
                  break
                elif [ -b /dev/xvdf ]; then
                  VOLUME_DEVICE="/dev/xvdf"
                  echo "Found volume at $VOLUME_DEVICE"
                  break
                fi
                echo "Waiting for volume attachment... ($i/30)"
                sleep 1
              done
              
              if [ -n "$VOLUME_DEVICE" ] && [ -b "$VOLUME_DEVICE" ]; then
                # Create mount point
                mkdir -p /mnt/mysql-data
                
                # Check if filesystem exists, if not create one
                if ! sudo blkid "$VOLUME_DEVICE"; then
                  echo "Creating filesystem on $VOLUME_DEVICE..."
                  mkfs.ext4 -F "$VOLUME_DEVICE"
                fi
                
                # Mount the volume
                mount "$VOLUME_DEVICE" /mnt/mysql-data
                
                # Add to fstab for persistence
                echo "$VOLUME_DEVICE /mnt/mysql-data ext4 defaults,nofail 0 2" >> /etc/fstab
                
                # Set permissions for docker
                chmod 755 /mnt/mysql-data
                
                echo "EBS volume mounted successfully at /mnt/mysql-data"
              else
                echo "WARNING: EBS volume not found, MySQL data will use instance storage"
                mkdir -p /mnt/mysql-data
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

# Attach EBS volume to EC2 instance
resource "aws_volume_attachment" "mysql_data" {
  device_name = "/dev/sdf"
  volume_id   = aws_ebs_volume.mysql_data.id
  instance_id = aws_instance.bookmate.id
  
  depends_on = [aws_instance.bookmate]
}

resource "aws_eip" "bookmate_eip" {
  instance = aws_instance.bookmate.id
  
  depends_on = [aws_instance.bookmate]
  
  # Prevent recreation - keep the same EIP
  lifecycle {
    prevent_destroy = false
    create_before_destroy = true
  }
  
  tags = {
    Name = "bookmate-eip"
  }
}

output "elastic_ip" {
  value = aws_eip.bookmate_eip.public_ip
}