import { connect } from 'react-redux';
import { loginWithEmailAndPassword } from '../../../client/redux/actions';
import { RootReducerState } from '../../../client/redux/reducers';
import hasAuthTokens from '../../../lib/utils/hasAuthTokens';
import LoginForm from './LoginForm';

function mapStateToProps({ auth, features }: RootReducerState) {
  return {
    isLoggingIn: auth.isLoggingIn,
    error: auth.loginError,
    isLoggedIn: hasAuthTokens(),
    disablePortalFeatures: features.disablePortalFeatures,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loginWithEmailAndPassword: (
      email: string,
      password: string,
      organizationIdentifier?: string
    ) =>
      dispatch(
        loginWithEmailAndPassword(email, password, organizationIdentifier)
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
