# demotask

Prerequisites:
1)minikube
2)helm
3)docker (optional)
4)pulumi

Steps:
1)Build Docker Images
2)Create Deployment & Service yaml files for kubernetes deployment
3)Kubernetes Deployment Using Pulumi
4)Jenkinsfile Explanation
5)Monitoring Using Prometheus

# Build Docker Images :
a)As we have 2 python applications which have connection between two, we need to build 2 Dockerfiles.
b)Dockerfiles are residing in apps/jobs_microservice & apps/api_microservice, Build the docker images using command docker image build -t <tag> -f <dockerfilename> .
c)After building the docker images push those docker images to any registry like dockerhub, ECR , ACR , Nexus, Jfrog. Because we have to download docker image while applying deployment in kubernetes
d)If the registry is private we need credentials to be configured in kubernetes and to be used as imagePullSecrets

# Create Deployment & Service yaml files for kubernetes deployment
a)The Deployment & service yaml files are residing in kubernetes folder
b)Files deployment_jobs.yaml & service_jobs.yaml are useful for creating python job POD and SERVICE to expose that created POD for outside world
c)Files deployment_api.yaml & service_api.yaml are useful for creating python api POD and SERVICE to expose that created POD for outside world
d)To access the python apps deployed in kubernetes use command minikube service <service_name> --url

# Kubernetes Deployment Using Pulumi
a)First create an empty directory and in that directory create project by using command pulumi new kubernetes-typescript . Kubernetes deployment using pulumi can be configured in multiple languages like typescript, javascript, python, go .... , here we used typescript
b)After executing the command it will ask for few things provide them.
c)Now we need to made changes to index.ts which is responsible for kubernetes deployment , index.ts file is located in pulumi folder
d)As we are using minikube need to execute this command pulumi config set isMinikube true , because of this it will deploy in minikube

# 4)Jenkinsfile Explanation
a)All the first 3 steps is automated using Jenkinsfile , this file is located in root folder of repo

# Monitoring Using Prometheus
a)Helm is the prerequisite for this section
b)We can install prometheus & grafana using below commands
    helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
    helm repo add grafana https://grafana.github.io/helm-charts
    helm install prometheus prometheus-community/prometheus
    helm install grafana grafana/grafana
c)We need to expose these prometheus and grafana using kubernetes services and below commands
    kubectl expose service prometheus-server — type=NodePort — target-port=9090 — name=prometheus-server-ext
    minikube service prometheus-server-ext
    kubectl expose service grafana — type=NodePort — target-port=3000 — name=grafana-ext
    minikube service grafana-ext
d)For grafana we have secret password to login, get that password by using command
    kubectl get secret — namespace default grafana -o yaml
    echo “password_value” | openssl base64 -d ; echo
    echo “username_value” | openssl base64 -d ; echo
e)After accessing grafana, we need to add prometheus as DataSource and then Dashboards can be imported, if we want we can create custom dashboards also