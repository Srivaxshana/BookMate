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
        
        stage('Build Backend') {
            steps {
                echo 'Building Spring Boot application...'
                dir('bookmate-backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                echo 'Building Docker images...'
                sh 'docker-compose build'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Cleaning old containers...'
                sh 'docker-compose down -v || true'
       	        sh 'docker rm -f bookmate-mysql bookmate-backend bookmate-frontend || true'				           
                echo 'Starting new containers...'
                sh 'docker-compose up -d'
            }
        }
    }
    
    post {
        success {
            echo 'Build completed successfully!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
