import { captureException } from '@sentry/node';

export const reportWebAppHandledError = (err: Error, tags?: object) => {
  const sentryContext = tags ? { tags: { ...tags } } : undefined;
  captureException(err, sentryContext);
};
