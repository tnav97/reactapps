import React from 'react';
import { Types } from '@alcumus/core';
import { NextFunction, Response } from 'express';
import ReactDOMServer from 'react-dom/server';
import path from 'path';
import { StaticRouter } from 'react-router-dom';
import { ChunkExtractor } from '@loadable/server';
import configureStore from '../../client/redux/configureStore';
import Router from '../../common/router';
import ReduxStateDecorator from '../../client/redux/StateDecorator';
import serialize from 'serialize-javascript';
export default function renderPage(
  req: Types.Request,
  res: Response,
  next: NextFunction
) {
  res.header('Permissions-Policy', 'self');
  res.header('Access-Control-Allow-Origin', req.headers.host);
  res.header('Access-Control-Allow-Methods', req.method);
  Object.keys(req.cookies).forEach(function eachKey(key) {
    res.cookie(key, req.cookies[key], {
      httpOnly: true,
      secure: true,
      sameSite: true,
    });
  });
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
      <StaticRouter location={req.url} context={context}>
        <ReduxStateDecorator>
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

    const currentNonce = res.locals.scriptNonce;

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
        <!-- Start VWO Async SmartCode -->
          <script type='text/javascript' nonce='${currentNonce}'>
          window._vwo_code = window._vwo_code || (function(){
          var account_id=480599,
          settings_tolerance=2000,
          library_tolerance=2500,
          use_existing_jquery=false,
          is_spa=1,
          hide_element='body',
  
        /* DO NOT EDIT BELOW THIS LINE */
          f=false,d=document,code={use_existing_jquery:function()
          {return use_existing_jquery;},library_tolerance:function()
          {return library_tolerance;},finish:function()
          {if(!f){f=true;var a=d.getElementById('_vis_opt_path_hides');
          if(a)a.parentNode.removeChild(a);}},finished:function()
          {return f;},load:function(a){var b=d.createElement('script');
          b.src=a;b.type='text/javascript';b.innerText;b.onerror=function()
          {_vwo_code.finish();};d.getElementsByTagName('head')[0].appendChild(b);}
          ,init:function(){window.settings_timer=setTimeout(function () {_vwo_code.finish() }
          ,settings_tolerance);var a=d.createElement('style'),
          b=hide_element?hide_element+'{opacity:0 !important; filter:alpha(opacity=0) !important;background:none !important;}':'',
          h=d.getElementsByTagName('head')[0];a.setAttribute('id','_vis_opt_path_hides');
          a.setAttribute('type','text/css');if(a.styleSheet)a.styleSheet.cssText=b;
          else a.appendChild(d.createTextNode(b));h.appendChild(a);
          this.load('https://dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(d.URL)+'&f='+(+is_spa)+'&r='+Math.random());
          return settings_timer; }};window._vwo_settings_timer = code.init(); return code; }());
          </script>
        <!-- End VWO Async SmartCode -->
          <script  nonce='${currentNonce}' type="text/javascript" id="">window.__lc=window.__lc||{};window.__lc.license=11284403;(function(){var a=document.createElement("script");a.type="text/javascript";a.async=!0;a.src=("https:"==document.location.protocol?"https://":"http://")+"cdn.livechatinc.com/tracking.js";var b=document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)})();</script>
          <!--Start Google tag (gtag.js)-->
          <script  nonce='${currentNonce}' async src="https://www.googletagmanager.com/gtag/js?id=G-KP0E77Q7KR"></script> 
          <script nonce='${currentNonce}'> window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-KP0E77Q7KR'); </script>
          <!--End Google tag (gtag.js)-->
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
        /* Firefox */
            input[type=number] {
            -moz-appearance: textfield;
            }
          </style>
          <style type='text/css'>
            body {
            background-color:#ffffff
            }
            ::-webkit-scrollbar {
              width: 0;
              }
          </style>
          <script nonce='${currentNonce}'>
            <a href="https://www.livechatinc.com/chat-with/11284403/" rel="nofollow">Chat with us</a>,
            powered by <a href="https://www.livechatinc.com/?welcome" rel="noopener nofollow" target="_blank">LiveChat</a>
          </script>
          <div id="root">${html}
          <div id="chat-widget-container" ><iframe sandbox="allow-same-origin allow-scripts allow-forms" allow="autoplay;" src="https://secure-fra.livechatinc.com/customer/action/open_chat?license_id=11284403&amp;group=3&amp;embedded=1&amp;widget_version=3&amp;unique_groups=0" allowtransparency="true" id="chat-widget" name="chat-widget" title="LiveChat chat widget" scrolling="no" style="width: 100%; height: 100%; min-height: 0px; min-width: 0px; margin: 0px; padding: 0px; background-image: none; background-position: 0% 0%; background-size: initial; background-attachment: scroll; background-origin: initial; background-clip: initial; background-color: rgba(0, 0, 0, 0); border-width: 0px; float: none; position: absolute; inset: 0px; transition: none 0s ease 0s !important;"></iframe></div>
          </div>
          ${extractor.getScriptTags({ nonce: currentNonce })}
        </body>
      </html>
    `);
  }
}
