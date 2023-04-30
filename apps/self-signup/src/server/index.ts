import 'dotenv/config';
import app from './app';
import { runApp } from '@alcumus/web-app';
import { Promise as BluebirdPromise } from 'bluebird';
import SplitManager from './splitManager';

global.Promise = BluebirdPromise;

const port: number = Number(process.env.SELF_SIGNUP_PORT) || 3003;

// Initialize so that splits are loaded early on
SplitManager.getInstance();

runApp(app, { appName: 'Self Signup', port });
