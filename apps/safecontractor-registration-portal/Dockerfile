FROM node:16-bullseye-slim

WORKDIR /usr/app

ENV CYPRESS_INSTALL_BINARY=0

COPY ./packages/components ./packages/components
COPY ./packages/web-app ./packages/web-app
COPY ./packages/hooks ./packages/hooks
COPY ./packages/core ./packages/core
COPY ./apps/safecontractor-registration-portal ./apps/safecontractor-registration-portal

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

EXPOSE 3000

CMD ["npm", "start"]
