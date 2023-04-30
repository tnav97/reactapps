import { connect } from 'react-redux';
import { register } from '../../../client/redux/actions';
import { AuthReducerState } from '../../../client/redux/reducers/auth';
import CreateAccountForm from './CreateAccountForm';

function mapStateToProps({ auth }: { auth: AuthReducerState }) {
  return {
    isRegistering: auth.isRegistering,
    error: auth.registrationError,
    registered: auth.registered,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    register: (newUserProfile) => dispatch(register(newUserProfile)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateAccountForm);
