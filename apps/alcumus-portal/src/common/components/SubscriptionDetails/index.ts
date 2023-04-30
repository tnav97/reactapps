import { SubscriptionDetails } from './SubscriptionDetails';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { RootReducerState } from '../../../client/redux/reducers';

function mapStateToProps({
  currentOrganization,
  authorization: { loggedInUserRole },
}: RootReducerState) {
  return {
    organizationId: currentOrganization.currentOrganization?.id,
    loggedInUserRole: loggedInUserRole,
  };
}

export default withTranslation('subscriptionDetails')(
  connect(mapStateToProps)(SubscriptionDetails)
);
