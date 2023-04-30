import React from 'react';
import { NextFunction, Response } from 'express';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import { Types } from '@alcumus/core';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';
import { RecoilRoot } from 'recoil';

export default function renderPage(
  req: Types.Request,
  res: Response,
  next: NextFunction
) {
  const contentType =
    req.headers['content-type'] || req.headers['Content-Type'];
  if (contentType && !contentType.includes('text/html')) {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  } else {
    const context: { url?: string } = {};
    if (context.url) {
      res.redirect(context.url);
      return;
    }

    const preloadedState = req.initialState || {};
    if (!req.initialState) {
      req.initialState = preloadedState;
    }

    const html = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} context={context}>
        <RecoilRoot />
      </StaticRouter>
    );

    const statsFile = path.join(
      process.cwd(),
      './build-static/loadable-stats.json'
    );
    const extractor = new ChunkExtractor({
      statsFile,
      entrypoints: ['client'],
      publicPath: '/',
    });

    const baseUrl = process.env.BASE_URL
      ? `<base href="${process.env.BASE_URL}">`
      : '<base href="/">';

    res.send(`
      <!DOCTYPE html>
      <html lang="en-US">
        <head>
          ${baseUrl}
          <link href="/images/favicon.ico" rel="shortcut icon">
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" priority="1" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
          <title>Safety Intelligence</title>
          <link rel="preconnect" href="https://fonts.gstatic.com">
          <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
          <link href="https://fonts.googleapis.com/css2?family=Material+Icons+Outlined" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
          ${extractor.getLinkTags()}
          <link href="/client.css" rel="stylesheet" type="text/css">
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
