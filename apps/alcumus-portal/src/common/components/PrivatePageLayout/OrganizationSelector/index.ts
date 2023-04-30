import { connect } from 'react-redux';
import { RootReducerState } from '../../../../client/redux/reducers';
import { OrganizationSelector } from './OrganizationSelector';

function mapStateToProps({ currentOrganization, user }: RootReducerState) {
  return {
    user: user,
    currentOrganization: currentOrganization.currentOrganization,
  };
}

export default connect(mapStateToProps)(OrganizationSelector);
