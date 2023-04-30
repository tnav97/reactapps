import path from 'path';
import { Application } from 'express';
import { configureApp } from '@alcumus/web-app';
import renderPage from './middleware/renderPage';
import { EnvVariables } from './constants';
import { Middlewares } from '@alcumus/core';
import { getTranslate, ServerErrorNamespace } from './i18n';

const app: Application = configureApp({
  paths: {
    routes: path.resolve(__dirname, './routes/'),
    webpackConfig: path.resolve(__dirname, '../../webpack.config.js'),
    staticDirectories: [path.resolve(__dirname, '../../static')],
    localesDirectory: path.resolve(__dirname, '../../static/locales'),
  },
  environment: {
    required: [
      'ALCUMUS_PORTAL_SESSION_SECRET',
      'SERVICES_API_KEY',
      'SAFETY_INTELLIGENCE_WEB_HOST',
    ],
  },
  setup: (webApp) => {
    webApp.use('*', renderPage);
    webApp.use(
      Middlewares.getLocalizedErrorHandler(getTranslate, ServerErrorNamespace)
    );
  },
  sessionSecret: EnvVariables.SessionSecret,
  cspDirectives: {
    defaultSrc: [
      'uk-services-dev.alcdev.net',
      'uk-services-qa.alcdev.net',
      'servicesqabi.b2clogin.com',
    ],
    styleSrc: ['fonts.googleapis.com'],
    imgSrc: [
      'servicesqabi.b2clogin.com',
      'alcumusstaticcontent.z13.web.core.windows.net',
      'coredevuksstorage01.z33.web.core.windows.net',
      'media-exp1.licdn.com',
    ],
    fontSrc: ['fonts.gstatic.com'],
    connectSrc: [
      'uk-portal-dev.alcdev.net',
      'uk-services-dev.alcdev.net',
      'servicesqabi.b2clogin.com',
      'uk-portal-qa.alcdev.net',
      'uk-services-qa.alcdev.net',
    ],
  },
});

export default app;
