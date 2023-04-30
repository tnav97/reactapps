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
    defaultSrc: [
      'dev.visualwebsiteoptimizer.com',
      'cdn-cn.vwo-analytics.com',
      'static.hotjar.com',
      'script.hotjar.com',
      'https://*.hotjar.com',
      'https://*.hotjar.io',
      'wss://*.hotjar.com',
    ],
    scriptSrc: ['static.hotjar.com', 'script.hotjar.com'],
    styleSrc: [
      'fonts.googleapis.com',
      'static.hotjar.com',
      'script.hotjar.com',
    ],
    imgSrc: [
      'dev.visualwebsiteoptimizer.com',
      'static.hotjar.com',
      'script.hotjar.com',
    ],
    fontSrc: ['cdn.livechatinc.com', 'script.hotjar.com'],
    frameSrc: ['secure-fra.livechatinc.com', 'vars.hotjar.com'],
    connectSrc: [
      'www.google-analytics.com',
      'dev.visualwebsiteoptimizer.com',
      'screg-dev.alcdev.net',
      'screg-qa.alcdev.net',
      'screg-staging.alcdev.net',
      'registration.safecontractor.net',
      'https://*.hotjar.com',
      'https://*.hotjar.io',
      'wss://*.hotjar.com',
    ],
  },
});
export default app;
