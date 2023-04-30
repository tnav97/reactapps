import { connect } from 'react-redux';
import { RootReducerState } from '../../../client/redux/reducers';
import hasAuthTokens from '../../../lib/utils/hasAuthTokens';
import PrivateRoute from './PrivateRoute';

function mapStateToProps({
  features,
  authorization: { loggedInUserRole },
}: RootReducerState) {
  return {
    loggedOut: !hasAuthTokens(),
    useAzureAd: features.useAzureAd,
    loggedInUserRole: loggedInUserRole,
  };
}

export default connect(mapStateToProps)(PrivateRoute);
