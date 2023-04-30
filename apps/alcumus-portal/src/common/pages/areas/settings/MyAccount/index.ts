import { connect } from 'react-redux';
import { RootReducerState } from '../../../../../client/redux/reducers';
import ProfilePage from './MyAccount';
import { withTranslation } from 'react-i18next';

function mapStateToProps({ features }: RootReducerState) {
  return {
    useAzureAd: features.useAzureAd || false,
  };
}

export default withTranslation('MyAccountUserArea')(
  connect(mapStateToProps)(ProfilePage)
);
