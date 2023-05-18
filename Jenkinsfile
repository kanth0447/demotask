pipeline {
  
  agent any

  environment {
    dockerimagename = "kanth0447/metromaxjobs"
    dockerimagename1 = "kanth0447/metromaxapi"
    dockerImage = ""
    dockerImage1 = ""
  }

  stages {

    stage('Build docker images') {
      steps{
        dir('apps/jobs_microservice/'){
          script{
            dockerImage = docker.build dockerimagename
            //dockerImage1 = docker.build dockerimagename1
          }
        }
        dir('apps/api_microservice/'){
          script{
            dockerImage1 = docker.build dockerimagename1
            //dockerImage1 = docker.build dockerimagename1
          }
        }
        /*script {
          def VERSION = "${env.dockerimagename}:${BUILD_NUMBER}"
          def VERSION1 = "${env.dockerimagename1}:${BUILD_NUMBER}"
          dockerImage = docker.build($VERSION)
          dockerImage1 = docker.build($VERSION1)
          dockerImage = docker.build dockerimagename
          dockerImage1 = docker.build dockerimagename1
        }*/
      }
    }

    stage('Pushing Images') {
      environment {
        registryCredential = 'dockerhub-credentials'
      }
      steps{
        script {
          docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ) {
            dockerImage.push("latest")
            dockerImage1.push("latest")
          }
        }
      }
    }

    stage('Deploying given python apps to Kubernetes') {
      steps {
        script {
          kubernetesDeploy(configs: "kubernetes/deployment_jobs.yaml", "kubernetes/service_jobs.yaml")
          kubernetesDeploy(configs: "kubernetes/deployment_api.yaml", "kubernetes/service_api.yaml")
        }
      }
    }

  }

}