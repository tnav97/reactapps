import { connect } from 'react-redux';
import { fetchUserProfile } from '../../../../../client/redux/actions';
import { RootReducerState } from '../../../../../client/redux/reducers';
import HomePage from './HomePage';

// export { default } from './HomePage';
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
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
