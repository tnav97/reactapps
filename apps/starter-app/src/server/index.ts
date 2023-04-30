import dotenv from 'dotenv';
import app from './app';
import { runApp } from '@alcumus/web-app';
import { Promise as BluebirdPromise } from 'bluebird';

dotenv.config();
global.Promise = BluebirdPromise;

const port: number = Number(process.env.STARTER_APP_PORT) || 3000;

runApp(app, { appName: 'Starter App', port });
