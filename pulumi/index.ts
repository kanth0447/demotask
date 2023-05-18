import * as pulumi from "@pulumi/pulumi";
import * as kubernetes from "@pulumi/kubernetes";

// Minikube does not implement services of type `LoadBalancer`; require the user to specify if we're
// running on minikube, and if so, create only services of type ClusterIP.
const config = new pulumi.Config();
const isMinikube = config.requireBoolean("isMinikube");

const jobsDeployment = new kubernetes.apps.v1.Deployment("metromaxjobs-deployment", {
    metadata: {
        labels: {
            app: "metromaxjobs",
        },
    },
    spec: {
        replicas: 1,
        selector: {
            matchLabels: {
                app: "metromaxjobs",
            },
        },
        template: {
            metadata: {
                labels: {
                    app: "metromaxjobs",
                },
            },
            spec: {
                containers: [{
                    image: "kanth0447/metromaxjobs:latest",
                    name: "metromaxjobs",
                    ports: [{
                        containerPort: 5001,
                    }],
                }],
            },
        },
    },
});

const jobsService = new kubernetes.core.v1.Service("metromaxjobs-service", {
    metadata: {
        name: "metromaxjobs-service",
    },
    spec: {
        type: "NodePort",
        ports: [
            {
                port: 5001,
                targetPort: 5001,
                nodePort: 30173,
            },
        ],
        selector: { app: "metromaxjobs" },
    },
});

const apiDeployment = new kubernetes.apps.v1.Deployment("metromaxapi-deployment", {
    metadata: {
        labels: {
            app: "metromaxapi",
        },
    },
    spec: {
        replicas: 1,
        selector: {
            matchLabels: {
                app: "metromaxapi",
            },
        },
        template: {
            metadata: {
                labels: {
                    app: "metromaxapi",
                },
            },
            spec: {
                containers: [{
                    image: "kanth0447/metromaxapi:latest",
                    name: "metromaxapi",
                    env: [
                        {
                            name: "JOBS_SERVICE",
                            value: "metromaxjobs-service.default.svc.cluster.local",
                        },
                    ],
                    ports: [{
                        containerPort: 5000,
                    }],
                }],
            },
        },
    },
});

const apiService = new kubernetes.core.v1.Service("metromaxapi-service", {
    metadata: {
        name: "metromaxapi-service",
    },
    spec: {
        type: "NodePort",
        ports: [
            {
                port: 8081,
                targetPort: 5000,
                nodePort: 30174,
            },
        ],
        selector: { app: "metromaxapi" },
    },
});
