import { Utilities } from '@alcumus/core';

export const getBillingServiceApiUrl = (
  path: string,
  versionNumber?: number
): string => {
  return `${Utilities.ProcessEnv.getValueOrThrow('BILLING_SERVICE_API')}/api/v${
    versionNumber || 1
  }/${path}`;
};
