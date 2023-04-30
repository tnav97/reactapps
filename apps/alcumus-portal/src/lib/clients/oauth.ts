import { Utilities } from '@alcumus/core';
import qs from 'querystring';

export interface OauthTokenResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: 'Bearer';
  expiresIn: number;
  expiresAt: number;
}

/* eslint-disable camelcase */
export interface DecodedOauthAccessTokenInfo {
  header: {
    typ: string;
    alg: string;
    kid: string;
  };
  payload: {
    iss: string;
    exp: number;
    nbf: number;
    aud: string;
    email: string;
    sub: string;
    given_name: string;
    family_name: string;
    tfp: string;
    nonce: string;
    azp: string;
    ver: string;
    iat: number;
  };
  signature: string;
}
/* eslint-enable camelcase */

export interface OauthUserInfo {
  userId: string;
  firstName: string;
  lastName: string;
}

export type AuthenticationState =
  | 'login'
  | 'logout'
  | 'password_reset'
  | 'update_profile';

export default class OauthClient {
  apiKey: string;

  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async getLoginEndpoint(organizationIdentifier?: string): Promise<string> {
    try {
      const { data: endpointUrl } = await Utilities.sendAxiosGetRequest(
        Utilities.getApiUrl(
          `/auth/api/v1/oauth/url?${qs.stringify({
            prompt: 'login',
            ...(organizationIdentifier &&
              organizationIdentifier !== 'none' && { organizationIdentifier }),
          })}`
        ),
        {
          'x-api-key': this.apiKey,
        }
      );
      return endpointUrl;
    } catch (err: any) {
      console.error(err.response?.data?.message || err.message, err.stack);
      throw err;
    }
  }

  async exchangeCodeForTokens(
    code: string,
    clientInfo: string,
    state?: AuthenticationState
  ): Promise<OauthTokenResponse> {
    try {
      const requestBody = {
        code,
        state: state as AuthenticationState | 'login',
        clientInfo,
      };

      const { data: tokenResponse }: { data: OauthTokenResponse } =
        await Utilities.sendAxiosPostRequest(
          Utilities.getApiUrl('/auth/api/v1/oauth/authorize'),
          requestBody,
          {
            'x-api-key': this.apiKey,
          }
        );

      return tokenResponse;
    } catch (err: any) {
      console.error(err.response?.data?.message || err.message, err.stack);
      throw err;
    }
  }
}
