import express, { Application, Response, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import enrouten from 'express-enrouten';
import morgan from 'morgan';
import session from 'express-session';
import cors from 'cors';
import { v4 as uuidV4 } from 'uuid';
import webpack from 'webpack';
import crypto from 'crypto';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { Types, Utilities } from '@alcumus/core';
import getRedisClient, { getRedisStore } from './lib/clients/redis';
import { AppOptions, ResponseError, Translations } from './types';
import {
  ONE_HOUR_IN_MILLISECONDS,
  TEN_MINUTES_IN_MILLISECONDS,
} from './constants';
import * as Sentry from '@sentry/node';
import { handleHealthCheck } from './healthCheckHandler';
import { getTranslations } from './getTranslations';

// import * as Tracing from '@sentry/tracing';

// importing express-async-errors ensures that asynchronous errors are handled
// normally by express. (ie. the same as synchronous errors)
import 'express-async-errors';
import getTranslationMiddleware from './getTranslationMiddleware';
import helmet from 'helmet';

function finalErrorHandler(
  err: ResponseError,
  req: Types.Request,
  res: Response,
  next: NextFunction
) {
  if (err) {
    if (!err.status) {
      console.error(err.message, err.stack);
    }
    res
      .status(Number(err.response?.status || err.status) || 500)
      .json(err.response ? err.response.data : { message: err.message });
  } else {
    next();
  }
}

export default function configureApp(options: AppOptions) {
  const {
    setup,
    paths: { routes, staticDirectories, webpackConfig, localesDirectory },
    environment,
    sentryDsn,
    sessionSecret,
    cspDirectives,
  } = options;

  const app: Application = express();
  const defaultCspDirectivesOption = {
    defaultSrc: ["'self'", 'https:'],
    scriptSrc: [
      (req: any, res: any) => `'nonce-${res.locals.scriptNonce}'`,
      "'self'",
      'http:',
      'https:',
    ],
    styleSrc: ["'self'", "'unsafe-inline'", 'https:'],
    imgSrc: ["'self'", 'https:', 'data:'],
    fontSrc: ["'self'", 'https:'],
    frameSrc: ["'self'", 'https:'],
    connectSrc: ["'self'", 'http:', 'https:'],
  };
  let cspDirectivesOption = cspDirectives;

  if (cspDirectives) {
    cspDirectivesOption = {
      defaultSrc: [
        ...defaultCspDirectivesOption.defaultSrc,
        ...(cspDirectives.defaultSrc ?? []),
      ],
      scriptSrc: [
        ...defaultCspDirectivesOption.scriptSrc,
        ...(cspDirectives.scriptSrc ?? []),
      ],
      styleSrc: [
        ...defaultCspDirectivesOption.styleSrc,
        ...(cspDirectives.styleSrc ?? []),
      ],
      imgSrc: [
        ...defaultCspDirectivesOption.imgSrc,
        ...(cspDirectives.imgSrc ?? []),
      ],
      fontSrc: [
        ...defaultCspDirectivesOption.fontSrc,
        ...(cspDirectives.fontSrc ?? []),
      ],
      frameSrc: [
        ...defaultCspDirectivesOption.frameSrc,
        ...(cspDirectives.frameSrc ?? []),
      ],
      connectSrc: [
        ...defaultCspDirectivesOption.connectSrc,
        ...(cspDirectives.connectSrc ?? []),
      ],
    };
  }

  if (environment) {
    if (environment.required.length && process.env.NODE_ENV !== 'test') {
      environment.required.forEach((envKey) => {
        Utilities.ProcessEnv.getValueOrThrow(envKey);
      });
    }
  }

  if (process.env.NODE_ENV === 'production' && sentryDsn) {
    Sentry.init({
      dsn: sentryDsn,
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        // this integration causes enrouten to not handle api requests
        // new Tracing.Integrations.Express({ app }),
      ],
      environment: process.env.SENTRY_ENVIRONMENT,
      release: process.env.BUILD_VERSION,
      initialScope: {
        // This tag allows identifying which errors are from server vs client
        tags: { 'sent-from': 'express' },
      },
    });
  }

  app.use(Sentry.Handlers.requestHandler());
  app.disable('x-powered-by');
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(compression());
  app.use(morgan('combined'));
  app.use(cors());
  app.use((req, res, next) => {
    // nonce should be base64 encoded
    res.locals.scriptNonce = crypto.randomBytes(16).toString('base64');
    next();
  });

  app.use(
    helmet({
      referrerPolicy: {
        policy: 'strict-origin',
      },
      expectCt: {
        maxAge: 43200,
        enforce: true,
      },
      frameguard: {
        action: 'sameorigin',
      },
      crossOriginResourcePolicy: false,
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
      crossOriginEmbedderPolicy: false,
      contentSecurityPolicy: {
        useDefaults: false,
        // @ts-ignore
        directives: cspDirectivesOption,
      },
    })
  );

  // Enable distributed tracing through request identifiers
  app.use((req: Types.Request, res: Response, next: NextFunction) => {
    if (!req.id) {
      req.id = uuidV4();
      next();
    } else {
      next();
    }
  });

  // Enable sessions if session secret was provided by consumer
  if (sessionSecret) {
    const redisOptions = {
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT) || 6379,
      password: process.env.REDIS_PASSWORD,
      connectTimeout: TEN_MINUTES_IN_MILLISECONDS, // expire cache items after 10 minutes
    };

    // make redis client available to consumer apps to be used as req.app.redis or req.app.get('redis');
    app.set('redis', getRedisClient(redisOptions));

    app.use(
      session({
        store: getRedisStore(redisOptions),
        secret: sessionSecret,
        saveUninitialized: true,
        /**
         * Resave option must be set to false, otherwise it "has a high likelyhood
         * of requests stomping out the changes you're making to your session":
         * https://github.com/expressjs/session/issues/71
         *
         * This came to light during e2e cypress tests, and upon research, it
         * does not seem that we need resave: true. https://github.com/expressjs/session#resave
         *
         * "Depending on your store this may be necessary, but it can also create race conditions..."
         */
        resave: false,
        cookie: {
          httpOnly: true,
          maxAge: ONE_HOUR_IN_MILLISECONDS, // Cookies will be valid for 1 hour
          // secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax', // revisit if we should set it to strict
        },
      })
    );
  }

  if (staticDirectories?.length) {
    staticDirectories.forEach((path) => {
      app.use(express.static(path));
    });
  }

  if (localesDirectory) {
    const translations: Translations = getTranslations(localesDirectory);
    app.use('*', getTranslationMiddleware(translations));
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const config = require(webpackConfig);
  if (process.env.NODE_ENV === 'development') {
    const compiler = webpack(config);
    app.use(
      webpackDevMiddleware(compiler, {
        stats: { colors: true },
        publicPath: config.output.publicPath,
      })
    );
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    app.use(webpackHotMiddleware(compiler));
  } else {
    // If running in non-development mode, expose the public path as static
    app.use(express.static(config.output.path));
  }

  // Support directory-based routing by default
  app.use(
    enrouten({
      directory: routes,
    })
  );

  // Allow consumer to run its own setup adding additional things for server app
  app.get('/api/health', handleHealthCheck(config.appName || 'Web App'));
  setup(app);

  app.use(Sentry.Handlers.errorHandler());

  // Add final error handler for api endpoints
  app.use(finalErrorHandler);

  return app;
}
