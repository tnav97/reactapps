import { connect } from 'react-redux';
import { RootReducerState } from '../../../client/redux/reducers';
import HomePageRecommendedApps from './HomePageRecommendedApps';

function mapStateToProps({ currentOrganization, user }: RootReducerState) {
  return {
    memberId: (user.organizations || []).find(
      (organization) =>
        organization.organizationId ===
        currentOrganization.currentOrganization?.id
    )?.id,
  };
}

export default connect(mapStateToProps)(HomePageRecommendedApps);
