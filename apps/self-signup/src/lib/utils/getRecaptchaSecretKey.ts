import { Utilities } from '@alcumus/core';

export const getRecaptchaSecretKey = (): string => {
  return Utilities.ProcessEnv.getValueOrThrow(
    'SELF_SIGNUP_RECAPTCHA_SECRET_KEY'
  );
};
