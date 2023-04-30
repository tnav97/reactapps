import { connect } from 'react-redux';
import { RootReducerState } from '../../../client/redux/reducers';
import HomePageAllApps from './HomePageAllApps';

function mapStateToProps({ user, currentOrganization }: RootReducerState) {
  return {
    user,
    tenantName: currentOrganization.currentOrganization?.tenantName,
  };
}

export default connect(mapStateToProps)(HomePageAllApps);
