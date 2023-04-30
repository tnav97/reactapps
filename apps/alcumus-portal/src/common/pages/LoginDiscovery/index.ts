import { connect } from 'react-redux';
import { RootReducerState } from '../../../client/redux/reducers';
import hasAuthTokens from '../../../lib/utils/hasAuthTokens';
import { LoginDiscoveryPage } from './LoginDiscoveryPage';
import { fetchOauthUrl } from '../../../client/redux/actions/authentication';

function mapStateToProps({ auth, features }: RootReducerState) {
  return {
    useAzureAd: features.useAzureAd || false,
    authUrl: auth.authUrl,
    isLoggedIn: hasAuthTokens(),
    rememberMyDomain: auth.rememberMyDomain || false,
    authUrlError: auth.authUrlError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchOauthUrl: ({ domain }: { domain?: string }) =>
      dispatch(fetchOauthUrl({ domain })),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginDiscoveryPage);
