import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import VerifyAccountPage from './VerifyAccountPage';
import {
  RegisterFormData,
  RegisterReducerStateType,
} from '../../../client/redux/reducers/register-reducer';

function mapStateToProps({ register }: { register: RegisterReducerStateType }) {
  return {
    form: register.form as RegisterFormData,
  };
}

export default withTranslation('verifyAccount')(
  connect(mapStateToProps, null)(VerifyAccountPage)
);
