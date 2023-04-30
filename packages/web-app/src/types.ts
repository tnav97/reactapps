import { Application } from 'express';
import { Types } from '@alcumus/core';

export type Environment = 'development' | 'staging' | 'production';

export interface ResponseError extends Error {
  status?: number;
  response?: Types.AxiosResponse;
}

interface CspDirectivesOptions {
  connectSrc?: Array<string>;
  defaultSrc?: Array<string>;
  imgSrc?: Array<string>;
  scriptSrc?: Array<any>;
  fontSrc?: Array<string>;
  frameSrc?: Array<string>;
  styleSrc?: Array<string>;
}
export interface AppOptions {
  appName?: string;
  paths: {
    routes: string;
    webpackConfig: string;
    staticDirectories?: Array<string>;
    localesDirectory?: string;
  };
  sentryDsn?: string;
  sessionSecret?: string;
  environment?: {
    required: string[];
  };
  cspDirectives?: CspDirectivesOptions;
  setup: (app: Application) => void;
}

export interface AppStartupOptions {
  port: number;
  appName?: string;
  setup?: () => Promise<void>;
  callback?: () => void;
}

export interface Translations {
  [key: string]: Translations;
}
