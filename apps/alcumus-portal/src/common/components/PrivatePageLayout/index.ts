import { connect } from 'react-redux';
import { fetchUserProfile, refreshTokens } from '../../../client/redux/actions';
import { RootReducerState } from '../../../client/redux/reducers';
import PrivatePageLayout from './PrivatePageLayout';

function mapStateToProps({
  user,
  features,
  currentOrganization,
  auth,
}: RootReducerState) {
  return {
    user,
    isFetchingUserProfile: user.isFetching,
    error: user.error,
    useAzureAd: features.useAzureAd,
    isLoggedIn: !auth.loggedOut,
    currentOrganization: currentOrganization.currentOrganization,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUserProfile: () => dispatch(fetchUserProfile()),
    refreshTokens: (refreshToken: string) =>
      dispatch(refreshTokens(refreshToken)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivatePageLayout);
