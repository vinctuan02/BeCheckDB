pipeline {
    agent any

    environment {
        NODE_VERSION = '14' // Node.js version
    }

    stages {
        stage('Install Node.js') {
            steps {
                // Install Node.js version 14
                sh 'nvm install ${NODE_VERSION}'
                sh 'nvm use ${NODE_VERSION}'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Install the project dependencies
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Run tests defined in package.json
                sh 'npm test'
            }
        }

        stage('Build') {
            steps {
                // Build the application (if needed)
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                // Example deployment step
                echo 'Deploying the application...'
                // Add your deployment commands here
            }
        }
    }

    post {
        always {
            // Clean up after build
            cleanWs()
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
