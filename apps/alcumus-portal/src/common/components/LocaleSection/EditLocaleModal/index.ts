import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { UserProfile } from '../../../types';
import { EditLocaleModal } from './EditLocaleModal';
import { UserReducerState } from '../../../../client/redux/reducers/user';
import {
  fetchUserProfile,
  resetProfileUpdateStatus,
  updateProfile,
} from '../../../../client/redux/actions';

function mapStateToProps({ user }: { user: UserReducerState }) {
  return {
    location: user?.location,
    locale: user?.locale,
    timezone: user?.timezone,
    isUpdatingProfile: user.isUpdatingProfile,
    errorUpdatingProfile: user.errorUpdatingProfile,
    profileUpdated: user.profileUpdated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateProfile: ({ location, locale, timezone }: Partial<UserProfile>) =>
      dispatch(updateProfile({ location, locale, timezone })),
    fetchUserProfile: () => dispatch(fetchUserProfile()),
    resetProfileUpdateStatus: () => dispatch(resetProfileUpdateStatus()),
  };
}

export default withTranslation('MyAccount')(
  connect(mapStateToProps, mapDispatchToProps)(EditLocaleModal)
);
