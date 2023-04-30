FROM node:14.19.3-bullseye-slim

WORKDIR /usr/app

ENV CYPRESS_INSTALL_BINARY=0

COPY ./packages ./packages
COPY ./apps/self-signup ./apps/self-signup

COPY ["package.json", "package-lock.json", "lerna.json",  "tsconfig.json", "./"]

ARG commit="Commit Not Available"
ARG buildVersion="Build Version Not Available"
ENV GIT_COMMIT_SHA=$commit
ENV BUILD_VERSION=$buildVersion

RUN npm ci
RUN npm run bootstrap:ci
RUN npm run build:production

EXPOSE 3003

CMD ["npm", "start"]
