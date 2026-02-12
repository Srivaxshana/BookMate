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
                            # Use existing system terraform (non-interactive for CI)
                            rm -rf .terraform
                            rm -f terraform.tfstate terraform.tfstate.backup
                            terraform init -reconfigure -input=false
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
                        // Fixed Elastic IP and Instance ID from Terraform
                        def elasticIp = '52.203.189.191'
                        def instanceId = 'i-03f436fbd16f9fc37'
                        def publicIp = ''
                        
                        echo "Using fixed Elastic IP: ${elasticIp}"
                        echo "Using fixed Instance ID: ${instanceId}"
                        
                        // Verify instance is running
                        publicIp = sh(script: "aws ec2 describe-instances --instance-ids ${instanceId} --region ${AWS_REGION} --query 'Reservations[0].Instances[0].PublicIpAddress' --output text", returnStdout: true).trim()
                        
                        if (params.ELASTIC_IP?.trim()) {
                            echo "INFO: ELASTIC_IP parameter ignored - using fixed IP ${elasticIp}"
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
                withCredentials([sshUserPrivateKey(credentialsId: 'ec2-ssh-key', keyFileVariable: 'SSH_KEY_FILE', usernameVariable: 'SSH_USER')]) {
                    sh '''
                        set -e
                        TARGET_IP="${EC2_IP}"
                        INSTANCE_ID="${INSTANCE_ID}"
                        echo "Target IP: $TARGET_IP"
                        echo "Instance ID: $INSTANCE_ID"

                        if [ -z "$TARGET_IP" ]; then
                            echo "ERROR: TARGET_IP is empty!"
                            exit 1
                        fi
                        
                        echo ""
                        echo "╔════════════════════════════════════════════════════════════╗"
                        echo "║          🚀 STARTING DEPLOYMENT TO EC2                      ║"
                        echo "╚════════════════════════════════════════════════════════════╝"
                        echo ""
                        
                        echo "=== DEBUG: Checking SSH connectivity ==="
                        chmod 600 "$SSH_KEY_FILE"
                        mkdir -p "$HOME/.ssh"
                        ssh-keygen -f "$HOME/.ssh/known_hosts" -R "$TARGET_IP" || true
                        ssh-keyscan -H "$TARGET_IP" >> "$HOME/.ssh/known_hosts" 2>/dev/null || true
                        
                        MAX_ATTEMPTS=20
                        ATTEMPT=1
                        SSH_SUCCESS=0
                        while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
                            echo "SSH connection attempt $ATTEMPT of $MAX_ATTEMPTS..."
                            if ssh -o StrictHostKeyChecking=no -o ConnectTimeout=10 -i "$SSH_KEY_FILE" ${SSH_USER}@"$TARGET_IP" 'echo "SSH TEST OK"' 2>&1; then
                                echo "✅ SSH connectivity confirmed on attempt $ATTEMPT"
                                SSH_SUCCESS=1
                                break
                            else
                                if [ $ATTEMPT -lt $MAX_ATTEMPTS ]; then
                                    WAIT_TIME=$((ATTEMPT * 20))
                                    echo "SSH connection failed, waiting ${WAIT_TIME}s before retry..."
                                    sleep $WAIT_TIME
                                fi
                            fi
                            ATTEMPT=$((ATTEMPT + 1))
                        done
                        
                        if [ $SSH_SUCCESS -eq 0 ]; then
                            echo "❌ SSH test failed after $MAX_ATTEMPTS attempts"
                            exit 1
                        fi
                        
                        echo ""
                        echo "=== Copying deployment script to EC2 ==="
                        scp -o StrictHostKeyChecking=no -i "$SSH_KEY_FILE" deploy.sh ${SSH_USER}@"$TARGET_IP":/tmp/deploy.sh
                        
                        echo ""
                        echo "=== Executing deployment script on EC2 ==="
                        ssh -o StrictHostKeyChecking=no -i "$SSH_KEY_FILE" ${SSH_USER}@"$TARGET_IP" "bash /tmp/deploy.sh 2>&1 | tee /tmp/deploy.log"
                        
                        echo ""
                        echo "=== Retrieving deployment logs ==="
                        scp -o StrictHostKeyChecking=no -i "$SSH_KEY_FILE" ${SSH_USER}@"$TARGET_IP":/tmp/deploy.log ./ec2-deploy.log || echo "Warning: Could not retrieve logs"
                        
                        if [ -f ./ec2-deploy.log ]; then
                            echo "✅ Deployment logs retrieved from EC2"
                            echo ""
                            echo "=== DEPLOYMENT OUTPUT START ==="
                            cat ./ec2-deploy.log
                            echo "=== DEPLOYMENT OUTPUT END ==="
                        else
                            echo "⚠️  Warning: Could not retrieve deployment logs from EC2"
                        fi
                        
                        echo ""
                        echo "=== FINAL STATUS CHECK ==="
                        ssh -o StrictHostKeyChecking=no -i "$SSH_KEY_FILE" ${SSH_USER}@"$TARGET_IP" << 'FINALCHECK'
echo "Verifying deployment..."
echo ""
echo "=== RUNNING CONTAINERS ==="
sudo docker ps --format "table {{.Names}}\t{{.Status}}"
echo ""
echo "=== EBS VOLUME STATUS ==="
df -h | grep -E '^/dev/|Filesystem'
echo ""
echo "=== APPLICATION AVAILABILITY ==="
echo "Checking if backend is responding..."
sudo docker exec bookmate-backend curl -s http://localhost:8080/actuator/health || echo "Backend not responding"
FINALCHECK
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