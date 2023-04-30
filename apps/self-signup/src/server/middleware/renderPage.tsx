import React from 'react';
import { NextFunction, Response } from 'express';
import { Types } from '@alcumus/core';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';
import configureStore from '../../client/redux/configureStore';
import Router from '../../common/router';
import ReduxStateDecorator from '../../client/redux/StateDecorator';

export default function renderPage(
  req: Types.Request,
  res: Response,
  next: NextFunction
) {
  const contentType =
    req.headers['content-type'] || req.headers['Content-Type'];
  if (contentType && !contentType.includes('text/html')) {
    next();
  } else {
    const context: { url?: string } = {};
    if (context.url) {
      res.redirect(context.url);
      return;
    }

    // @ts-ignore
    const request = req as any;

    const store = configureStore(request.initialState || {});
    const preloadedState = request.initialState || store.getState();
    if (!request.initialState) {
      request.initialState = preloadedState;
    }

    const html = ReactDOMServer.renderToString(
      <StaticRouter location={req.url}>
        <ReduxStateDecorator initialState={preloadedState}>
          <Router />
        </ReduxStateDecorator>
      </StaticRouter>
    );

    const statsFile = path.join(
      process.cwd(),
      './build-static/loadable-stats.json'
    );
    const extractor = new ChunkExtractor({
      statsFile,
      entrypoints: ['client'],
      publicPath: process.env.BASE_URL || '/',
    });

    const baseUrl = process.env.BASE_URL
      ? `<base href="${process.env.BASE_URL}">`
      : '<base href="/">';
    const detectedLanguage = req.detectedLanguage || 'en';
    const translations = req.translations as { en: {} };
    res.send(`
      <!DOCTYPE html>
      <html lang="en-US">
        <head>
          ${baseUrl}
          <link href="/images/favicon.ico" rel="shortcut icon">
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" priority="1" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
          <title>Self Signup</title>
          <link rel="preconnect" href="https://fonts.gstatic.com">
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
          ${extractor.getLinkTags()}
          <script id='preloadedTranslations'>
          window.__DETECTED_LANGUAGE__ = ${JSON.stringify(detectedLanguage)};
          window.__TRANSLATIONS__ = ${JSON.stringify({
            en: translations.en,
            [detectedLanguage]: translations,
          })};
        </script>
          </script>
          <script id="stateData">window.__PRELOADED_STATE__ = ${JSON.stringify(
            preloadedState
          ).replace(/</g, '\\u003c')};</script>
        </head>
        <body>
          <div id="root">${html}</div>
          ${extractor.getScriptTags()}
        </body>
      </html>
    `);
  }
}
