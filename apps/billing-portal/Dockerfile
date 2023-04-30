FROM node:14.19.3-bullseye-slim

WORKDIR /usr/app

ENV CYPRESS_INSTALL_BINARY=0

COPY ./packages/analytics-package ./packages/analytics-package
COPY ./packages/components ./packages/components
COPY ./packages/core ./packages/core
COPY ./packages/hooks ./packages/hooks
COPY ./packages/web-app ./packages/web-app
COPY ./apps/billing-portal ./apps/billing-portal

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

EXPOSE 3004

CMD ["npm", "start"]
