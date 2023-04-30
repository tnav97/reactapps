import { connect } from 'react-redux';
import Welcome from './Welcome';
import { RegisterReducerStateType } from '../../../client/redux/reducers/register-reducer';
import { withTranslation } from 'react-i18next';

function mapStateToProps({ register }: { register: RegisterReducerStateType }) {
  return {
    firstName: register.form?.firstName,
    lastName: register.form?.lastName,
  };
}

export default withTranslation('welcome')(
  connect(mapStateToProps, null)(Welcome)
);
