import { connect } from 'react-redux';
import { DoesCustomerRequireSupportForAssessment } from './DoesCustomerRequireSupportForAssessment';
import { withTranslation } from 'react-i18next';

export default connect()(
  withTranslation('DoesCustomerRequireSupportForAssessment')(
    DoesCustomerRequireSupportForAssessment
  )
);
