import Axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import {
  getECMSApiUrl,
  getECMSCSCredentials,
} from '../../lib/utils/getECMSApiUrl';
import { AuthTokenCache } from '../authTokenCache';

interface AuthTokenResponse {
  accessToken: string;
  expiresIn: number;
  expires: string;
  issued: string;
  tokenType: string;
}

export default async function retrieveAuthToken(): Promise<AuthTokenResponse> {
  const authTokenResponse = AuthTokenCache.getInstance().getAuthTokenResponse();
  if (authTokenResponse) {
    return authTokenResponse;
  }

  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    responseType: 'json',
  };

  const { username, password } = await getECMSCSCredentials();
  const {
    data: { access_token, token_type, expires_in, issued, expires },
  } = await Axios.post(
    getECMSApiUrl('/token'),
    qs.stringify({
      userName: username,
      password: password,
      grant_type: 'password',
    }),
    config
  );
  const newAuthTokenResponse: AuthTokenResponse = {
    /* eslint-disable camelcase */
    accessToken: access_token,
    tokenType: token_type,
    expiresIn: expires_in,
    /* eslint-enable camelcase */
    issued,
    expires,
  };
  AuthTokenCache.getInstance().setAuthTokenResponse(newAuthTokenResponse);
  return newAuthTokenResponse;
}
