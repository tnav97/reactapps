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
  environment: {
    required: ['SCRP_EXPERIAN_API_KEY', 'SCRP_API_KEY'],
  },
  setup: (webApp) => {
    webApp.use('*', renderPage);
  },
  cspDirectives: {
    defaultSrc: ['dev.visualwebsiteoptimizer.com', 'cdn-cn.vwo-analytics.com'],
    styleSrc: ['fonts.googleapis.com'],
    imgSrc: ['dev.visualwebsiteoptimizer.com'],
    fontSrc: ['cdn.livechatinc.com'],
    frameSrc: ['secure-fra.livechatinc.com'],
    connectSrc: [
      'www.google-analytics.com',
      'dev.visualwebsiteoptimizer.com',
      'screg-dev.alcdev.net',
    ],
  },
});
export default app;
