// @ts-nocheck
/**
 * Since we use ReactDOMServer to render on server side,
 * 'window' is not available, and therefore we should reference
 * process.env on the server side to get envrionment variables
 */

const environmentVariables = {
  SENTRY_ENVIRONMENT: process.env.SELF_SIGNUP_SENTRY_ENVIRONMENT,
  SENTRY_RELEASE: process.env.BUILD_VERSION,
  SENTRY_DSN: process.env.SELF_SIGNUP_SENTRY_DSN,
  SENTRY_SAMPLE_RATE: process.env.SELF_SIGNUP_SENTRY_SAMPLE_RATE,
  SESSION_TIMEOUT_MINUTES: process.env.SELF_SIGNUP_SESSION_TIMEOUT_MINUTES,
  MIXPANEL_TOKEN: process.env.SELF_SIGNUP_MIXPANEL_TOKEN,
  FEATURE_TOGGLE_SELF_SIGNUP_SHOW_UPGRADE_CTA:
    process.env.FEATURE_TOGGLE_SELF_SIGNUP_SHOW_UPGRADE_CTA,
  SELF_SIGNUP_RECAPTCHA_SITE_KEY: process.env.SELF_SIGNUP_RECAPTCHA_SITE_KEY,
  SELF_SIGNUP_USE_RECAPTCHA_TOGGLE:
    process.env.SELF_SIGNUP_USE_RECAPTCHA_TOGGLE,
};

export default environmentVariables;
