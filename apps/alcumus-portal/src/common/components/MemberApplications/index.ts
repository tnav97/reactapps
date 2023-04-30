import { connect } from 'react-redux';
import { RootReducerState } from '../../../client/redux/reducers';
import { MemberApplications } from './MemberApplications';
import { withTranslation } from 'react-i18next';
function mapStateToProps({
  currentOrganization: { currentOrganization },
}: RootReducerState) {
  return {
    organizationId: currentOrganization?.id,
  };
}

export default connect(mapStateToProps)(
  withTranslation('MemberApplications')(MemberApplications)
);
