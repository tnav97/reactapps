#!/bin/sh

ROOT_DIR=$(git rev-parse --show-toplevel)
COMMAND_TYPE=${1:-sync}
ENVIRONMENT=${2:-react-apps-local}
PROPERTY_FILE=${3:-.env}
cd "$ROOT_DIR" || exit 1


echo "----------------------------------------------------"
echo "Running Helm Installations"
echo "Reading variables for ${ENVIRONMENT} from ${PROPERTY_FILE}"
echo "----------------------------------------------------"

# https://stackoverflow.com/questions/19331497/set-environment-variables-from-file-of-key-value-pairs
# take all your .env settings and turn them into environment variables, then run helmfile
# these exports will not leak outside this script so no need to unset them.
export $(grep -v '^#' "${PROPERTY_FILE}" | xargs) && cd charts && helmfile --environment "${ENVIRONMENT}" "${COMMAND_TYPE}"
