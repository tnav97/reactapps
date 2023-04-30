import store from 'store';
import { Constants } from '@alcumus/core';
import { LoginResponsePayload } from '../../client/redux/reducers/auth';

export default function updateTokensInLocalStorage(
  loginResponse: LoginResponsePayload
) {
  store.set(Constants.LocalStorageKeys.AccessToken, loginResponse.accessToken);
  store.set(
    Constants.LocalStorageKeys.RefreshToken,
    loginResponse.refreshToken
  );
  store.set(
    Constants.LocalStorageKeys.AccessTokenExpiry,
    loginResponse.expiresIn
  );
}
