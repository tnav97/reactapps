import store from 'store';
import { Constants } from '@alcumus/core';

export default function hasAuthTokens() {
  return Boolean(
    store.get(Constants.LocalStorageKeys.AccessToken) &&
      store.get(Constants.LocalStorageKeys.AccessTokenExpiry) &&
      store.get(Constants.LocalStorageKeys.RefreshToken)
  );
}
