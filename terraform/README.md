# BookMate Terraform AWS Infrastructure

This directory contains Terraform configurations to deploy BookMate application on AWS with the following resources:

## Architecture

```
┌─────────────────────────────────────────────┐
│            Internet (0.0.0.0/0)             │
└──────────────┬────────────────────────────┘
               │
         ┌─────▼──────┐
         │   ALB      │ (Application Load Balancer)
         └─────┬──────┘
               │
        ┌──────┴──────┐
        │             │
    ┌───▼──┐     ┌───▼──┐
    │ EC2  │     │ EC2  │ (Jenkins, Backend, Frontend)
    │ AZ1  │     │ AZ2  │
    └──┬───┘     └──┬───┘
       │            │
       └──────┬─────┘
              │
         ┌────▼─────┐
         │   RDS    │ (MySQL Database)
         │ Multi-AZ │
         └──────────┘

         ┌────────────┐
         │    ECR     │ (Docker Registries)
         │ Backend &  │
         │ Frontend   │
         └────────────┘
```

## Resources Created

- **VPC**: Custom VPC with public and private subnets across 2 AZs
- **ALB**: Application Load Balancer with routing for frontend and backend
- **EC2**: t3.medium instances with Docker, Jenkins, Maven, Git
- **RDS**: MySQL 8.0 database with automated backups and multi-AZ option
- **ECR**: Private Docker registries for backend and frontend images
- **Security Groups**: Properly configured security groups for ALB, EC2, and RDS
- **IAM**: Roles and policies for EC2 to access ECR and CloudWatch Logs

## Prerequisites

1. **Terraform** >= 1.0 installed
2. **AWS CLI** configured with credentials
3. **AWS Account** with appropriate permissions
4. **S3 Bucket** and **DynamoDB Table** for Terraform state (optional but recommended)

### Setup S3 Backend (Recommended)

```bash
# Create S3 bucket for state
aws s3api create-bucket \
  --bucket bookmate-terraform-state \
  --region us-east-1

# Enable versioning
aws s3api put-bucket-versioning \
  --bucket bookmate-terraform-state \
  --versioning-configuration Status=Enabled

# Create DynamoDB table for locks
aws dynamodb create-table \
  --table-name bookmate-terraform-locks \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5
```

## Usage

### 1. Copy and Configure Variables

```bash
cp terraform.tfvars.example terraform.tfvars
```

Edit `terraform.tfvars` with your desired values:

```hcl
aws_region      = "us-east-1"
project_name    = "bookmate"
environment     = "dev"
instance_type   = "t3.medium"
instance_count  = 2
db_password     = "YOUR_SECURE_PASSWORD"  # Or set via environment variable
```

### 2. Initialize Terraform

```bash
terraform init
```

### 3. Plan Deployment

```bash
terraform plan -out=tfplan
```

Review the plan carefully before applying.

### 4. Apply Configuration

```bash
terraform apply tfplan
```

This will create all AWS resources. It typically takes 15-20 minutes.

### 5. Get Outputs

After successful deployment, get the important information:

```bash
terraform output

# Or specific outputs:
terraform output alb_dns_name
terraform output rds_endpoint
terraform output backend_ecr_repository_url
terraform output access_url
```

## Variables

| Variable | Description | Default | Sensitive |
|----------|-------------|---------|-----------|
| aws_region | AWS region | us-east-1 | No |
| project_name | Project name | bookmate | No |
| environment | Environment (dev/staging/prod) | dev | No |
| vpc_cidr | VPC CIDR block | 10.0.0.0/16 | No |
| instance_type | EC2 instance type | t3.medium | No |
| instance_count | Number of EC2 instances | 2 | No |
| mysql_version | MySQL version | 8.0 | No |
| db_instance_class | RDS instance class | db.t3.micro | No |
| db_allocated_storage | RDS storage (GB) | 20 | No |
| db_password | Database password | - | Yes |
| db_multi_az | Enable RDS Multi-AZ | false | No |
| backup_retention_days | Backup retention (days) | 7 | No |

## Security Considerations

### Production Recommendations

1. **Restrict SSH Access**: Change `ssh_cidr_blocks` to specific IP ranges
   ```hcl
   ssh_cidr_blocks = ["203.0.113.0/32"]  # Your office IP
   ```

2. **Use Secrets Manager**: Store sensitive variables in AWS Secrets Manager
   ```bash
   aws secretsmanager create-secret \
     --name bookmate/db-password \
     --secret-string "YOUR_SECURE_PASSWORD"
   ```

3. **Enable Multi-AZ for RDS**: Set `db_multi_az = true`

4. **Use HTTPS/TLS**: Add SSL certificate to ALB
   ```hcl
   # In main.tf, update ALB listener:
   protocol = "HTTPS"
   ssl_policy = "ELBSecurityPolicy-TLS-1-2-2017-01"
   certificate_arn = "arn:aws:acm:us-east-1:..."
   ```

5. **Enable RDS Encryption**: Already enabled by default (`storage_encrypted = true`)

6. **Update ALB Security Group**: Restrict to HTTPS only
   ```hcl
   # Remove HTTP rule, add HTTPS rule
   ```

7. **Setup WAF**: Add AWS WAF to ALB for additional protection

## Post-Deployment

### 1. Jenkins Setup

1. SSH to an EC2 instance:
   ```bash
   ssh -i your-key.pem ubuntu@<public-ip>
   ```

2. Get Jenkins initial password:
   ```bash
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   ```

3. Access Jenkins:
   ```
   http://<alb-dns-name>:8080  # or adjust routing
   ```

4. Configure Jenkins:
   - Install recommended plugins
   - Add Docker credentials
   - Configure pipeline jobs pointing to GitHub

### 2. Configure ECR Access in Jenkins

```groovy
// In Jenkins pipeline
withAWS(credentials: 'aws-credentials') {
    sh '''
        aws ecr get-login-password --region us-east-1 | \
        docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com
    '''
}
```

### 3. Update Application Configuration

Update `docker-compose.yml` to use RDS endpoint:

```yaml
environment:
  SPRING_DATASOURCE_URL: jdbc:mysql://${RDS_ENDPOINT}:3306/bookmate_db
  SPRING_DATASOURCE_USERNAME: ${DB_USERNAME}
  SPRING_DATASOURCE_PASSWORD: ${DB_PASSWORD}
```

## Cleanup

To destroy all resources:

```bash
terraform destroy
```

## Monitoring

### CloudWatch Logs

EC2 instances will send logs to CloudWatch (requires IAM policy - already configured).

### RDS Monitoring

Access RDS monitoring in AWS Console:
- CPU Utilization
- Database Connections
- Network I/O
- Storage Space

### ALB Monitoring

Monitor ALB metrics:
- Target health checks
- Request count
- Latency
- HTTP 4xx/5xx errors

## Troubleshooting

### EC2 Bootstrap Failures

Check user data logs:
```bash
ssh -i your-key.pem ubuntu@<public-ip>
cat /var/log/cloud-init-output.log
```

### RDS Connection Issues

1. Check security group rules
2. Verify database password
3. Test connection from EC2:
   ```bash
   mysql -h <rds-endpoint> -u bookmate -p bookmate_db
   ```

### ECR Authentication

```bash
# Get login command
aws ecr get-login-password --region us-east-1 | \
docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com

# Tag and push image
docker tag bookmate-backend:latest ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/bookmate/bookmate-backend:latest
docker push ${AWS_ACCOUNT_ID}.dkr.ecr.us-east-1.amazonaws.com/bookmate/bookmate-backend:latest
```

## Cost Estimation

### Monthly Cost (Approximate)
- EC2 t3.medium x 2: ~$30-40
- RDS db.t3.micro: ~$30-40
- ALB: ~$16
- NAT Gateway: ~$32
- Data Transfer: ~$10-20
- **Total: ~$120-150/month**

For cost optimization:
- Use t3.micro for dev environments
- Disable Multi-AZ for non-production
- Use Reserved Instances
- Set up Auto Scaling

## Support

For issues or questions:
1. Check AWS CloudFormation/Terraform documentation
2. Review IAM permissions
3. Check CloudWatch Logs
4. Consult AWS Support

## License

This Terraform configuration is part of the BookMate project.
