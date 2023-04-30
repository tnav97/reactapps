import { connect } from 'react-redux';
import {
  resetPasswordUpdateStatus,
  updatePassword,
} from '../../../client/redux/actions';
import { UserReducerState } from '../../../client/redux/reducers/user';
import UpdatePasswordForm from './UpdatePasswordForm';

function mapStateToProps({ user }: { user: UserReducerState }) {
  return {
    isUpdatingPassword: user.isUpdatingPassword,
    errorUpdatingPassword: user.errorUpdatingPassword,
    passwordUpdated: user.passwordUpdated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updatePassword: (newPassword: string) =>
      dispatch(updatePassword(newPassword)),
    resetPasswordUpdateStatus: () => dispatch(resetPasswordUpdateStatus()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePasswordForm);
