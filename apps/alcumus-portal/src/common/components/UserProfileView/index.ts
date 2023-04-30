import { withTranslation } from 'react-i18next';
import UserProfileView from './UserProfileView';
import { connect } from 'react-redux';
import { RootReducerState } from '../../../client/redux/reducers';
import {
  fetchUserProfile,
  resetProfileUpdateStatus,
  updateProfile,
} from '../../../client/redux/actions';

function mapStateToProps({ user }: RootReducerState) {
  return {
    firstName: user?.firstName,
    lastName: user?.lastName,
    isUpdatingProfile: user.isUpdatingProfile,
    errorUpdatingProfile: user.errorUpdatingProfile,
    profileUpdated: user.profileUpdated,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    updateProfile: (firstName?: string, lastName?: string) =>
      dispatch(updateProfile({ firstName, lastName })),
    fetchUserProfile: () => dispatch(fetchUserProfile()),
    resetProfileUpdateStatus: () => dispatch(resetProfileUpdateStatus()),
  };
}
const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileView);
export default withTranslation('UserProfileView')(connectedComponent);
