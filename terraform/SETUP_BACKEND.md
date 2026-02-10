# Terraform S3 Backend Setup

## ⚠️ ONE-TIME SETUP (Run these commands once)

### 1. Create S3 Bucket for State Storage
```bash
aws s3api create-bucket \
  --bucket bookmate-terraform-state \
  --region us-east-1

# Enable versioning (safety for state history)
aws s3api put-bucket-versioning \
  --bucket bookmate-terraform-state \
  --versioning-configuration Status=Enabled

# Enable encryption
aws s3api put-bucket-encryption \
  --bucket bookmate-terraform-state \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      }
    }]
  }'

# Block public access
aws s3api put-public-access-block \
  --bucket bookmate-terraform-state \
  --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=true,RestrictPublicBuckets=true"
```

### 2. Create DynamoDB Table for State Locking
```bash
aws dynamodb create-table \
  --table-name bookmate-terraform-locks \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1
```

### 3. Initialize Backend and Migrate State
```bash
cd terraform

# Backup any local state (if exists)
cp terraform.tfstate terraform.tfstate.backup 2>/dev/null || true

# Initialize with new backend
terraform init -reconfigure

# Terraform will ask: "Do you want to copy existing state to the new backend?"
# Answer: yes
```

### 4. Verify Backend is Working
```bash
# Check state is in S3
aws s3 ls s3://bookmate-terraform-state/bookmate/

# Check DynamoDB table
aws dynamodb describe-table --table-name bookmate-terraform-locks --region us-east-1
```

---

## 🔧 Jenkins Configuration

Add to Jenkinsfile's Terraform stages:
```groovy
// No changes needed! Backend configuration is in backend.tf
// Just ensure AWS credentials have S3 and DynamoDB permissions
```

---

## 📝 Notes

- **Elastic IP** `52.205.189.191` is now managed via association, not resource creation
- State is now **shared** across all Jenkins builds
- State locking **prevents** concurrent apply conflicts
- S3 versioning allows **rollback** if state gets corrupted

---

## 🚨 Troubleshooting

**Error: "Failed to get existing workspaces"**
```bash
# Re-initialize backend
terraform init -reconfigure
```

**Error: "Error acquiring the state lock"**
```bash
# Someone else is running terraform, wait OR force unlock:
terraform force-unlock <LOCK_ID>
```

**Want to switch back to local state?**
```bash
# Comment out backend.tf's backend {} block
terraform init -migrate-state
```
