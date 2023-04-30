import { connect } from 'react-redux';
import { fetchUserProfile, fetchUserRole } from '../../../client/redux/actions';
import { RootReducerState } from '../../../client/redux/reducers';
import HomePageContent from './HomePageContent';

function mapStateToProps({ user }: RootReducerState) {
  const { firstName, lastName, email, username } = user;
  return {
    user: {
      firstName,
      lastName,
      email,
      username,
    },
    isFetchingUserProfile: user.isFetching,
    error: user.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUserProfile: () => dispatch(fetchUserProfile()),
    fetchUserRole: () => dispatch(fetchUserRole()),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePageContent);
