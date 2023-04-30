import SsipRegistration from './SsipRegistration';
import { connect } from 'react-redux';
import { MessageReducerStateType } from '../../../client/redux/reducers/message-reducer';
import { getSsipData } from '../../../client/redux/actions';

function mapStateToProps({ message }: { message: MessageReducerStateType }) {
  return {
    isFetching: message.isFetching,
    error: message.error,
    messageFromApi: message.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSsipData: () => dispatch(getSsipData()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SsipRegistration);
