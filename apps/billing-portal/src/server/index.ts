import dotenv from 'dotenv';
import app from './app';
import { runApp } from '@alcumus/web-app';
import { Promise as BluebirdPromise } from 'bluebird';

dotenv.config();
global.Promise = BluebirdPromise;

const port: number = Number(process.env.BILLING_PORTAL_WEB_PORT) || 3004;

runApp(app, { appName: 'Billing Portal', port });
