import store from 'store';
import { Constants } from '@alcumus/core';

export default function removeTokensFromLocalStorage() {
  store.remove(Constants.LocalStorageKeys.AccessToken);
  store.remove(Constants.LocalStorageKeys.AccessTokenExpiry);
  store.remove(Constants.LocalStorageKeys.RefreshToken);
}
