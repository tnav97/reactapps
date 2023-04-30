import React from 'react';
import { NextFunction, Response } from 'express';
import { Types, Utilities } from '@alcumus/core';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';
import configureStore from '../../client/redux/configureStore';
import Router from '../../common/router';
import ReduxStateDecorator from '../../client/redux/StateDecorator';
import { RootReducerState } from '../../client/redux/reducers';

export default function renderPage(
  req: Types.Request,
  res: Response,
  next: NextFunction
) {
  const baseUrl = req.headers.host;
  const isLocalhostOrLocalNetwork =
    baseUrl?.startsWith('localhost:') ||
    baseUrl?.split(/[:/]/)[0].endsWith('.local');

  if (!isLocalhostOrLocalNetwork) {
    res.header(
      'Access-Control-Allow-Origin',
      Utilities.ProcessEnv.getValue(
        'ALCUMUS_PORTAL_ACCESS_CONTROL_ALLOW_ORIGIN_URL_LIST'
      )
    );
  } else {
    res.header('Access-Control-Allow-Origin', '*');
  }

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

    const store = configureStore(req.initialState || {});
    const preloadedState = (req.initialState ||
      store.getState()) as RootReducerState;
    if (!req.initialState) {
      req.initialState = preloadedState;
    }

    const html = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
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
    const currentNonce = res.locals.scriptNonce;

    res.send(`
      <!DOCTYPE html>
      <html lang="en-US">
        <head>
          ${baseUrl}
          <link href="/images/favicon.ico" rel="shortcut icon">    
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
          <title>Alcumus Portal</title>
          <link rel="preconnect" href="https://fonts.gstatic.com">
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          ${extractor.getLinkTags({ nonce: currentNonce })}
          <script id='preloadedTranslations' nonce='${currentNonce}'>
            window.__DETECTED_LANGUAGE__ = ${JSON.stringify(detectedLanguage)};
            window.__TRANSLATIONS__ = ${JSON.stringify({
              en: translations.en,
              [detectedLanguage]: translations,
            })};
          </script>
          <script id="stateData" nonce='${currentNonce}'>window.__PRELOADED_STATE__ = ${JSON.stringify(
      preloadedState
    ).replace(/</g, '\\u003c')};</script>
        </head>
        <body>
          <div id="root">${html}</div>
          ${extractor.getScriptTags({ nonce: currentNonce })}
        </body>
      </html>
    `);
  }
}
