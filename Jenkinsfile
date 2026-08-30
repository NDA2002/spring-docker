pipeline {

    agent any

    environment {

        DOCKER_IMAGE = "nitishpaul/react-hello-world"
        CONTAINER_NAME = "react-hello-world"

        HOST_PORT = "3000"
        CONTAINER_PORT = "80"
    }

    stages {

        stage('Checkout') {
            steps {

                echo 'Checking out React Vite source code...'

                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {

                echo 'Installing npm dependencies...'

                bat 'npm ci'
            }
        }

        stage('Build React App') {
            steps {

                echo 'Building React Vite application...'

                bat 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {

                echo 'Building Docker image...'

                bat "docker build -t %DOCKER_IMAGE%:%BUILD_NUMBER% ."

                bat "docker tag %DOCKER_IMAGE%:%BUILD_NUMBER% %DOCKER_IMAGE%:latest"
            }
        }

        stage('Docker Hub Push') {
            steps {

                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {

                    bat '''
                        echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin
                    '''

                    bat "docker push %DOCKER_IMAGE%:%BUILD_NUMBER%"

                    bat "docker push %DOCKER_IMAGE%:latest"
                }
            }
        }

        stage('Deploy Local Docker') {
            steps {

                echo 'Stopping old container...'

                bat 'docker stop %CONTAINER_NAME% || exit /b 0'

                echo 'Removing old container...'

                bat 'docker rm %CONTAINER_NAME% || exit /b 0'

                echo 'Pulling latest image from Docker Hub...'

                bat "docker pull %DOCKER_IMAGE%:latest"

                echo 'Starting new container...'

                bat "docker run -d -p %HOST_PORT%:%CONTAINER_PORT% --name %CONTAINER_NAME% %DOCKER_IMAGE%:latest"
            }
        }
    }

    post {

        success {

            echo '========================================'
            echo 'REACT CI/CD PIPELINE SUCCESSFUL'
            echo '========================================'

            echo 'React build successful'
            echo 'Docker image pushed to Docker Hub'
            echo 'React app deployed locally'
        }

        failure {

            echo '========================================'
            echo 'REACT CI/CD PIPELINE FAILED'
            echo '========================================'

            echo 'Check Jenkins Console Output'
        }
    }
}