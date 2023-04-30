import { connect } from 'react-redux';
import { getTokens } from '../../../client/redux/actions';
import { RootReducerState } from '../../../client/redux/reducers';
import hasAuthTokens from '../../../lib/utils/hasAuthTokens';
import AuthorizeSession from './AuthorizeSession';

function mapStateToProps({ auth }: RootReducerState) {
  return {
    isStartingSession: auth.isLoggingIn,
    error: auth.loginError,
    isLoggedIn: hasAuthTokens() && auth.loginSuccess,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getTokens: (code: string, clientInfo: string) =>
      dispatch(getTokens(code, clientInfo)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizeSession);
