import { connect } from 'react-redux';

import { withTranslation } from 'react-i18next';
import { MotoDoesCustomerRequireSupportForAssessment } from './MotoDoesCustomerRequireSupportForAssessment';

export default connect()(
  withTranslation('DoesCustomerRequireSupportForAssessment')(
    MotoDoesCustomerRequireSupportForAssessment
  )
);
