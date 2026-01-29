output "instance_public_ip" {
  description = "Public IP of the EC2 instance"
  value       = aws_instance.bookmate.public_ip
}

output "instance_id" {
  description = "EC2 instance ID"
  value       = aws_instance.bookmate.id
}

output "instance_public_dns" {
  description = "Public DNS name"
  value       = aws_instance.bookmate.public_dns
}


output "ssh_command" {
  value = "ssh -i ~/.ssh/bookmate-key-v2.pem ubuntu@${aws_instance.bookmate.public_ip}"
}


output "security_group_rules" {
  description = "Ingress rules for the Bookmate security group"
  value       = aws_security_group.bookmate_sg.ingress
}