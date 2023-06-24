pipeline {
    agent any
    
    stages {
        stage('Pull Repositories') {
            steps {
                echo 'Hello, World Koding!'
            }
        }
        
        stage('Stop Container') {
            steps {
                echo 'Stopping the running container...'
                sh 'docker stop mycontainer || true'
                sh 'docker rm mycontainer || true'
                echo 'Container stopped.'
            }
        }
        
        stage('Docker Images') {
            steps {
                echo 'Building Docker images...'
                
                // Menghapus image sebelumnya
                sh 'docker rmi myimage:latest || true'
                
                echo 'Proses Build'
                sh 'docker build -t myimage:latest .'
                echo 'Menampilkan hasil images'
                sh 'docker images'
            }
        }
        
        stage('Deploy') {
            steps {
                echo 'Running the container...'
                sh 'docker run -d --name mycontainer -p 3001:4000 --restart=always myimage:latest'

                echo 'Container is now running.'
                sh 'docker ps'
            }
        }
    }
}
