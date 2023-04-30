import { Utilities } from '@alcumus/core';
import { split } from 'lodash';

export const EnvironmentVariables = {
  Redis: {
    host: () => Utilities.ProcessEnv.getValueOrThrow('REDIS_HOST'),
    port: () =>
      Number(Utilities.ProcessEnv.getValueOrThrow('REDIS_PORT')) || 6379,
    password: () => Utilities.ProcessEnv.getValue('REDIS_PASSWORD'),
    useSecureConnection: () =>
      Utilities.ProcessEnv.isEnabled('REDIS_SECURE_CONNECTION'),
  },
  sessionTransferSecret: () =>
    Utilities.ProcessEnv.getValueOrThrow(
      'BILLING_PORTAL_SESSION_TRANSFER_SECRET'
    ),
  validIframeHosts: () =>
    split(
      Utilities.ProcessEnv.getValue('BILLING_PORTAL_IFRAME_HOSTS_WHITELIST'),
      ','
    ),
};
