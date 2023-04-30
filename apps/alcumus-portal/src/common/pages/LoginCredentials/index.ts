import { connect } from 'react-redux';
import { RootReducerState } from '../../../client/redux/reducers';
import hasAuthTokens from '../../../lib/utils/hasAuthTokens';
import LoginPage, { LoginPageProps } from './LoginPage';

function mapStateToProps({ auth, features }: RootReducerState): LoginPageProps {
  return {
    useAzureAd: features.useAzureAd || false,
    authUrl: auth.authUrl,
    isLoggedIn: hasAuthTokens(),
  };
}

export default connect(mapStateToProps)(LoginPage);
