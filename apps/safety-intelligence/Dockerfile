FROM node:14.19.3-bullseye-slim

WORKDIR /usr/app

ENV CYPRESS_INSTALL_BINARY=0

COPY ./packages ./packages
COPY ./apps/safety-intelligence ./apps/safety-intelligence

COPY ["package.json", "package-lock.json", "lerna.json",  "tsconfig.json", "./"]

COPY .env.example .env

ARG commit="Commit Not Available"
ARG buildVersion="Build Version Not Available"
ENV GIT_COMMIT_SHA=$commit
ENV BUILD_VERSION=$buildVersion

RUN npm ci
RUN npm run bootstrap:ci
RUN npm run build:production

EXPOSE 3002

CMD ["npm", "start"]
