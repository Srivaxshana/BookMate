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
                docker-compose \
                git \
                curl \
                wget
              systemctl start docker
              systemctl enable docker
              
              # Add ubuntu user to docker group
              usermod -aG docker ubuntu
              
              # Wait for docker to be ready
              sleep 10
              
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