import { connect } from 'react-redux';
import { RootReducerState } from '../../../client/redux/reducers';
import hasAuthTokens from '../../../lib/utils/hasAuthTokens';
import SignupPage from './SignupPage';

function mapStateToProps({ features }: RootReducerState) {
  return {
    useAzureAd: features.useAzureAd || false,
    isRegistered: hasAuthTokens(),
  };
}

export default connect(mapStateToProps)(SignupPage);
