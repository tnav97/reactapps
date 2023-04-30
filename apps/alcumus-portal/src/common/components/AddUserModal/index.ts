import { connect } from 'react-redux';
import { RootReducerState } from '../../../client/redux/reducers';
import { AddUserModal } from './AddUserModal';
import { withTranslation } from 'react-i18next';

function mapStateToProps({
  currentOrganization: { currentOrganization },
  authorization: { roles, loggedInUserRole },
}: RootReducerState) {
  return {
    organizationId: currentOrganization?.id,
    roles,
    loggedInUserRole: loggedInUserRole,
  };
}

export default connect(mapStateToProps)(
  withTranslation('AddUserModal')(AddUserModal)
);
