import { Constants } from '@alcumus/core';
import { connect } from 'react-redux';
import store from 'store';
import { RootReducerState } from '../../../client/redux/reducers';
import AppLauncher from './AppLauncher';

function mapStateToProps({ products }: RootReducerState) {
  const keys = Constants.LocalStorageKeys;
  return {
    accessToken: store.get(keys.AccessToken),
    accessTokenExpiry: Number(store.get(keys.AccessTokenExpiry)),
    refreshToken: store.get(keys.RefreshToken),
    products: products.products,
  };
}

export default connect(mapStateToProps)(AppLauncher);
