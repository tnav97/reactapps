import React from 'react';
import { Types } from '@alcumus/core';
import { NextFunction, Response } from 'express';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import { StaticRouter } from 'react-router-dom/server';
import { ChunkExtractor } from '@loadable/server';
import configureStore from '../../client/redux/configureStore';
import Router from '../../common/router';
import ReduxStateDecorator from '../../client/redux/StateDecorator';
import serialize from 'serialize-javascript';
import { createHmac } from 'crypto';
import fs from 'fs';
import { validateStatusHealth } from '../models/statusHealth';
export default async function renderPage(
  req: Types.Request,
  res: Response,
  next: NextFunction
) {
  const response = await validateStatusHealth();
  if (req.headers.host?.includes('localhost')) {
    res.header('Access-Control-Allow-Origin', req.headers.host);
  } else {
    res.header('Access-Control-Allow-Origin', `https://${req.headers.host}/`);
  }
  if (req.headers.host?.includes('localhost')) {
    res.header('Access-Control-Allow-Headers', [
      req.headers.host,
      'Content-Type',
      'x-requested-with',
    ]);
  } else {
    res.header('Access-Control-Allow-Headers', [
      `https://${req.headers.host}/`,
      'Content-Type',
      'x-requested-with',
    ]);
  }

  res.header('Access-Control-Allow-Origin', req.headers.host);
  res.header('Access-Control-Allow-Methods', req.method);
  res.header('Permissions-Policy', `fullscreen=(self)`);

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

    const store = configureStore();
    const preloadedState = request.initialState || store.store.getState();
    if (!request.initialState) {
      request.initialState = preloadedState;
    }

    const html = ReactDOMServer.renderToString(
      <StaticRouter location={req.url} >
        <ReduxStateDecorator>
          <Router />
        </ReduxStateDecorator>
      </StaticRouter>
    );

    const data = `User-agent: *
Disallow: /images
Disallow: /icons
Disallow: /locales
Sitemap:  https://${req.headers.host}/
`;
    fs.writeFile('static/robots.txt', data, (err) => {
      // In case of a error throw err.
      if (err) throw err;
    });

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

    const currentNonce = res.locals.scriptNonce;
    const HotJarCode =
      req.headers.host?.includes('localhost') ||
      req.headers.host?.includes('alcdev')
        ? ''
        : `<script nonce='${currentNonce}'> (function(h,o,t,j,a,r){ h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)}; h._hjSettings={hjid:3343101,hjsv:6}; a=o.getElementsByTagName('head')[0]; r=o.createElement('script');r.async=1; r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv; a.appendChild(r); })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv='); </script>`;
    res.send(`
      <!DOCTYPE html>
      <html lang="en-US">
        <head>
          ${baseUrl}
          <link href="/images/favicon.ico" rel="shortcut icon">
          <meta charset="utf-8" />
          <meta name="description" content="safecontractor registration portal" />
          <meta name="viewport" content="width=device-width, initial-scale=1" priority="1" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
          <title>SafeContractor Registration Portal</title>
          <link rel="preconnect" href="https://fonts.gstatic.com">
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
          ${extractor.getLinkTags({ nonce: currentNonce })}
          <script id="stateData" nonce='${currentNonce}'>window.__PRELOADED_STATE__ = ${serialize(
      preloadedState
    ).replace(/</g, '\\u003c')};</script>
     
          <script  nonce='${currentNonce}' type="text/javascript" id="">window.__lc=window.__lc||{};window.__lc.license=11284403;(function(){var a=document.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"==document.location.protocol?"https://":"http://")+"cdn.livechatinc.com/tracking.js";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)})();</script>
          <!-- Hotjar Tracking Code for SafeContractor Checkout --> ${HotJarCode}
          <!--Start Google tag (gtag.js)-->
          <script  nonce='${currentNonce}' async src="https://www.googletagmanager.com/gtag/js?id=G-LSRTZLEJQ0"></script> 
          <script nonce='${currentNonce}'> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-LSRTZLEJQ0', {cookie_flags: 'max-age=7200;secure;samesite=none'}); </script>
          <!--End Google tag (gtag.js)-->
          <script nonce='${currentNonce}'>
          '${Object.keys(req.cookies).forEach(function eachKey(key) {
            const keyContent = key;
            const keyValue = req.cookies[key];
            const domainValue =
              req.headers.host?.substring(req.headers.host?.indexOf('.') + 1) ??
              'localhost';
            res.clearCookie(key);
            if (req.headers.host?.includes('localhost')) {
              res.cookie(
                keyContent,
                createHmac('sha256', keyValue)
                  .update('Cookies Encrypted')
                  .digest('hex'),
                {
                  domain: 'localhost',
                  httpOnly: true,
                  secure: true,
                  sameSite: true,
                }
              );
            } else {
              if (!keyContent.startsWith('_ga')) {
                res.cookie(
                  keyContent,
                  createHmac('sha256', keyValue)
                    .update('Cookies Encrypted')
                    .digest('hex'),
                  {
                    domain:
                      keyContent === '_vwo_uuid_v2'
                        ? `.${req.headers.host}`
                        : `.${domainValue}`,
                    httpOnly: true,
                    secure: true,
                    sameSite: true,
                  }
                );
              }
            }
          })}'
          </script>

        </head>
        <body>
        <style type="text/css">
            div#chat-widget-container{
              bottom:82px !important;
              right: 0px !important;
              max-height:90% !important;
              }
              iframe#chat-widget{
                margin: 16px !important;
                margin-left: 14px !important;
              }
              @media only screen and (max-width: 760px) {
                div#chat-widget-container {
                  bottom:116px !important;
                  right: 0px !important;
                }
            }
          </style>     
          <style type="text/css">
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
            }
            input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
}
        /* Firefox */
            input[type=number] {
            -moz-appearance: textfield;
            }
          </style>
          <style type='text/css'>
            body {
            background-color:#ffffff
            }
            @media only screen and (max-width: 470px) {
              ::-webkit-scrollbar {
                width:0;
              }
            }
            @media only screen and (min-width: 470px) {
            ::-webkit-scrollbar {
              width: 5px;
            }
            
            /* Track */
            ::-webkit-scrollbar-track {
              background: #F8F8F8; 
            }
             
            /* Handle */
            ::-webkit-scrollbar-thumb {
              background: #888; 
            }
            
            /* Handle on hover */
            ::-webkit-scrollbar-thumb:hover {
              background: #555; 
            }
          }
          </style>
          <script nonce='${currentNonce}'>
            <a href="https://www.livechatinc.com/chat-with/11284403/" rel="nofollow">Chat with us</a>,
            powered by <a href="https://www.livechatinc.com/?welcome" rel="noopener nofollow" target="_blank">LiveChat</a>
          </script>
          <div id="root">${html}
          <div id="myDIV" style="display:none;">
          <h3 id="statusCake">${response.status}</h3>
          </div>
          <div id="chat-widget-container" ><iframe sandbox="allow-same-origin allow-forms" allow="autoplay;" src="https://secure-fra.livechatinc.com/customer/action/open_chat?license_id=11284403&amp;group=3&amp;embedded=1&amp;widget_version=3&amp;unique_groups=0" allowtransparency="true" id="chat-widget" name="chat-widget" title="LiveChat chat widget" scrolling="no" style="width: 100%; height: 100%; min-height: 0px; min-width: 0px; margin: 0px; padding: 0px; background-image: none; background-position: 0% 0%; background-size: initial; background-attachment: scroll; background-origin: initial; background-clip: initial; background-color: rgba(0, 0, 0, 0); border-width: 0px; float: none; position: absolute; inset: 0px; transition: none 0s ease 0s !important;"></iframe>
          </div>
          </div>
          ${extractor.getScriptTags({ nonce: currentNonce })}
        </body>
      </html>
    `);
  }
}
