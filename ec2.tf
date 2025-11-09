provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "bookmate" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.medium"
  
  tags = {
    Name = "BookMate-App"
  }
  
  user_data = <<-EOF
              #!/bin/bash
              apt-get update
              apt-get install -y docker.io docker-compose
              systemctl start docker
              systemctl enable docker
              EOF
}

output "instance_ip" {
  value = aws_instance.bookmate.public_ip
}
