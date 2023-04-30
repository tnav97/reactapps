import { connect } from 'react-redux';
import {
  fetchUserProfile,
  resetProfileUpdateStatus,
  updateProfile,
} from '../../../client/redux/actions';
import { UserReducerState } from '../../../client/redux/reducers/user';
import UserProfileSection from './UserProfileSection';

function mapStateToProps({ user }: { user: UserReducerState }) {
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

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileSection);
