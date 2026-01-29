output "alb_dns_name" {
  description = "DNS name of the load balancer"
  value       = aws_lb.bookmate.dns_name
}

output "alb_arn" {
  description = "ARN of the load balancer"
  value       = aws_lb.bookmate.arn
}

output "rds_endpoint" {
  description = "RDS endpoint"
  value       = aws_db_instance.bookmate.endpoint
}

output "rds_address" {
  description = "RDS database address"
  value       = aws_db_instance.bookmate.address
}

output "backend_ecr_repository_url" {
  description = "Backend ECR repository URL"
  value       = aws_ecr_repository.backend.repository_url
}

output "frontend_ecr_repository_url" {
  description = "Frontend ECR repository URL"
  value       = aws_ecr_repository.frontend.repository_url
}

output "ec2_instance_ids" {
  description = "EC2 instance IDs"
  value       = aws_instance.app_server[*].id
}

output "ec2_instance_public_ips" {
  description = "Public IPs of EC2 instances"
  value       = aws_instance.app_server[*].public_ip
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.bookmate.id
}

output "access_url" {
  description = "Application access URL"
  value       = "http://${aws_lb.bookmate.dns_name}"
}
