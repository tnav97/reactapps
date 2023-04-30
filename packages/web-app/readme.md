# @alcumus/web-app

Spin up your express web server with a breeze.a1

## Consuming the package

Example code to spin p a web-app using this package:

```
# your-application/src/server/app.ts
import path from 'path';
import { Application } from 'express';
import { configureApp } from '@alcumus/web-app';
import renderPage from './middleware/renderPage';

const app: Application = configureApp({
  paths: {
    routes: path.resolve(__dirname, './routes'),
    webpackConfig: path.resolve(__dirname, '../../webpack.config.js'),
    staticDirectories: [path.resolve(__dirname, '../../static')],
    localesDirectory: path.resolve(__dirname, '../../static/locales'),
  },
  setup: (webApp) => {
    webApp.use('*', renderPage);
  },
});

export default app;
```

Running the web app:

```
# your-application/src/server/index.ts

import dotenv from 'dotenv';
import app from './app';
import { runApp } from '@alcumus/web-app';

dotenv.config();

const port: number = Number(process.env.YOUR_APP_PORT) || 3333;

runApp(app, { appName: 'Your Awesome App', port });
```

## What do I get from this package?

The package provides you following utilities:

- `configureApp`: Function to configure a consumer web application
- `runApp`: Function to run consumer web application (ensure using unique port for your app)
- `getWebpackConfig`: gets default webpack configuration used for web applications. You can use this function to get the default configuration and extend it through your own `webpack.config.js` in your consumer application.
- `Extended type definitions`:

## API

### configureApp(options)

Allows consumer to configure the web application as per their needs. This function will give you back an `express.Application` instance that you can export and write integration tests against it.

**options**

- `paths`: The paths option is an object that accepts following options.

  - `routes`: Path to directory reflecting your route structure. The package uses [`express-enrouten`](https://www.npmjs.com/package/express-enrouten) to implement directory-based routing strategy and expects consumer applications to structure routes accordingly.
  - `webpackConfig`: Path to webpack configuration file for your consumer application.
  - `staticDirectories`: An array of paths to directories whose content will be made available publicly from your consumer application's host url.
  - `localesDirectory`: path where translation files are found. the files are organized by locales.

- `setup`: A setup function to be utilized by consumer to specify the application's routing or make any necessary changes to `webApp` itself that the consumer application is using. The consumer MUST implement `webApp.use('*', renderPage);` route handler which is responsible to provide the Server Rendered Page content for your Node/React web application.

- `sessionSecret` (optional): The secret used to encrypt consumer app session. If this is provided then session store is setup to save sessions into `redis`.

### what to expect when providing the optional localesDirectory
in `renderApp` middleware in react apps, you will get both, detectedLanguage and translation properties are set in the request. Then these are passed to the client app as part of SSR. like below.

```
const detectedLanguage = req.detectedLanguage || 'en';
const translations = req.translations as { en: {} };
```
then these can be injected in the `window` object
```
<script id='preloadedTranslations'>
  window.__DETECTED_LANGUAGE__ = ${JSON.stringify(detectedLanguage)};
  window.__TRANSLATIONS__ = ${JSON.stringify({
    en: translations.en,
    [detectedLanguage]: translations,
    })};
</script>
```

then in the i18n.ts file, you can read these values for initialization.
```
import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

const options: InitOptions = {
  fallbackLng: 'en',
  // @ts-ignore
  lng: window.__DETECTED_LANGUAGE__,
  ...
};

i18n
  // we use the server to serve locale files (statically)
  .use(initReactI18next)
  .init(options);

// @ts-ignore
const translations = window.__TRANSLATIONS__;
if (translations) {
  for (const language in translations) {
    for (const namespace in translations[language]) {
      i18n.addResourceBundle(
        language,
        namespace,
        translations[language][namespace],
        true,
        true
      );
    }
  }
}
```

**More about configureApp**

Under the hood, the web app configuration provides this tooling by default through configuration:

- Parse cookies and json.
- Enable gzip compression for responses.
- Use `morgan` for logging purposes.
- Enable `cors` middleware.
- Assign unique `id` to all requests for traceability purposes.
- Configure session if requested by consumer application along with `redis` injected to request to that consumers can directly use `redis`.
- Serve content from static directories for resources like scripts, images, styles etc.
- Configure hot-reloading using `webpackDevMiddleware` and `webpackHotMiddleware`.
- Establish routing using `express-enrouten` through directory-based structure.
- Configure a final error handler for any unhandled exceptions occurring from route handlers in consumer applications.

### runApp(app, options)

Allows running consumer web application referring to provided options.

**app**: An express.Application instance

**options**

- `port`: Unique port on which the consumer web application should run
- `appName`: Display name of the consumer web application for logging purposes.
- `setup`: A function that consumer can provide to do prerequisite setup before running the server. For example, connecting to database.
- `callback`: A callback function that will be invoked once web-app starts running.

### getWebpackConfig(environment, basePath)

Provides default, basic configuration for consumer web applications to run universal react apps.

**environment**: The environment web application is running in i.e. development, production etc.

**basePath**: Base path of the consumer web application, usually `__dirname`.

The default webpack configuration includes the following:

- Setting build mode using `environment` provided to function
- Enable hot reloading in non-production environment and set up `src/client/index.ts` as client app entrypoint for your consumer web application. Note that this cannot be changed as of now and hence consumer MUST have this set up accordingly.
- Setup generated build file naming based on environment and instruct webpack to generate client build in `build-static` directory for the consumer web application.
- Enable typescript file transpilation.
- Enable `svg` files to be processed using `react-svg-loader`. You can import svg files in your react components like normal typescript files.
- Generate manifest file with pointers to built files.
- Enable code splitting using loadable-components.
- Enable minification of generated bundles in production environment
- Enable source maps in production environment
- Instruct webpack to set threshold of a built file to be 5MB max.

### Extended Type Definitions

- `Request`: Will contain request.id, request.initialState, request.user and request.sessionID included in type definitions that consumers can use to stay consistent with the extensions implemented by `@alcumus/web-app`.

- `AppOptions`: Options you can provide to `configureApp` function

- `AppStartupOptions`: Options you can provide to `runApp` function
