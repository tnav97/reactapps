import { Utilities } from '@alcumus/core';

export const getBillingServiceKey = (): string => {
  return Utilities.ProcessEnv.getValueOrThrow('BILLING_SERVICE_KEY');
};
