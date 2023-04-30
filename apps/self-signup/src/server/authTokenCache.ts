const DEFAULT_EXPIRY = 1000 * 60 * 10;

interface AuthTokenResponse {
  accessToken: string;
  expiresIn: number;
  expires: string;
  issued: string;
  tokenType: string;
}

export class AuthTokenCache {
  private static _instance: AuthTokenCache;

  public static getInstance(): AuthTokenCache {
    if (!AuthTokenCache._instance) {
      AuthTokenCache._instance = new AuthTokenCache();
    }

    return AuthTokenCache._instance;
  }

  private authTokenResponse?: AuthTokenResponse;
  private timeoutId;

  public setAuthTokenResponse(
    authTokenResponse: AuthTokenResponse,
    expiresIn: number = DEFAULT_EXPIRY
  ) {
    clearTimeout(this.timeoutId);
    this.authTokenResponse = authTokenResponse;
    this.timeoutId = setTimeout(
      () => (this.authTokenResponse = undefined),
      expiresIn
    );
  }

  public getAuthTokenResponse(): AuthTokenResponse | undefined {
    return this.authTokenResponse;
  }
}
