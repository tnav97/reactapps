import { connect } from 'react-redux';
import OrganizationSubscriptions from './OrganizationSubscriptions';
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

export default connect(mapStateToProps)(OrganizationSubscriptions);
