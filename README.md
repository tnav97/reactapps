# @alcumus/react-apps

A monorepo of front-end apps built with Node/React for Alcumus

### Setup

```
git clone git@github.com:Alcumus/react-apps.git
cd react-apps
npm ci && npm run bootstrap

# Configure environment variables referring to .env.example into a .env file

# production build and start
npm run build
npm start

# Local Development start up
npm run docker:up
npm run start-dev
```

### Adding a new frontend project

Please follow below steps to add a new frontend project in this monorepo:

- Run these from the root of monorepo:
  - `npm run create:app my-app-name` 
  - `npm install`
  - `npm run bootstrap`
  - `npm run build`
  - `npm run nx:start:dev my-app-name`

#### If you want to do it manually you can follow these steps:

- Copy `apps/starter-app` and paste it in apps directory

- Rename copied directory to reflect appropriate name for your frontend project

- Open `src/common/components/HomePage/HomePage.tsx` and add your content for the home page

- Open `src/server/middleware/renderPage.tsx` and rename the title tag rendered in html markup to your frontend project name

- Edit `src/server/index.ts` and change `REACT_APP_WEB_PORT` to an environment variable relevant to your application for port requirements and add it to `.env.example` as well

- Open `package.json` and edit the package name within new frontend project directory. 

- Also edit storybook port (in `package.json`) to 60XX for your needs so your frontend project does not have a conflict when storybook is spinning up.

- Now in terminal, run these from the root of monorepo:
  - `npm install`
  - `npm run bootstrap`
  - `npm run build`
  - `npm run start-dev`
  - `npm run generate:dockerfile [YOUR_APP_NAME] [YOUR_APP_PORT]`

and see your frontend project in action

## Using Translation Script 

We have a translation script available that uses DeepL for translating English files (the source) to other languages:

```bash
npm run translate <YOUR_PROJECT> fr
npm run translate <YOUR_PROJECT> es
```

This command expects the English locale files to follow this structure:
`apps/YOUR_APP/static/locales/LANGUAGE_CODE/NAMESPACE.json`

If your app does not use this structure, you may pass your locale directory as the third argument:
`npm run translate <YOUR_PROJECT> fr my_static/locales`

If your default translations are not in English (en), you may pass your language as the fourth parameter:
`npm run translate <YOUR_PROJECT> fr my_static/locales es`

## Managing dependencies

- To add a new dependency into a single package: `npx lerna add npmPackageName --scope=packageName`

  e.g. `npx lerna add dotenv --scope=starter-app`

- To add a new dependency into multiple packages: `npx lerna add npmPackageName --scope={packageName1, packageName2}`

  e.g. `npx lerna add dotenv --scope={starter-app,alcumus-portal}`

- To drop a dependency from a package or service, just delete the row from package.json and run `npm run bootstrap` again.

## Working with end-to-end tests

- End-to-end tests are placed inside `cypress/integration/{packageName}` directory
- Make sure you are running the applications with `npm start` or `npm run start-dev`
- Run `npm run cy:open` to visually run end-to-end tests
- Run `npm run cy:run` to run cypress tests on command line

## Publishing versions

We've customized Lerna's version commands to suit our needs. Lerna version command updates package.json, package-lock.json for all packages which have changed, and also adds git tags to the commit.

- To create a new prerelease for all packages that have changes: `npx lerna version prerelease --preid=alpha`
- To create a new patch / minor / major version for all packages that have changes: `npx lerna version [patch | minor | major]`
- To bump version for all packages (force mode): `npx lerna version 1.2.0`
- To select what type of bump (patch / minor / major) is for each package, use the interactive mode: `npx lerna version`
- To version a specific package: `npx lerna version --ignore-changes '**' --force-publish self-signup`
- To version two or more specific package: `npx lerna version  --ignore-changes '**' --force-publish self-signup,safety-intelligence`

## Deploying Apps

To deploy a new app,

- Use the `npm run generate:dockerfile` script to generate a Dockerfile: `npm run generate:dockerfile [YOUR_APP_NAME] [YOUR_APP_PORT]`. Ideally the port should be set to 3001.
- Add helm charts for it under charts; copy other charts to start and then substitute.
- Add an entry for it to helmfile.yaml, using requiredEnv to pass in secrets
- Test the helm charts by running the deployment on a local kubernetes instance.
- Add an entry for it to BuildAndPushImages.yaml and DeployToK8s.yaml
- Add any variables you might need to the variable group and ensure that these are passed to Kubernetes.
- Test the Azure pipeline deployment by uncommenting conditions to ensure that a first deployment takes place

To set up a local kubernetes instance for testing purposes, follow  
[these instructions](https://ecompliance.atlassian.net/wiki/spaces/W/pages/2591883265/Developer+Kubernetes+Setup)

## Starter-app and @alcumus/starter-package

Both starter-app and starter-package are not included in CI builds and tests. However, tests are run on pre-push hooks.<br/>
If changes are done to any of them and need to include them in CI pipeline builds and tests, you need to change the scripts in `BuildAndTest.yaml` file:
- Change the script command that builds the applications from `npm run build:appsonly` to `npm run build`.
- Change the script command that tests the applications from `npm run test:ci:appsonly` to `npm run test:ci`.
- Update the script displayName accordingly to reflect that the starter-apps and starter-package are included.