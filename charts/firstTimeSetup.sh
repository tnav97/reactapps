brew install helm

# installs kong for local kong ingresses.
# not needed for QA or production like environments.
kubectl apply -f https://bit.ly/k4k8s

kubectl create namespace react-apps-local

./buildImagesLocally.sh
./runHelmfile.sh