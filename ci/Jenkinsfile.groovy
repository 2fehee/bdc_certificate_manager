// Declarative
pipeline {
    agent any
    environment {
        REPO_TOKEN = credentials('docker-nexus-admin')
        REPOSITORY = 'bcrepo.skcc.com'
        IMAGE_NAME = 'blockchain/bdc-certificate-manager'
        TAG_VERSION = '0.0.1'
    //    DOCKER_REMOTE_HOST = '10.178.84.148:2375' //gw4sk
    }
    stages {
        stage('Start') {
            steps {
                notifyBuild('STARTED')
            }
        }
        stage('Build Docker Images') {
            steps {
                sh "docker build -t ${REPOSITORY}/${IMAGE_NAME}:${TAG_VERSION} ."
            }
        }
        stage('Upload to Nexus') {
            steps {
             //   echo "tagging docker images..."
             //   sh "docker tag bcrepo.skcc.com/bdc-certificate-manager:0.1 bcrepo.skcc.com/bdc-certificate-manager:latest"

                sh "docker login -u ${REPO_TOKEN_USR} -p ${REPO_TOKEN_PSW} ${REPOSITORY}"
                echo "upload docker images..."
                sh "docker push ${REPOSITORY}/${IMAGE_NAME}:${TAG_VERSION}"
            }
        }
        /*
        stage('Deploy') {
            steps {
                echo "docker login (remote)"
                sh "docker -H tcp://${DOCKER_REMOTE_HOST} login -u ${REPO_TOKEN_USR} -p ${REPO_TOKEN_PSW} bcrepo.skcc.com"

                echo "docker stack deploy (remote)"
                sh "docker -H tcp://${DOCKER_REMOTE_HOST} stack deploy -c ci/docker-stack-tg.yml --with-registry-auth tg-service-stack"
            }
        }
        */
    }
    post {
        success {
            notifyBuild('SUCCESS')
        }
        failure {
            notifyBuild('FAILURE')
        }
    }
}


def notifyBuild(String buildStatus = 'STARTED') {
    // build status of null means successful
    buildStatus = buildStatus ?: 'SUCCESS'

    // Default values
    def colorName = 'RED'
    def colorCode = '#FF0000'
    def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
    def summary = "${subject} (${env.BUILD_URL})"

    // Override default values based on build status
    if (buildStatus == 'STARTED') {
        color = 'YELLOW'
        colorCode = '#FFFF00'
    } else if (buildStatus == 'SUCCESS') {
        color = 'GREEN'
        colorCode = '#00FF00'
    } else {
        color = 'RED'
        colorCode = '#FF0000'
    }

    // Send notifications
    slackSend(color: colorCode, message: summary)
}
