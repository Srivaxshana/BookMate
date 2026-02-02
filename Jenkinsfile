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

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out from GitHub...'
                checkout scm
            }
        }

        stage('Terraform Init & Plan') {
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
                dir('terraform') {
                    script {
                        def elasticIp = sh(
                            script: "terraform output -raw elastic_ip",
                            returnStdout: true
                        ).trim()
                        def publicIp = sh(
                            script: "terraform output -raw public_ip",
                            returnStdout: true
                        ).trim()

                        // Use public IP for deployment to avoid stale EIP issues
                        env.EC2_IP = publicIp
                        echo "Elastic IP (terraform): http://${elasticIp}"
                        echo "Public IP (instance): http://${publicIp}"
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
                            mvn clean package \
                            -s /root/.m2/settings.xml \
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
                    sh '''
                        # Use SSH agent for secure key handling
                        eval $(ssh-agent -s)
                        ssh-add $SSH_KEY_FILE
                        
                        # Deploy to EC2 - create deployment script inline
                        EC2_IP=${EC2_IP}
                        
                        # Use printf to safely pass script to SSH (avoids heredoc issues)
                        printf '%s\n' \
                            'set -e' \
                            'echo "Deploying to EC2 instance at '$EC2_IP'..."' \
                            'cd /opt/bookmate || (sudo mkdir -p /opt/bookmate && sudo chown ubuntu:ubuntu /opt/bookmate && cd /opt/bookmate)' \
                            'if [ -d .git ]; then git pull origin main || (git fetch --all && git reset --hard origin/main); else git clone https://github.com/Srivaxshana/BookMate.git .; fi' \
                            'sudo usermod -aG docker ubuntu || true' \
                            'sudo docker-compose down -v || true' \
                            'sudo docker system prune -af || true' \
                            'sudo docker pull srivaxshana/bookmate-backend:latest || true' \
                            'sudo docker pull srivaxshana/bookmate-frontend:latest || true' \
                            'export EC2_IP='$EC2_IP \
                            'sudo -E docker-compose up -d' \
                            'sleep 30' \
                            'sudo docker ps' \
                            'echo "=== Backend Logs ===" && sudo docker logs bookmate-backend --tail 20 || true' \
                            'echo "=== Frontend Logs ===" && sudo docker logs bookmate-frontend --tail 20 || true' \
                            'echo "=== MySQL Logs ===" && sudo docker logs bookmate-mysql --tail 20 || true' \
                            'echo "✅ Deployment completed!"' \
                        | ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -o ConnectTimeout=30 ubuntu@${EC2_IP} bash
                        
                        ssh-agent -k
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