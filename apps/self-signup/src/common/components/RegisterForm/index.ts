import { connect } from 'react-redux';
import { Actions } from '../../../client/redux/actions';
import RegisterForm from './RegisterForm';
import { RegisterFormVariant } from '../../types/registerForm';
import {
  RegisterFormData,
  RegisterReducerStateType,
} from '../../../client/redux/reducers/register-reducer';
import { withTranslation } from 'react-i18next';
import { SINGLE_PAGE } from '../../constants/treatments';

function mapStateToProps({
  register: state,
  splitTreatments,
}: {
  register: RegisterReducerStateType;
  splitTreatments: Record<string, string>;
}) {
  return {
    form: state.form,
    variant:
      splitTreatments['self-signup-register-form'] === SINGLE_PAGE
        ? RegisterFormVariant.SINGLE_PAGE
        : RegisterFormVariant.MULTIPLE_PAGES,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setForm: (form: RegisterFormData) =>
      dispatch({
        type: Actions.RegisterSetData,
        payload: form,
      }),
  };
}

export default withTranslation('register')(
  connect(mapStateToProps, mapDispatchToProps)(RegisterForm)
);
