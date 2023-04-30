import path from 'path';
import { Application } from 'express';
import { configureApp } from '@alcumus/web-app';
import renderPage from './middleware/renderPage';
import addSplitTreatments from './middleware/addSplitTreatments';

const app: Application = configureApp({
  paths: {
    routes: path.resolve(__dirname, './routes'),
    webpackConfig: path.resolve(__dirname, '../../webpack.config.js'),
    staticDirectories: [path.resolve(__dirname, '../../static')],
    localesDirectory: path.resolve(__dirname, '../../static/locales'),
  },
  sentryDsn: process.env.SELF_SIGNUP_SENTRY_DSN,
  setup: (webApp) => {
    webApp.get('*', addSplitTreatments);
    webApp.use('*', renderPage);
  },
  sessionSecret: process.env.SELF_SIGNUP_SESSION_SECRET,
});

export default app;
