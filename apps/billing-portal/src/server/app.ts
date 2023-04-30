import path from 'path';
import { Application } from 'express';
import { configureApp } from '@alcumus/web-app';
import renderPage from './middleware/renderPage';
import { Utilities } from '@alcumus/core';
import loadPlans from './middleware/loadPlans';
import loadSessionVariables from './middleware/loadSessionVariables';
import helmet from 'helmet';
import { EnvironmentVariables } from '../common/constants/environmentVariables';

const app: Application = configureApp({
  paths: {
    routes: path.resolve(__dirname, './routes'),
    webpackConfig: path.resolve(__dirname, '../../webpack.config.js'),
    staticDirectories: [path.resolve(__dirname, '../../static')],
    localesDirectory: path.resolve(__dirname, '../../static/locales'),
  },
  setup: (webApp) => {
    webApp.get(
      '/iframe/*',
      helmet.contentSecurityPolicy({
        directives: {
          'default-src': ["'self'", 'https:'],
          // TODO: remove unsafe-eval for prod environments
          'script-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'"],
          'style-src': ["'self'", 'https:', "'unsafe-inline'"],
          'frame-ancestors': EnvironmentVariables.validIframeHosts(),
        },
      })
    );
    webApp.get('*', loadSessionVariables);
    webApp.use('*', loadPlans);
    webApp.use('*', renderPage);
  },
  sessionSecret: Utilities.ProcessEnv.getValueOrThrow(
    'BILLING_PORTAL_SESSION_SECRET'
  ),
});

export default app;
