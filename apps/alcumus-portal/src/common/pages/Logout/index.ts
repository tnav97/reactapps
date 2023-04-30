import { connect } from 'react-redux';
import { logoutUser } from '../../../client/redux/actions';
import hasAuthTokens from '../../../lib/utils/hasAuthTokens';
import LogoutPage from './LogoutPage';

function mapStateToProps() {
  return {
    isLoggedIn: hasAuthTokens(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    attemptLogout: () => dispatch(logoutUser()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
