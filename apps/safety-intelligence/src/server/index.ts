import dotenv from 'dotenv';
import app from './app';
import { runApp } from '@alcumus/web-app';

dotenv.config();
// eslint-disable-next-line @typescript-eslint/no-var-requires
global.Promise = require('bluebird').Promise;

const port: number = Number(process.env.SAFETY_INTELLIGENCE_WEB_PORT) || 3002;

runApp(app, { appName: 'Safety Intelligence App', port });
