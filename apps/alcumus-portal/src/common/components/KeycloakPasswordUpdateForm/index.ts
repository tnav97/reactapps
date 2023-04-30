import { connect } from 'react-redux';
import {
  resetPasswordUpdateStatus,
  updatePassword,
} from '../../../client/redux/actions';
import { UserReducerState } from '../../../client/redux/reducers/user';
import KeycloakPasswordUpdateForm from './KeycloakPasswordUpdateForm';

function mapStateToProps({ user }: { user: UserReducerState }) {
  return {
    isUpdatingPassword: user.isUpdatingPassword,
    errorUpdatingPassword: user.errorUpdatingPassword,
    passwordUpdated: user.passwordUpdated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updatePassword: (oldPassword: string, newPassword: string) =>
      dispatch(updatePassword(newPassword, oldPassword)),
    resetPasswordUpdateStatus: () => dispatch(resetPasswordUpdateStatus()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeycloakPasswordUpdateForm);
