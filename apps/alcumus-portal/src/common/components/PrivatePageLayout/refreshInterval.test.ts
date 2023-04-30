import { getTokenRefreshIntervalInMilliseconds } from './refreshInterval';

describe('refreshInterval.ts', () => {
  describe('getTokenRefreshIntervalInMilliseconds', () => {
    it('returns four minutes in milliseconds if expiry interval 5 minutes', () => {
      const keycloakInterval = getTokenRefreshIntervalInMilliseconds(5 * 60);
      expect(keycloakInterval).toEqual(4 * 60 * 1000);
    });

    it('returns 15 minutes in milliseconds if expiry interval is 1 hour', () => {
      const azureAdInterval = getTokenRefreshIntervalInMilliseconds(3600);
      expect(azureAdInterval).toEqual(15 * 60 * 1000);
    });
  });
});
