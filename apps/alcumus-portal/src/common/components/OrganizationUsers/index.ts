import { connect } from 'react-redux';
import OrganizationUsers from './OrganizationUsers';
import { RootReducerState } from '../../../client/redux/reducers';
import { withTranslation } from 'react-i18next';

function mapStateToProps({ currentOrganization }: RootReducerState) {
  return {
    organizationId: currentOrganization.currentOrganization?.id,
  };
}

export default connect(mapStateToProps)(
  withTranslation(['organizationUsers', 'statusDisplay'])(OrganizationUsers)
);
