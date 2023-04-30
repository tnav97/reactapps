import { Utilities } from '@alcumus/core';
import shouldAllowAuthWithRedirectionFlow from '../../src/lib/utils/shouldAllowAuthWithRedirectionFlow';

describe('shouldAllowAuthWithRedirectionFlow', () => {
  test('should return false if only product is provided in url parameters', () => {
    expect(shouldAllowAuthWithRedirectionFlow([], 'safeSupplier')).toEqual(
      false
    );
  });

  test('should return false if only callbackUrl is provided in url parameters', () => {
    expect(
      shouldAllowAuthWithRedirectionFlow(
        [],
        undefined,
        'http://localhost:3002/parseauth'
      )
    ).toEqual(false);
  });

  test('should return false if product specified in url parameters is not supported', () => {
    expect(
      shouldAllowAuthWithRedirectionFlow(
        [],
        'safeXXX',
        'http://localhost:3002/parseauth'
      )
    ).toEqual(false);
  });

  describe('with localhost callbacks allowed', () => {
    beforeAll((next) => {
      Utilities.ProcessEnv.overrideEnv({
        ALCUMUS_PORTAL_ALLOW_LOCAL_REDIRECT: 'true',
      });
      next();
    });

    afterAll((done) => {
      Utilities.ProcessEnv.clearOverrides();
      done();
    });

    test('should allow redirection flow with valid product and localhost callback url with port', () => {
      expect(
        shouldAllowAuthWithRedirectionFlow(
          [],
          'safeSupplier',
          'http://localhost:3002/parseauth'
        )
      ).toEqual(true);
      expect(
        shouldAllowAuthWithRedirectionFlow(
          [],
          'safeContractor',
          'http://localhost:3001/api/auth/login/session'
        )
      ).toEqual(true);
      expect(
        shouldAllowAuthWithRedirectionFlow(
          [],
          'safeContractor',
          'http://localhost:3001/foo'
        )
      ).toEqual(true);
    });

    it('should allow redirection for .local domains', () => {
      expect(
        shouldAllowAuthWithRedirectionFlow(
          [],
          'safeContractor',
          'http://n4.arvid.dev.local:8000/fieldid/logon'
        )
      ).toEqual(true);

      expect(
        shouldAllowAuthWithRedirectionFlow(
          [],
          'safeContractor',
          'http://n4.arvid.dev.local/fieldid/logon'
        )
      ).toEqual(true);

      expect(
        shouldAllowAuthWithRedirectionFlow(
          [],
          'safeContractor',
          'http://n4.arvid.dev.local'
        )
      ).toEqual(true);
    });

    test('should not allow redirection flow with valid product and localhost callback url without port', () => {
      expect(
        shouldAllowAuthWithRedirectionFlow(
          [],
          'safeContractor',
          'http://localhost'
        )
      ).toEqual(false);
      expect(
        shouldAllowAuthWithRedirectionFlow(
          [],
          'safeContractor',
          'http://localhost/foo'
        )
      ).toEqual(false);
    });
  });

  describe('with localhost callbacks not allowed', () => {
    const callbackWhiteList = [
      'https://safe-contractor.dev.ecompliance.dev/api/auth/session',
    ];

    beforeAll((next) => {
      Utilities.ProcessEnv.overrideEnv({
        ALCUMUS_PORTAL_ALLOW_LOCAL_REDIRECT: 'false',
      });
      next();
    });

    afterAll((done) => {
      Utilities.ProcessEnv.clearOverrides();
      done();
    });

    test('should allow redirection flow with strict whitelisted callback host path', () => {
      expect(
        shouldAllowAuthWithRedirectionFlow(
          callbackWhiteList,
          'safeContractor',
          'https://safe-contractor.dev.ecompliance.dev/api/auth/session'
        )
      ).toEqual(true);
    });

    test('should not allow redirection flow with non-whitelisted callback host url', () => {
      expect(
        shouldAllowAuthWithRedirectionFlow(
          callbackWhiteList,
          'safeContractor',
          'https://safe-contractor123.dev.ecompliance.dev/api/auth/session'
        )
      ).toEqual(false);
    });
  });

  describe('with localhost callbacks not allowed and callbacks containing wildcard subdomains', () => {
    const callbackWhiteList = ['https://*.fiddev.com'];

    beforeAll((next) => {
      Utilities.ProcessEnv.overrideEnv({
        ALCUMUS_PORTAL_ALLOW_LOCAL_REDIRECT: 'false',
      });
      next();
    });

    afterAll((done) => {
      Utilities.ProcessEnv.clearOverrides();
      done();
    });

    test('should allow redirection flow with whitelisted callback host url with wildcard subdomain', () => {
      expect(
        shouldAllowAuthWithRedirectionFlow(
          callbackWhiteList,
          'safeContractor',
          'https://tmna.fiddev.com/fieldid/'
        )
      ).toEqual(true);
      expect(
        shouldAllowAuthWithRedirectionFlow(
          callbackWhiteList,
          'safeContractor',
          'https://foo.fiddev.com/fieldid/'
        )
      ).toEqual(true);
    });

    test('should not allow redirection flow with non-whitelisted callback host url with wildcard subdomains', () => {
      expect(
        shouldAllowAuthWithRedirectionFlow(
          callbackWhiteList,
          'safeContractor',
          'https://tmna.fiddev123.com/fieldid/'
        )
      ).toEqual(false);
      expect(
        shouldAllowAuthWithRedirectionFlow(
          callbackWhiteList,
          'safeContractor',
          'https://foo.fiddevsomething.com/fieldid/'
        )
      ).toEqual(false);
    });

    it('should not allow redirection for .local domains', () => {
      expect(
        shouldAllowAuthWithRedirectionFlow(
          [],
          'safeContractor',
          'http://n4.arvid.dev.local:8000/fieldid/logon'
        )
      ).toEqual(false);

      expect(
        shouldAllowAuthWithRedirectionFlow(
          [],
          'safeContractor',
          'http://n4.arvid.dev.local/fieldid/logon'
        )
      ).toEqual(false);

      expect(
        shouldAllowAuthWithRedirectionFlow(
          [],
          'safeContractor',
          'http://n4.arvid.dev.local'
        )
      ).toEqual(false);
    });
  });
});
