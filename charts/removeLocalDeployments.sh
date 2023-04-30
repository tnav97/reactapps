#!/bin/sh

NAMESPACE=${1:-react-apps-dev}
ROOT_DIR=$(git rev-parse --show-toplevel)
cd "$ROOT_DIR" || exit 1

echo "----------------------------------------------------"
echo "Removing Local Helm Releases For A Clean Slate."
echo " - this should be unnecessary 99% of the time."
echo "----------------------------------------------------"

helm uninstall shared-dependencies --namespace "${NAMESPACE}"
helm uninstall alcumus-portal --namespace "${NAMESPACE}"
helm uninstall self-signup --namespace "${NAMESPACE}"
helm uninstall safety-intelligence --namespace "${NAMESPACE}"
