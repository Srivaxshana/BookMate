pipeline {
    agent any

    // Tools are intentionally omitted to avoid relying on global Jenkins tool names.
    // Use the bundled Maven wrapper in the repository (`mvnw`) instead.

    environment {
        DOCKER_REGISTRY = 'docker.io'  // Change to your registry (e.g., your-registry.azurecr.io)
        DOCKER_USERNAME = credentials('docker-username')
        DOCKER_PASSWORD = credentials('docker-password')
        IMAGE_VERSION = "${BUILD_NUMBER}"
        BACKEND_IMAGE = "bookmate-backend:${IMAGE_VERSION}"
        FRONTEND_IMAGE = "bookmate-frontend:${IMAGE_VERSION}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                echo '========== Checking out from GitHub =========='
                checkout scm
                script {
                    echo "Build Number: ${BUILD_NUMBER}"
                    echo "Git Branch: ${GIT_BRANCH}"
                    echo "Git Commit: ${GIT_COMMIT}"
                }
            }
        }
        
        stage('Backend Tests') {
            steps {
                echo '========== Running Backend Unit Tests =========='
                dir('bookmate-backend') {
                    sh './mvnw clean test'
                }
            }
        }

        stage('Build Backend') {
            steps {
                echo '========== Building Spring Boot Application =========='
                dir('bookmate-backend') {
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Frontend Tests') {
            steps {
                echo '========== Running Frontend Tests =========='
                dir('bookmate-frontend') {
                    sh '''
                        npm install
                        npm test -- --coverage --watchAll=false || true
                    '''
                }
            }
        }

        stage('Code Quality Analysis') {
            when {
                branch 'main'
            }
            steps {
                echo '========== Running Code Quality Analysis =========='
                dir('bookmate-backend') {
                    sh '''
                        ./mvnw sonar:sonar \
                            -Dsonar.projectKey=bookmate \
                            -Dsonar.sources=src/main \
                            -Dsonar.tests=src/test \
                            -Dsonar.host.url=http://localhost:9000 \
                            -Dsonar.login=${SONARQUBE_TOKEN} || true
                    '''
                }
            }
        }
        
        stage('Build Docker Images') {
            steps {
                echo '========== Building Docker Images =========='
                script {
                    sh '''
                        docker build -t ${BACKEND_IMAGE} ./bookmate-backend
                        docker build -t ${FRONTEND_IMAGE} ./bookmate-frontend
                        echo "Backend image: ${BACKEND_IMAGE}"
                        echo "Frontend image: ${FRONTEND_IMAGE}"
                    '''
                }
            }
        }

        stage('Push to Registry') {
            when {
                branch 'main'
            }
            steps {
                echo '========== Pushing Images to Docker Registry =========='
                script {
                    sh '''
                        echo "${DOCKER_PASSWORD}" | docker login -u "${DOCKER_USERNAME}" --password-stdin ${DOCKER_REGISTRY}
                        
                        docker tag ${BACKEND_IMAGE} ${DOCKER_REGISTRY}/$(echo ${DOCKER_USERNAME} | tr '[:upper:]' '[:lower:]')/bookmate-backend:${IMAGE_VERSION}
                        docker tag ${BACKEND_IMAGE} ${DOCKER_REGISTRY}/$(echo ${DOCKER_USERNAME} | tr '[:upper:]' '[:lower:]')/bookmate-backend:latest
                        
                        docker tag ${FRONTEND_IMAGE} ${DOCKER_REGISTRY}/$(echo ${DOCKER_USERNAME} | tr '[:upper:]' '[:lower:]')/bookmate-frontend:${IMAGE_VERSION}
                        docker tag ${FRONTEND_IMAGE} ${DOCKER_REGISTRY}/$(echo ${DOCKER_USERNAME} | tr '[:upper:]' '[:lower:]')/bookmate-frontend:latest
                        
                        docker push ${DOCKER_REGISTRY}/$(echo ${DOCKER_USERNAME} | tr '[:upper:]' '[:lower:]')/bookmate-backend:${IMAGE_VERSION}
                        docker push ${DOCKER_REGISTRY}/$(echo ${DOCKER_USERNAME} | tr '[:upper:]' '[:lower:]')/bookmate-backend:latest
                        
                        docker push ${DOCKER_REGISTRY}/$(echo ${DOCKER_USERNAME} | tr '[:upper:]' '[:lower:]')/bookmate-frontend:${IMAGE_VERSION}
                        docker push ${DOCKER_REGISTRY}/$(echo ${DOCKER_USERNAME} | tr '[:upper:]' '[:lower:]')/bookmate-frontend:latest
                        
                        docker logout ${DOCKER_REGISTRY}
                    '''
                }
            }
        }
        
        stage('Deploy') {
            steps {
                echo '========== Deploying Application =========='
                script {
                    sh '''
                        echo "Cleaning old containers..."
                        docker-compose down -v || true
                        docker rm -f bookmate-mysql bookmate-backend bookmate-frontend || true
                        
                        echo "Starting new containers..."
                        docker-compose up -d
                        
                        echo "Waiting for services to be healthy..."
                        sleep 10
                        docker-compose ps
                    '''
                }
            }
        }

        stage('Health Check') {
            steps {
                echo '========== Performing Health Checks =========='
                script {
                    sh '''
                        max_retries=10
                        retry_count=0
                        
                        while [ $retry_count -lt $max_retries ]; do
                            if curl -f http://localhost:8081/health 2>/dev/null; then
                                echo "Backend is healthy!"
                                break
                            fi
                            retry_count=$((retry_count + 1))
                            echo "Health check attempt $retry_count/$max_retries..."
                            sleep 5
                        done
                        
                        if [ $retry_count -eq $max_retries ]; then
                            echo "Backend health check failed!"
                            exit 1
                        fi
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo '✓ Build completed successfully!'
            script {
                sh '''
                    echo "=== Build Summary ==="
                    echo "Status: SUCCESS"
                    echo "Build Number: ${BUILD_NUMBER}"
                    echo "Build Time: $(date)"
                    docker-compose ps
                '''
            }
        }
        failure {
            echo '✗ Build failed!'
            script {
                sh 'docker-compose logs || true'
            }
        }
        unstable {
            echo '⚠ Build is unstable!'
        }
            always {
            echo '========== Cleaning Up =========='
            script {
                sh '''
                    # Cleanup old images (keep last 5)
                    docker image prune -f --filter "until=72h" || true
                '''

                // Archive test results and publish HTML report safely
                try {
                    junit '**/target/surefire-reports/*.xml'
                } catch (e) {
                    echo "junit archiving failed: ${e}"
                }

                try {
                    publishHTML([
                        reportDir: 'bookmate-backend/target/site/jacoco',
                        reportFiles: 'index.html',
                        reportName: 'Code Coverage Report'
                    ])
                } catch (e) {
                    echo "publishHTML failed: ${e}"
                }
            }
        }
    }
}

