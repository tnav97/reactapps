import * as BrowserSentry from '@sentry/react';

import {
  reportBroswerHandledError,
  configureBrowserWebApp,
  BrowserWebAppConfiguration,
} from './index';

jest.mock('@sentry/react');

const mockBrowserSentry = BrowserSentry as jest.Mocked<typeof BrowserSentry>;

describe('reportBroswerHandledError', () => {
  test('it calls captureException', () => {
    const err = new Error('some message');
    reportBroswerHandledError(err);

    expect(mockBrowserSentry.captureException).toBeCalledTimes(1);
    expect(mockBrowserSentry.captureException).toBeCalledWith(err, undefined);
  });

  test('it passes tags', () => {
    const err = new Error('some message');
    const tags = { tag1key: 'tag1val' };
    reportBroswerHandledError(err, { tag1key: 'tag1val' });

    expect(mockBrowserSentry.captureException).toBeCalledTimes(1);
    expect(mockBrowserSentry.captureException).toBeCalledWith(err, {
      tags: { ...tags },
    });
  });

  test('it calls initiialize', () => {
    const conf: BrowserWebAppConfiguration = {
      sentry: {
        SENTRY_DSN: 'dsn',
        SENTRY_ENVIRONMENT: 'en',
        SENTRY_RELEASE: 'rel',
        SENTRY_SAMPLE_RATE: '1',
      },
    };
    configureBrowserWebApp(conf);

    expect(mockBrowserSentry.init).toHaveBeenCalledTimes(1);
    expect(mockBrowserSentry.init).toHaveBeenCalledWith(
      expect.objectContaining({
        dsn: conf.sentry.SENTRY_DSN,
        environment: conf.sentry.SENTRY_ENVIRONMENT,
        release: conf.sentry.SENTRY_RELEASE,
        tracesSampleRate: Number(conf.sentry.SENTRY_SAMPLE_RATE),
      })
    );
  });
});
