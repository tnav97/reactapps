import { connect } from 'react-redux';
import { MessageReducerStateType } from '../../../client/redux/reducers/message-reducer';
import { getMessageFromApi } from '../../../client/redux/actions';
import Message from './Message';

function mapStateToProps({ message }: { message: MessageReducerStateType }) {
  return {
    isFetching: message.isFetching,
    error: message.error,
    messageFromApi: message.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getApiMessage: () => dispatch(getMessageFromApi()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);
