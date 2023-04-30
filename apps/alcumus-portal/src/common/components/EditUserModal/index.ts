import { connect } from 'react-redux';
import { RootReducerState } from '../../../client/redux/reducers';
import { EditUserModal } from './EditUserModal';
import { withTranslation } from 'react-i18next';

function mapStateToProps({
  authorization: { roles, loggedInUserRole },
}: RootReducerState) {
  return {
    roles,
    loggedInUserRole: loggedInUserRole,
  };
}

export default connect(mapStateToProps)(
  withTranslation('EditUserModal')(EditUserModal)
);
