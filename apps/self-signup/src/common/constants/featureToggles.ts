import environmentVariables from '../environmentVariables';
import { Utilities } from '@alcumus/core';

export const FeatureToggles = {
  useSplit: () => Utilities.ProcessEnv.isEnabled('FEATURE_TOGGLE_USE_SPLIT'),
  createBillingAccount: () =>
    Utilities.ProcessEnv.isEnabled(
      'FEATURE_TOGGLE_CREATE_BILLING_ACCOUNT_ON_SIGNUP'
    ),
  useRecaptcha: () =>
    environmentVariables.SELF_SIGNUP_USE_RECAPTCHA_TOGGLE === 'true',

  showUpgradeCTAButton: () =>
    environmentVariables.FEATURE_TOGGLE_SELF_SIGNUP_SHOW_UPGRADE_CTA === 'true',
};
