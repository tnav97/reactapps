interface SentryConfiguration {
  SENTRY_ENVIRONMENT: string;
  SENTRY_DSN: string;
  SENTRY_SAMPLE_RATE: string;
  SENTRY_RELEASE: string;
}

export interface BrowserWebAppConfiguration {
  sentry: SentryConfiguration;
}
