import { connect } from 'react-redux';
import store from 'store';
import AccountDetailsSection from './AccountDetailsSection';
import { Constants } from '@alcumus/core';
import parseJwt from '../../../lib/utils/parseJwt';
import { RootReducerState } from '../../../client/redux/reducers';
import {
  logoutUser,
  resetPasswordUpdateStatus,
  resetUserEmailUpdateStatus,
  updatePassword,
  updateUserEmail,
} from '../../../client/redux/actions';
import { withTranslation } from 'react-i18next';

function mapStateToProps({ user }: RootReducerState) {
  const decodedAccessToken = parseJwt(
    store.get(Constants.LocalStorageKeys.AccessToken)
  );
  return {
    email: decodedAccessToken.email as string,
    isUpdatingPassword: user.isUpdatingPassword,
    errorUpdatingPassword: user.errorUpdatingPassword,
    passwordUpdated: user.passwordUpdated,
    isUpdatingEmail: user.isUpdatingEmail,
    errorUpdatingEmail: user.errorUpdatingEmail,
    emailUpdated: user.emailUpdated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updatePassword: (newPassword: string) =>
      dispatch(updatePassword(newPassword)),
    resetPasswordUpdateStatus: () => dispatch(resetPasswordUpdateStatus()),
    updateEmail: (newEmail: string) => dispatch(updateUserEmail(newEmail)),
    resetEmailUpdateStatus: () => dispatch(resetUserEmailUpdateStatus()),
    logoutUser: () => dispatch(logoutUser()),
  };
}

export default withTranslation('AccountDetailsSection')(
  connect(mapStateToProps, mapDispatchToProps)(AccountDetailsSection)
);
