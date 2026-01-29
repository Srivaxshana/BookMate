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
pipeline {
    agent any

    tools {
        maven 'Maven'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out from GitHub...'
                checkout scm
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
                            echo "Provisioning infrastructure with Terraform..."
                            terraform init
                            terraform apply -auto-approve
                        '''
                    }
                }
            }
        }

        stage('Output EC2 Public IP') {
            steps {
                echo 'Fetching EC2 public IP...'
                dir('terraform') {
                    script {
                        def ec2_ip = sh(
                            script: "terraform output -raw public_ip",
                            returnStdout: true
                        ).trim()
                        echo "EC2 instance is running at: http://${ec2_ip}"
                    }
                }
            }
        }

        stage('Build Backend') {
            steps {
                echo 'Building Spring Boot application...'
                dir('bookmate-backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Backend Docker Image') {
            steps {
                echo 'Packaging backend into Docker image...'
                dir('bookmate-backend') {
                    sh 'docker build -t bookmate-backend .'
                }
            }
        }

        stage('Build Frontend Docker Image') {
            steps {
                echo 'Packaging frontend into Docker image...'
                dir('bookmate-frontend') {
                    sh 'docker build -t bookmate-frontend .'
                }
            }
        }

        stage('Deploy Containers') {
            steps {
                echo 'Cleaning old containers...'
                sh '''
                    docker rm -f bookmate-mysql bookmate-backend bookmate-frontend nginx || true
                '''
                echo 'Starting new containers...'
                sh '''
                    docker run -d --name bookmate-backend -p 8080:8080 bookmate-backend
                    docker run -d --name bookmate-frontend -p 3000:80 bookmate-frontend
                    # MySQL and Nginx can be added here if you have Dockerfiles/docker-compose for them
                '''
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
