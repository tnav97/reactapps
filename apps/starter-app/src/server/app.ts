import path from 'path';
import { Application } from 'express';
import { configureApp } from '@alcumus/web-app';
import renderPage from './middleware/renderPage';

const app: Application = configureApp({
  paths: {
    routes: path.resolve(__dirname, './routes'),
    webpackConfig: path.resolve(__dirname, '../../webpack.config.js'),
    staticDirectories: [path.resolve(__dirname, '../../static')],
  },
  setup: (webApp) => {
    webApp.use('*', renderPage);
  },
});

export default app;
