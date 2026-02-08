// pipeline {
//     agent any

//     tools {
//         maven 'Maven' 
//     }
    
//     stages {
//         stage('Checkout') {
//             steps {
//                 echo 'Checking out from GitHub...'
//                 checkout scm
//             }
//         }
        
//         stage('Build Backend') {
//             steps {
//                 echo 'Building Spring Boot application...'
//                 dir('bookmate-backend') {
//                     sh 'mvn clean package -DskipTests'
//                 }
//             }
//         }
        
//         stage('Build Docker Images') {
//             steps {
//                 echo 'Building Docker images...'
//                 sh 'docker-compose build'
//             }
//         }
        
//         stage('Deploy') {
//             steps {
//                 echo 'Cleaning old containers...'
//                 sh 'docker-compose down -v || true'
//        	        sh 'docker rm -f bookmate-mysql bookmate-backend bookmate-frontend || true'				           
//                 echo 'Starting new containers...'
//                 sh 'docker-compose up -d'
//             }
//         }
//     }
    
//     post {
//         success {
//             echo 'Build completed successfully!'
//         }
//         failure {
//             echo 'Build failed!'
//         }
//     }
// }



//2 


// pipeline {
//     agent any

//     tools {
//         maven 'Maven'
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 echo 'Checking out from GitHub...'
//                 checkout scm
//             }
//         }

//         stage('Terraform Apply') {
//             steps {
//                 dir('terraform') {
//                     withCredentials([[$class: 'UsernamePasswordMultiBinding',
//                                     credentialsId: 'aws-creds-id',
//                                     usernameVariable: 'AWS_ACCESS_KEY_ID',
//                                     passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {
//                         sh '''
//                             echo "Provisioning infrastructure with Terraform..."
//                             terraform init
//                             terraform apply -auto-approve
//                         '''
//                     }
//                 }
//             }
//         }

//         stage('Output EC2 Public IP') {
//             steps {
//                 echo 'Fetching EC2 public IP...'
//                 dir('terraform') {
//                     script {
//                         def ec2_ip = sh(
//                             script: "terraform output -raw public_ip",
//                             returnStdout: true
//                         ).trim()
//                         echo "EC2 instance is running at: http://${ec2_ip}"
//                     }
//                 }
//             }
//         }

//         stage('Build Backend') {
//             steps {
//                 echo 'Building Spring Boot application...'
//                 dir('bookmate-backend') {
//                     sh 'mvn clean package -DskipTests'
//                 }
//             }
//         }

//         stage('Build Frontend') {
//             steps {
//                 echo 'Building React frontend...'
//                 dir('bookmate-frontend') {
//                     sh 'npm install'
//                     sh 'npm run build'
//                 }
//             }
//         }

//         stage('Build Docker Images') {
//             steps {
//                 echo 'Building Docker images...'
//                 sh 'docker-compose build'
//             }
//         }

//         stage('Deploy') {
//             steps {
//                 echo 'Cleaning old containers...'
//                 sh 'docker-compose down -v || true'
//                 sh 'docker rm -f bookmate-mysql bookmate-backend bookmate-frontend nginx || true'
//                 echo 'Starting new containers...'
//                 sh 'docker-compose up -d'
//             }
//         }
//     }

//     post {
//         success {
//             echo 'Pipeline completed successfully!'
//         }
//         failure {
//             echo 'Pipeline failed!'
//         }
//     }
// }



//3 
// pipeline {
//     agent any

//     tools {
//         maven 'Maven'
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 echo 'Checking out from GitHub...'
//                 checkout scm
//             }
//         }

//         stage('Terraform Apply') {
//             steps {
//                 dir('terraform') {
//                     withCredentials([[$class: 'UsernamePasswordMultiBinding',
//                         credentialsId: 'aws-creds-id',
//                         usernameVariable: 'AWS_ACCESS_KEY_ID',
//                         passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {
//                         sh '''
//                             echo "Provisioning infrastructure with Terraform..."
//                             terraform init
//                             terraform apply -auto-approve
//                         '''
//                     }
//                 }
//             }
//         }

//         stage('Output EC2 Public IP') {
//             steps {
//                 echo 'Fetching EC2 public IP...'
//                 dir('terraform') {
//                     script {
//                         def ec2_ip = sh(
//                             script: "terraform output -raw public_ip",
//                             returnStdout: true
//                         ).trim()
//                         echo "EC2 instance is running at: http://${ec2_ip}"
//                     }
//                 }
//             }
//         }

//         stage('Build Backend') {
//             steps {
//                 echo 'Building Spring Boot application...'
//                 dir('bookmate-backend') {
//                     sh 'mvn clean package -DskipTests'
//                 }
//             }
//         }

//         stage('Build Backend Docker Image') {
//             steps {
//                 echo 'Packaging backend into Docker image...'
//                 dir('bookmate-backend') {
//                     sh 'docker build -t bookmate-backend .'
//                 }
//             }
//         }

//         stage('Build Frontend Docker Image') {
//             steps {
//                 echo 'Packaging frontend into Docker image...'
//                 dir('bookmate-frontend') {
//                     sh 'docker build -t bookmate-frontend .'
//                 }
//             }
//         }

//         stage('Deploy Containers') {
//             steps {
//                 echo 'Cleaning old containers...'
//                 sh '''
//                     docker rm -f bookmate-mysql || true
//                     docker rm -f bookmate-backend || true 
//                     docker rm -f bookmate-frontend || true
//                     docker rm -f nginx || true
//                 '''
//                 echo 'Starting new containers...'
//                 sh '''
//                     docker run -d --name bookmate-backend -p 8081:8080 bookmate-backend
//                     docker run -d --name bookmate-frontend -p 3000:80 bookmate-frontend
//                     # MySQL and Nginx can be added here if you have Dockerfiles/docker-compose for them
//                 '''
//             }
//         }
//     }

//     post {
//         success {
//             echo 'Pipeline completed successfully!'
//         }
//         failure {
//             echo 'Pipeline failed!'
//         }
//     }
// }


//4

// pipeline {
//     agent any

//     tools {
//         maven 'Maven'
//     }

//     stages {
//         stage('Checkout') {
//             steps {
//                 echo 'Checking out from GitHub...'
//                 checkout scm
//             }
//         }

//         stage('Terraform Apply') {
//             steps {
//                 dir('terraform') {
//                     withCredentials([[$class: 'UsernamePasswordMultiBinding',
//                         credentialsId: 'aws-creds-id',
//                         usernameVariable: 'AWS_ACCESS_KEY_ID',
//                         passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {
//                         sh '''
//                             echo "Provisioning infrastructure with Terraform..."
//                             terraform init
//                             terraform apply -auto-approve
//                         '''
//                     }
//                 }
//             }
//         }

//         stage('Output EC2 Public IP') {
//             steps {
//                 dir('terraform') {
//                     script {
//                         def ec2_ip = sh(
//                             script: "terraform output -raw public_ip",
//                             returnStdout: true
//                         ).trim()
//                         echo "EC2 instance is running at: http://${ec2_ip}"
//                     }
//                 }
//             }
//         }

//         stage('Output EC2 Elastic IP') { 
//             steps { 
//                 dir('terraform') { 
//                     script { 
//                         env.EC2_IP  = sh( 
//                             script: "terraform output -raw elastic_ip", 
//                             returnStdout: true 
//                             ).trim() 
//                             echo "EC2 instance is running at: http://${env.EC2_IP}" 
//                     } 
//                 } 
//             } 
//         }

//         stage('Build Backend') {
//             steps {
//                 dir('bookmate-backend') {
//                     sh 'mvn clean package -DskipTests'
//                 }
//             }
//         }

//         stage('Build Docker Images') {
//             steps {
//                 sh '''
//                     docker build -t bookmate-backend ./bookmate-backend
//                     docker build -t bookmate-frontend ./bookmate-frontend
//                 '''
//             }
//         }

//         stage('Deploy with Docker Compose') {
//             steps {
//                 sh '''
//                     docker-compose down || true
//                     docker rm -f bookmate-mysql || true
//                     docker rm -f bookmate-backend || true
//                     docker rm -f bookmate-frontend || true
//                     docker rm -f nginx || true
//                     docker-compose up -d --build
//                 '''
//             }
//         }
//     }

//     post {
//         success {
//             echo 'Pipeline completed successfully!'
//         }
//         failure {
//             echo 'Pipeline failed!'
//         }
//     }
// }



//5
pipeline {
    agent any

    tools {
        maven 'Maven'
    }

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKERHUB_USERNAME = 'srivaxshana'
        AWS_REGION = 'us-east-1'
    }

    parameters {
        booleanParam(name: 'RUN_TERRAFORM', defaultValue: false, description: 'Create/Update infra with Terraform (disable for normal deploys)')
        string(name: 'DEPLOY_INSTANCE_TAG', defaultValue: 'BookMate-App', description: 'EC2 Name tag to deploy to')
        string(name: 'ELASTIC_IP', defaultValue: '', description: 'Optional: use this Elastic IP to find the instance (overrides tag lookup)')
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out from GitHub...'
                checkout scm
                                // Ensure repository-provided Maven settings are used by system Maven
                                sh '''
                                    if [ -f .mvn/settings.xml ]; then
                                        mkdir -p $HOME/.m2
                                        cp .mvn/settings.xml $HOME/.m2/settings.xml
                                        echo "Copied .mvn/settings.xml -> $HOME/.m2/settings.xml"
                                    else
                                        echo "No .mvn/settings.xml found in repo; skipping copy"
                                    fi
                                '''
            }
        }

        stage('Terraform Init & Plan') {
            when {
                expression { return params.RUN_TERRAFORM }
            }
            steps {
                dir('terraform') {
                    withCredentials([[$class: 'UsernamePasswordMultiBinding',
                        credentialsId: 'aws-creds-id',
                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                        sh '''
                            # Use existing system terraform
                            terraform init
                            terraform plan -out=tfplan
                        '''
                    }
                }
            }
        }

        stage('Terraform Apply') {
            when {
                expression { return params.RUN_TERRAFORM }
            }
            steps {
                dir('terraform') {
                    withCredentials([[$class: 'UsernamePasswordMultiBinding',
                        credentialsId: 'aws-creds-id',
                        usernameVariable: 'AWS_ACCESS_KEY_ID',
                        passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                        sh '''
                            terraform apply -auto-approve tfplan
                        '''
                    }
                }
            }
        }

        stage('Get EC2 IP') {
            steps {
                withCredentials([[$class: 'UsernamePasswordMultiBinding',
                    credentialsId: 'aws-creds-id',
                    usernameVariable: 'AWS_ACCESS_KEY_ID',
                    passwordVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    script {
                        def publicIp = ''
                        def instanceId = ''
                        def elasticIp = ''
                        if (params.ELASTIC_IP?.trim()) {
                            echo "Looking up instance by Elastic IP: ${params.ELASTIC_IP}"
                            instanceId = sh(script: "aws ec2 describe-addresses --public-ips ${params.ELASTIC_IP} --region ${AWS_REGION} --query 'Addresses[0].InstanceId' --output text", returnStdout: true).trim()
                            if (instanceId && instanceId != 'None') {
                                echo "Found instance id ${instanceId} for Elastic IP ${params.ELASTIC_IP}"
                                publicIp = sh(script: "aws ec2 describe-instances --instance-ids ${instanceId} --region ${AWS_REGION} --query 'Reservations[0].Instances[0].PublicIpAddress' --output text", returnStdout: true).trim()
                                elasticIp = params.ELASTIC_IP.trim()
                            } else {
                                echo "No instance associated with Elastic IP ${params.ELASTIC_IP}; falling back to tag lookup"
                            }
                        }

                        if (!publicIp) {
                            publicIp = sh(
                                script: """
                                    aws ec2 describe-instances \
                                      --region ${AWS_REGION} \
                                      --filters 'Name=tag:Name,Values=${params.DEPLOY_INSTANCE_TAG}' 'Name=instance-state-name,Values=running' \
                                      --query 'Reservations[0].Instances[0].PublicIpAddress' \
                                      --output text
                                """,
                                returnStdout: true
                            ).trim()
                            instanceId = sh(
                                script: """
                                    aws ec2 describe-instances \
                                      --region ${AWS_REGION} \
                                      --filters 'Name=tag:Name,Values=${params.DEPLOY_INSTANCE_TAG}' 'Name=instance-state-name,Values=running' \
                                      --query 'Reservations[0].Instances[0].InstanceId' \
                                      --output text
                                """,
                                returnStdout: true
                            ).trim()
                        }

                        if (!publicIp || publicIp == 'None') {
                            error("No running EC2 instance found with tag Name=${params.DEPLOY_INSTANCE_TAG}")
                        }

                        if (!instanceId || instanceId == 'None') {
                            instanceId = sh(script: "aws ec2 describe-instances --region ${AWS_REGION} --filters Name=ip-address,Values=${publicIp} --query 'Reservations[0].Instances[0].InstanceId' --output text", returnStdout: true).trim()
                        }

                        if (!elasticIp) {
                            elasticIp = sh(script: "aws ec2 describe-addresses --region ${AWS_REGION} --filters Name=instance-id,Values=${instanceId} --query 'Addresses[0].PublicIp' --output text", returnStdout: true).trim()
                        }

                        // Get volume info
                        def volumes = sh(script: "aws ec2 describe-volumes --region ${AWS_REGION} --filters Name=attachment.instance-id,Values=${instanceId} --query 'Volumes[*].[VolumeId,Size]' --output text", returnStdout: true).trim()

                        env.EC2_IP = publicIp
                        env.INSTANCE_ID = instanceId
                        echo "\n\n"
                        echo "╔═════════════════════════════════════════════════════════════════╗"
                        echo "║               🎯 DEPLOYMENT TARGET IDENTIFIED 🎯                  ║"
                        echo "╠═════════════════════════════════════════════════════════════════╣"
                        echo "║ Elastic IP (USE THIS): ${elasticIp && elasticIp != 'None' ? elasticIp : 'NONE'}                              ║"
                        echo "║ Instance ID: ${instanceId}                                       ║"
                        echo "║ Public IP: ${publicIp}                                           ║"
                        echo "║ Tag: ${params.DEPLOY_INSTANCE_TAG}                                                 ║"
                        echo "║                                                                   ║"
                        echo "║ 🌐 Access at: http://${elasticIp && elasticIp != 'None' ? elasticIp : publicIp}                                     ║"
                        echo "║ 📊 Backend API: http://${elasticIp && elasticIp != 'None' ? elasticIp : publicIp}:8081/api                           ║"
                        echo "╟─────────────────────────────────────────────────────────────────╢"
                        echo "║ EBS VOLUMES ATTACHED:                                             ║"
                        echo volumes.split('\n').collect { line ->
                            "║ ${line}".padRight(65) + "║"
                        }.join('\n')
                        echo "╚═════════════════════════════════════════════════════════════════╝"
                        echo "\n\n"
                    }
                }
            }
        }

        stage('Build & Test Backend') {
            steps {
                dir('bookmate-backend') {
                    sh '''
                        # Clean up any existing test container and network
                        docker stop test-mysql 2>/dev/null || true
                        docker rm test-mysql 2>/dev/null || true
                        docker network rm test-net 2>/dev/null || true
                        
                        # Create a Docker network for testing
                        docker network create test-net
                        
                        # Start MySQL container on the test network
                        docker run -d --name test-mysql --network test-net \
                            -e MYSQL_ROOT_PASSWORD=root123 \
                            -e MYSQL_DATABASE=bookmate_db \
                            -e MYSQL_USER=bookmate \
                            -e MYSQL_PASSWORD=bookmate123 \
                            mysql:8.0
                        
                        # Wait for MySQL to be ready (improved check)
                        echo "Waiting for MySQL to start..."
                        for i in {1..60}; do
                            if docker exec test-mysql mysqladmin ping -h localhost --silent 2>/dev/null; then
                                echo "MySQL is ready!"
                                sleep 5  # Extra time for full initialization
                                break
                            fi
                            echo "Waiting... $i/60"
                            sleep 2
                        done
                        
                        # Run tests using Docker network (connect to MySQL by container name)
                        docker run --rm --network test-net \
                            -v $PWD:/app \
                            -v $PWD/.mvn/settings.xml:/root/.m2/settings.xml \
                            -w /app \
                            maven:3.9.4-eclipse-temurin-21 \
                            mvn -B -U -s /root/.m2/settings.xml clean package \
                            -Dspring.datasource.url=jdbc:mysql://test-mysql:3306/bookmate_db \
                            -Dspring.datasource.username=bookmate \
                            -Dspring.datasource.password=bookmate123
                        
                        # Clean up test container and network
                        docker stop test-mysql
                        docker rm test-mysql
                        docker network rm test-net
                    '''
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh '''
                    echo "Building Docker images..."
                    docker build -t ${DOCKERHUB_USERNAME}/bookmate-backend:${BUILD_NUMBER} ./bookmate-backend
                    docker build -t ${DOCKERHUB_USERNAME}/bookmate-backend:latest ./bookmate-backend
                    
                    docker build -t ${DOCKERHUB_USERNAME}/bookmate-frontend:${BUILD_NUMBER} ./bookmate-frontend
                    docker build -t ${DOCKERHUB_USERNAME}/bookmate-frontend:latest ./bookmate-frontend
                '''
            }
        }

        stage('Push to Docker Hub') {
            steps {
                sh '''
                    echo "Logging into Docker Hub..."
                    echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin
                    
                    echo "Pushing images to Docker Hub..."
                    docker push ${DOCKERHUB_USERNAME}/bookmate-backend:${BUILD_NUMBER}
                    docker push ${DOCKERHUB_USERNAME}/bookmate-backend:latest
                    
                    docker push ${DOCKERHUB_USERNAME}/bookmate-frontend:${BUILD_NUMBER}
                    docker push ${DOCKERHUB_USERNAME}/bookmate-frontend:latest
                    
                    echo "Logging out from Docker Hub..."
                    docker logout
                '''
            }
        }

        stage('Deploy to EC2') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'SSH_KEY_FILE')]) {
                    sh '''bash -s <<'BASH'
                        set -euo pipefail
                        TARGET_IP="${EC2_IP}"
                        INSTANCE_ID="${INSTANCE_ID}"
                        echo "Target IP from environment: $TARGET_IP"
                        echo "Instance ID from environment: $INSTANCE_ID"

                        if [ -z "$TARGET_IP" ]; then
                            echo "ERROR: TARGET_IP is empty!"
                            exit 1
                        fi
                        
                        echo ""
                        echo "╔════════════════════════════════════════════════════════════╗"
                        echo "║          🚀 STARTING DEPLOYMENT TO EC2                      ║"
                        echo "╚════════════════════════════════════════════════════════════╝"
                        echo ""
                        
                        echo "=== DEBUG: Checking required tools ==="
                        which ssh || { echo "ERROR: ssh not found"; exit 1; }
                        which ssh-add || { echo "ERROR: ssh-add not found"; exit 1; }
                        
                        echo "=== DEBUG: SSH Key info ==="
                        ls -la "$SSH_KEY_FILE"
                        chmod 600 "$SSH_KEY_FILE"
                        
                        echo ""
                        echo "=== DEBUG: Testing SSH connection to $TARGET_IP ==="
                        MAX_ATTEMPTS=20
                        ATTEMPT=1
                        SSH_SUCCESS=0
                        while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
                            echo "SSH connection attempt $ATTEMPT of $MAX_ATTEMPTS..."
                            if ssh -o StrictHostKeyChecking=no -o ConnectTimeout=10 -i "$SSH_KEY_FILE" ubuntu@"$TARGET_IP" 'echo "SSH TEST OK"' 2>&1; then
                                echo "✅ SSH connectivity confirmed on attempt $ATTEMPT"
                                SSH_SUCCESS=1
                                break
                            else
                                if [ $ATTEMPT -lt $MAX_ATTEMPTS ]; then
                                    WAIT_TIME=$((ATTEMPT * 20))
                                    echo "SSH connection failed, waiting ${WAIT_TIME}s before retry (EC2 still initializing)..."
                                    sleep $WAIT_TIME
                                fi
                            fi
                            ATTEMPT=$((ATTEMPT + 1))
                        done
                        
                        if [ $SSH_SUCCESS -eq 0 ]; then
                            echo "❌ SSH test failed after $MAX_ATTEMPTS attempts - check security group, key, and EC2 status"
                            exit 1
                        fi
                        
                        echo ""
                        echo "╔════════════════════════════════════════════════════════════╗"
                        echo "║          📋 RUNNING DEPLOYMENT SCRIPT ON EC2                ║"
                        echo "╚════════════════════════════════════════════════════════════╝"
                        echo ""
                        
                        ssh -o StrictHostKeyChecking=no -i "$SSH_KEY_FILE" ubuntu@"$TARGET_IP" <<'ENDSSH'
set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║  🔧 EC2 DEPLOYMENT SCRIPT STARTED"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

# Check pre-requisites
echo "=== CHECKING VOLUMES ==="
echo "Listing all block devices:"
lsblk
echo ""

echo "Checking /mnt mount points:"
df -h /mnt* 2>/dev/null || echo "No /mnt* mount points found yet"
echo ""

# Upgrade Docker Compose to V2 if needed
echo "=== DOCKER COMPOSE VERSION CHECK ==="
COMPOSE_VERSION=$(docker-compose --version 2>&1 | grep -oP '(?<=version )[0-9]+' | head -1 || echo "0")
echo "Current Docker Compose major version: $COMPOSE_VERSION"

if [ "$COMPOSE_VERSION" -lt 2 ]; then
    echo "Upgrading Docker Compose to V2..."
    sudo rm -f /usr/bin/docker-compose /usr/local/bin/docker-compose
    DOCKER_COMPOSE_VERSION="2.24.5"
    sudo curl -SL "https://github.com/docker/compose/releases/download/v${DOCKER_COMPOSE_VERSION}/docker-compose-linux-x86_64" -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
    sudo ln -sf /usr/local/bin/docker-compose /usr/bin/docker-compose
    echo "✅ Docker Compose upgraded to V2"
    docker-compose --version
else
    echo "✅ Docker Compose V2 already installed"
    docker-compose --version
fi
echo ""

# Ensure directory exists
echo "=== CODE REPOSITORY SETUP ==="
if [ ! -d /opt/bookmate ]; then
    echo "Creating /opt/bookmate directory..."
    sudo mkdir -p /opt/bookmate
    sudo chown ubuntu:ubuntu /opt/bookmate
fi
cd /opt/bookmate
echo "✅ Working directory: $(pwd)"
echo ""

# Update code from GitHub
echo "=== CLONING/UPDATING CODE FROM GITHUB ==="
if [ -d .git ]; then
    echo "Repository already exists, pulling latest changes..."
    git pull origin main || { 
        echo "Pull failed, doing hard reset..."
        git fetch --all
        git reset --hard origin/main
    }
else
    echo "Cloning repository from GitHub..."
    git clone https://github.com/Srivaxshana/BookMate.git .
fi
echo "✅ Code updated"
ls -la | head -20
echo ""

# Verify docker-compose.yml exists
echo "=== VERIFYING DOCKER-COMPOSE.YML ==="
if [ -f docker-compose.yml ]; then
    echo "✅ docker-compose.yml found"
    echo "Content (first 30 lines):"
    head -30 docker-compose.yml
else
    echo "❌ ERROR: docker-compose.yml NOT FOUND!"
    echo "Files in current directory:"
    ls -la
    exit 1
fi
echo ""

# Ensure ubuntu user is in docker group
echo "=== DOCKER GROUP SETUP ==="
sudo usermod -aG docker ubuntu || true
echo "✅ Ubuntu user in docker group"
echo ""

# Stop old containers
echo "=== STOPPING OLD CONTAINERS ==="
echo "Running docker-compose down..."
sudo docker-compose down -v 2>&1 || echo "No containers to stop (first run)"
echo ""

# Clean up old images
echo "=== CLEANING UP DOCKER RESOURCES ==="
echo "Running docker system prune..."
sudo docker system prune -af 2>&1 || true
echo "✅ Cleanup complete"
echo ""

# Pull latest images
echo "=== PULLING LATEST IMAGES FROM DOCKER HUB ==="
echo "Pulling backend image..."
sudo docker pull srivaxshana/bookmate-backend:latest || { echo "❌ Failed to pull backend"; exit 1; }
echo "✅ Backend image pulled"

echo "Pulling frontend image..."
sudo docker pull srivaxshana/bookmate-frontend:latest || { echo "❌ Failed to pull frontend"; exit 1; }
echo "✅ Frontend image pulled"
echo ""

# Start services
echo "╔════════════════════════════════════════════════════════════╗"
echo "║          🚀 STARTING DOCKER CONTAINERS                     ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

echo "Running docker-compose up -d..."
export COMPOSE_DOCKER_CLI_BUILD=1
export DOCKER_BUILDKIT=1
sudo -E docker-compose up -d

echo ""
echo "=== CONTAINER STATUS ==="
sudo docker ps -a
echo ""

# Wait for services to start with progress logs
echo "╔════════════════════════════════════════════════════════════╗"
echo "║          ⏳ WAITING FOR SERVICES TO BECOME HEALTHY          ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

MAX_WAIT=180
INTERVAL=15
ELAPSED=0

while [ $ELAPSED -lt $MAX_WAIT ]; do
    echo "[${ELAPSED}s] Checking service health..."
    
    echo "Docker processes:"
    sudo docker ps --format "table {{.Names}}\t{{.Status}}"
    echo ""
    
    # Check MySQL
    MYSQL_STATUS=$(sudo docker inspect --format='{{.State.Status}}' bookmate-mysql 2>/dev/null || echo "missing")
    MYSQL_HEALTH=$(sudo docker inspect --format='{{.State.Health.Status}}' bookmate-mysql 2>/dev/null || echo "unknown")
    echo "MySQL status: $MYSQL_STATUS (health: $MYSQL_HEALTH)"
    
    # Check Backend
    BACKEND_STATUS=$(sudo docker inspect --format='{{.State.Status}}' bookmate-backend 2>/dev/null || echo "missing")
    BACKEND_HEALTH=$(sudo docker inspect --format='{{.State.Health.Status}}' bookmate-backend 2>/dev/null || echo "unknown")
    echo "Backend status: $BACKEND_STATUS (health: $BACKEND_HEALTH)"
    
    # Check Frontend  
    FRONTEND_STATUS=$(sudo docker inspect --format='{{.State.Status}}' bookmate-frontend 2>/dev/null || echo "missing")
    echo "Frontend status: $FRONTEND_STATUS"
    
    echo ""
    
    # If all are running, try health checks
    if [ "$MYSQL_HEALTH" = "healthy" ] && [ "$BACKEND_HEALTH" = "healthy" ]; then
        echo "✅ All services are HEALTHY!"
        break
    fi
    
    sleep $INTERVAL
    ELAPSED=$((ELAPSED + INTERVAL))
done

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║          📊 FINAL SERVICE STATUS                           ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""

echo "=== RUNNING CONTAINERS ==="
sudo docker ps

echo ""
echo "=== CONTAINER DETAILS ==="
sudo docker ps -a --format "{{.Names}}: {{.Status}}"

echo ""
echo "=== MYSQL LOGS (last 30 lines) ==="
sudo docker logs bookmate-mysql --tail 30 2>&1 || echo "Logs not available"

echo ""
echo "=== BACKEND LOGS (last 30 lines) ==="
sudo docker logs bookmate-backend --tail 30 2>&1 || echo "Logs not available"

echo ""
echo "=== FRONTEND/NGINX LOGS (last 30 lines) ==="
sudo docker logs bookmate-frontend --tail 30 2>&1 || echo "Logs not available"

echo ""
echo "=== EBS VOLUME STATUS ==="
df -h

echo ""
echo "=== MOUNTED VOLUMES ==="
mount | grep /mnt || echo "No /mnt volumes found"

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║  ✅ DEPLOYMENT COMPLETED SUCCESSFULLY!                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
ENDSSH
                        
                        EC2_EXIT_CODE=$?
                        if [ $EC2_EXIT_CODE -eq 0 ]; then
                            echo ""
                            echo "✅ Deployment script finished successfully"
                        else
                            echo ""
                            echo "❌ Deployment script failed with exit code $EC2_EXIT_CODE"
                            exit $EC2_EXIT_CODE
                        fi
BASH
                    '''
                }
            }
        }
    }

    post {
        success {
            echo '✅ Pipeline completed successfully!'
            echo "🌐 Application deployed at: http://${env.EC2_IP}"
        }
        failure {
            echo '❌ Pipeline failed!'
        }
    }
}