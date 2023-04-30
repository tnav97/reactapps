import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Actions } from '../../../client/redux/actions';
import {
  RegisterFormData,
  RegisterReducerStateType,
} from '../../../client/redux/reducers/register-reducer';
import Questionnaire, { QuestionnaireVariant } from './Questionnaire';

function mapStateToProps({
  register: state,
  splitTreatments,
}: {
  register: RegisterReducerStateType;
  splitTreatments: Record<string, string>;
}) {
  return {
    form: state.form || {},
    variant:
      splitTreatments['self-signup-questionnaire'] === 'sentence-builder'
        ? QuestionnaireVariant.SENTENCE_BUILDER
        : QuestionnaireVariant.WIZARD,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setForm: (form: RegisterFormData) =>
      dispatch({
        type: Actions.QuestionnaireSetData,
        payload: form,
      }),
  };
}

export default withTranslation('questionnaire')(
  connect(mapStateToProps, mapDispatchToProps)(Questionnaire)
);
