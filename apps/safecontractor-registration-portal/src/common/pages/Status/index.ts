import { connect } from 'react-redux';
import { MessageReducerStateType } from '../../../client/redux/reducers/message-reducer';
import { validateStatusHealth } from '../../../client/redux/actions';
import Status from './Status';

function mapStateToProps({ message }: { message: MessageReducerStateType }) {
  return {
    isFetching: message.isFetching,
    error: message.error,
    messageFromApi: message.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    validateStatusHealth: () => dispatch(validateStatusHealth()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Status);
