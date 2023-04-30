#!/bin/sh

ROOT_DIR=$(git rev-parse --show-toplevel)
cd "$ROOT_DIR" || exit 1

./charts/removeLocalDeployments.sh
./charts/buildImagesLocally.sh
./charts/runHelmfile.sh