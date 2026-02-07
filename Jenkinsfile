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
                        def publicIp = sh(
                            script: """
                                aws ec2 describe-instances \
                                  --region ${AWS_REGION} \
                                  --filters 'Name=tag:Name,Values=${params.DEPLOY_INSTANCE_TAG}' 'Name=instance-state-name,Values=running' \
                                  --query 'Reservations[0].Instances[0].PublicIpAddress' \
                                  --output text
                            """,
                            returnStdout: true
                        ).trim()

                        if (!publicIp || publicIp == 'None') {
                            error("No running EC2 instance found with tag Name=${params.DEPLOY_INSTANCE_TAG}")
                        }

                        env.EC2_IP = publicIp
                        echo "EC2 instance (deploy target): http://${env.EC2_IP}"
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
                    sh '''bash -lc <<'BASH'
                        set -euo pipefail
                        TARGET_IP="${EC2_IP}"
                        echo "Target IP from environment: $TARGET_IP"

                        if [ -z "$TARGET_IP" ]; then
                            echo "ERROR: TARGET_IP is empty!"
                            exit 1
                        fi

                        # Prepare deployment script payload (same commands for SSH or SSM)
                        read -r -d '' DEPLOY_SCRIPT <<'EOD'
set -e
echo "Starting deployment..."
cd /opt/bookmate || (sudo mkdir -p /opt/bookmate && sudo chown ubuntu:ubuntu /opt/bookmate && cd /opt/bookmate)
if [ -d .git ]; then git pull origin main || (git fetch --all && git reset --hard origin/main); else git clone https://github.com/Srivaxshana/BookMate.git .; fi
sudo usermod -aG docker ubuntu || true
sudo docker-compose down -v || true
sudo docker system prune -af || true
sudo docker pull srivaxshana/bookmate-backend:latest || true
sudo docker pull srivaxshana/bookmate-frontend:latest || true
export EC2_IP=${TARGET_IP}
sudo -E docker-compose up -d
sleep 30
sudo docker ps || true
echo "=== Backend Logs ===" && sudo docker logs bookmate-backend --tail 20 || true
echo "=== Frontend Logs ===" && sudo docker logs bookmate-frontend --tail 20 || true
echo "=== MySQL Logs ===" && sudo docker logs bookmate-mysql --tail 20 || true
echo "✅ Deployment completed!"
EOD

                        # Try SSH connectivity with retries
                        eval $(ssh-agent -s)
                        ssh-add $SSH_KEY_FILE

                        SSH_OK=0
                        for i in $(seq 1 6); do
                            echo "Attempt $i: testing SSH to $TARGET_IP..."
                            if nc -z -w5 $TARGET_IP 22 2>/dev/null; then
                                echo "Port 22 open, testing SSH command..."
                                if ssh -o BatchMode=yes -o StrictHostKeyChecking=no -o ConnectTimeout=8 ubuntu@$TARGET_IP 'echo SSH_OK' 2>/dev/null | grep -q SSH_OK; then
                                    SSH_OK=1
                                    echo "SSH connectivity verified"
                                    break
                                fi
                            fi
                            echo "SSH not available yet, sleeping 10s"
                            sleep 10
                        done

                        if [ "$SSH_OK" -eq 1 ]; then
                            echo "Using SSH deploy path"
                            printf '%s\n' "$DEPLOY_SCRIPT" | ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null ubuntu@${TARGET_IP} bash
                        else
                            echo "SSH unreachable; attempting SSM fallback"
                            # discover instance id by tag
                            INSTANCE_ID=$(aws ec2 describe-instances --region ${AWS_REGION} --filters "Name=tag:Name,Values=${params.DEPLOY_INSTANCE_TAG}" "Name=instance-state-name,Values=running" --query "Reservations[0].Instances[0].InstanceId" --output text)
                            if [ -z "$INSTANCE_ID" ] || [ "$INSTANCE_ID" = "None" ]; then
                                echo "Could not find instance id for tag ${params.DEPLOY_INSTANCE_TAG}; aborting"
                                exit 2
                            fi
                            echo "Sending SSM command to instance $INSTANCE_ID"

                            CMD_ID=$(aws ssm send-command --region ${AWS_REGION} --instance-ids "$INSTANCE_ID" --document-name "AWS-RunShellScript" --comment "Jenkins deploy fallback" --parameters commands[0]="$(echo "$DEPLOY_SCRIPT" | sed 's/"/\\"/g' | tr '\n' ';')" --query "Command.CommandId" --output text)
                            echo "SSM CommandId: $CMD_ID"

                            # Poll for invocation result and stream output
                            for attempt in $(seq 1 30); do
                                STATUS=$(aws ssm get-command-invocation --region ${AWS_REGION} --command-id $CMD_ID --instance-id $INSTANCE_ID --query 'Status' --output text 2>/dev/null || echo "Pending")
                                echo "SSM status: $STATUS"
                                if [ "$STATUS" = "Success" ] || [ "$STATUS" = "Failed" ] || [ "$STATUS" = "TimedOut" ] || [ "$STATUS" = "Cancelled" ]; then
                                    aws ssm get-command-invocation --region ${AWS_REGION} --command-id $CMD_ID --instance-id $INSTANCE_ID --query '{Status:Status,StandardOutput:StandardOutputContent,StandardError:StandardErrorContent}' --output json || true
                                    break
                                fi
                                sleep 5
                            done
                        fi

                        ssh-agent -k || true
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