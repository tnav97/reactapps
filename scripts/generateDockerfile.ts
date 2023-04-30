import { getDependencies } from './utils/lerna';
import { readFileSync } from 'fs';

const { writeFileSync } = require('fs');
const path = require('path');

/**
 * This is a helper script that uses Lerna to recursively figure out dependencies
 * that must be copied over to an Docker image for a successful build. Then, a new
 * Dockerfile in the app directory with the correct set of dependencies.
 *
 * Usage:
 * ts-node ./scripts/generateDockerfile.ts APP_NAME APP_PORT
 *
 * Example:
 * ts-node ./scripts/generateDockerfile.ts billing-portal 3004
 * ts-node ./scripts/generateDockerfile.ts alcumus-portal 3001
 */

const appName = process.argv[2];
const port = process.argv[3];

export function generateDockerfile(appName: string, port: string) {
  if (!appName) {
    console.error('App name is required.');
    return 1;
  }

  const dockerFilePath = path.join(
    process.cwd(),
    'apps',
    appName,
    'Dockerfile'
  );

  if (!port) {
    console.info('Port not provided, detecting from Dockerfile...');
    const dockerFile = readFileSync(dockerFilePath).toString();
    const matches = dockerFile.match(/EXPOSE (\d+)/m);

    if (matches === null) {
      console.info('Could not detect port, aborting');
      return 1;
    }

    port = matches[1];
  }

  console.info(
    `Generating Dockerfile for "${appName}", exposing port ${port} ...`
  );

  const dependencies = getDependencies(appName);

  if (!dependencies) {
    console.error(
      'App dependencies could not be detected, please ensure the name is correct.'
    );
    return 1;
  }

  console.info(
    `Detected private dependencies: ${dependencies.map((d) => d.name)}`
  );

  const copyInstructions = dependencies
    .map(
      (packagePath) =>
        `COPY ./${packagePath.location} ./${packagePath.location}`
    )
    .join('\n');

  const dockerFile = `FROM node:14.19.3-bullseye-slim

WORKDIR /usr/app

ENV CYPRESS_INSTALL_BINARY=0

${copyInstructions}
COPY ./apps/${appName} ./apps/${appName}

COPY ["package.json", "package-lock.json", "lerna.json",  "tsconfig.json", "./"]

ARG commit="Commit Not Available"
ARG buildVersion="Build Version Not Available"
ENV GIT_COMMIT_SHA=$commit
ENV BUILD_VERSION=$buildVersion

# install packages and perform build.
# note that npm run bootstrap calls npm install internally
RUN npm ci
RUN npm run bootstrap:ci
RUN npm run build:production

EXPOSE ${port}

CMD ["npm", "start"]
`;

  writeFileSync(dockerFilePath, dockerFile);

  console.info(`Dockerfile generated at ${dockerFilePath}`);
}

if (require.main === module) {
  // Run the script if called directly from CLI, otherwise do nothing
  const returnCode = generateDockerfile(appName, port);
  process.exit(returnCode || 0);
}
