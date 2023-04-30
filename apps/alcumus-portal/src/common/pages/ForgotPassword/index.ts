import { connect } from 'react-redux';
import {
  allowResendingPassword,
  submitForgotPasswordRequest,
} from '../../../client/redux/actions';
import { AuthReducerState } from '../../../client/redux/reducers/auth';
import ForgotPasswordPage from './ForgotPasswordPage';

function mapStateToProps({ auth }: { auth: AuthReducerState }) {
  return {
    isSending: auth.isSubmittingForgotPasswordRequest,
    passwordRecoveryLinkSent: auth.passwordRecoveryLinkSent,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    sendForgotPasswordRequest: (email: string) =>
      dispatch(submitForgotPasswordRequest(email)),
    allowResendingPassword: () => dispatch(allowResendingPassword()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage);
