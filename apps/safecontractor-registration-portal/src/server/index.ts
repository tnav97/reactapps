import dotenv from 'dotenv';
import app from './app';
import { runApp } from '@alcumus/web-app';
import { Promise as BluebirdPromise } from 'bluebird';
import { Utilities } from '@alcumus/core';

dotenv.config();
global.Promise = BluebirdPromise;

const port: number =
  Number(
    Utilities.ProcessEnv.getValue('SAFE_CONTRACTOR_REGISTRATION_PORTAL_PORT')
  ) || 3000;

runApp(app, { appName: 'SafeContractor Registration Portal', port });
