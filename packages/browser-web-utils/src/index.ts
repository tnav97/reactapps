import * as BrowserSentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

import { BrowserWebAppConfiguration } from './types';

export { BrowserWebAppConfiguration };

export const reportBroswerHandledError = (err, tags?: object) => {
  const sentryContext = tags ? { tags: { ...tags } } : undefined;
  BrowserSentry.captureException(err, sentryContext);
};

export const configureBrowserWebApp = ({
  sentry,
}: BrowserWebAppConfiguration) => {
  if (sentry.SENTRY_ENVIRONMENT && sentry.SENTRY_DSN) {
    try {
      BrowserSentry.init({
        dsn: sentry.SENTRY_DSN,
        integrations: [new Integrations.BrowserTracing()],
        tracesSampleRate: parseFloat(sentry.SENTRY_SAMPLE_RATE || '1.0'),
        environment: sentry.SENTRY_ENVIRONMENT,
        release: sentry.SENTRY_RELEASE,
        initialScope: {
          // This tag allows identifying which errors are from server vs client
          tags: { 'sent-from': 'react' },
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
};
