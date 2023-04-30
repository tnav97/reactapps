import dotenv from 'dotenv';
import app from './app';
import { runApp } from '@alcumus/web-app';
import { EnvVariables } from './constants';

dotenv.config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
global.Promise = require('bluebird').Promise;

runApp(app, { appName: 'Alcumus Portal App', port: EnvVariables.WebPort });
