import { AuthTokenCache } from './authTokenCache';

describe('Auth Token Cache', () => {
  test('it caches token response', () => {
    const instance = AuthTokenCache.getInstance();

    const response = {
      accessToken: 'token',
      tokenType: 'token_type',
      expires: '',
      issued: '',
      expiresIn: 1000,
    };

    instance.setAuthTokenResponse(response);

    expect(instance.getAuthTokenResponse()).toBe(response);
    // Try with a new instance
    expect(AuthTokenCache.getInstance().getAuthTokenResponse()).toBe(response);

    const response2 = {
      accessToken: 'token2',
      tokenType: 'token_type',
      expires: '',
      issued: '',
      expiresIn: 1000,
    };

    instance.setAuthTokenResponse(response2);
    // Try with a new instance
    expect(AuthTokenCache.getInstance().getAuthTokenResponse()).toBe(response2);
  });

  test('cache expires after given time', () => {
    jest.useFakeTimers();

    const instance = AuthTokenCache.getInstance();

    const response = {
      accessToken: 'token',
      tokenType: 'token_type',
      expires: '',
      issued: '',
      expiresIn: 1000,
    };

    instance.setAuthTokenResponse(response);
    expect(instance.getAuthTokenResponse()).toBe(response);

    jest.runAllTimers();

    // The cache is reset
    expect(instance.getAuthTokenResponse()).toBeUndefined();

    instance.setAuthTokenResponse(response);
    expect(instance.getAuthTokenResponse()).toBe(response);
  });
});
