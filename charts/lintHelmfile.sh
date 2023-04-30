#!/bin/sh

ROOT_DIR=$(git rev-parse --show-toplevel)
cd "$ROOT_DIR" || exit 1

ENVIRONMENT=${1:-default}
PROPERTY_FILE=${2:-.env}

# Export variables so they are part of the runtime environment variables consumed by helmfile.
export IMAGE_TAG=${3:-latest}

# https://stackoverflow.com/questions/19331497/set-environment-variables-from-file-of-key-value-pairs
# take all your .env settings and turn them into environment variables
export $(grep -v '^#' "${PROPERTY_FILE}" | xargs)

# Print Parameters and Run Helmfile
echo "----------------------------------------------------"
echo "Linting Helm"
echo "Reading variables for ${ENVIRONMENT} from ${PROPERTY_FILE}"
echo "imageTag = ${IMAGE_TAG}"
echo "sourceVersion = ${SOURCE_VERSION} (blank means no override)"
echo "----------------------------------------------------"

cd charts && helmfile --environment "${ENVIRONMENT}" lint