#!/bin/sh

ROOT_DIR=$(git rev-parse --show-toplevel)
cd "$ROOT_DIR" || exit 1

buildDockerImage(){
  SERVICE_NAME=$1
  docker build -f "./apps/${SERVICE_NAME}/Dockerfile" -t "alcumus/${SERVICE_NAME}" --build-arg "buildVersion=${BUILD_VERSION}" --build-arg "commit=${COMMIT_SHA}" .
}

echo "----------------------------------------------------"
echo "Building Docker Images for Local Deployment"
echo "----------------------------------------------------"

buildDockerImage alcumus-portal
buildDockerImage self-signup
buildDockerImage safety-intelligence
buildDockerImage billing-portal