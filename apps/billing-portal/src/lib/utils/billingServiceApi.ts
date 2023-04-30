import { Utilities } from '@alcumus/core';

export const getBillingServiceApiUrl = (
  path: string,
  versionNumber?: number
): string =>
  `${Utilities.ProcessEnv.getValueOrThrow('BILLING_SERVICE_API')}/api/v${
    versionNumber || 1
  }${path}`;

export const getBillingServiceKey = (): string =>
  `${process.env.BILLING_SERVICE_KEY}`;
