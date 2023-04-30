import { connect } from 'react-redux';
import { basketCode } from '../../../client/redux/actions';

import { MessageReducerStateType } from '../../../client/redux/reducers/message-reducer';
import { BasketRequest } from '../../types';
import SidePanel from './SidePanel';

function mapStateToProps({ message }: { message: MessageReducerStateType }) {
  return {
    isFetching: message.isFetching,
    error: message.error,
    messageFromApi: message.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    basketCode: (request: BasketRequest) => dispatch(basketCode(request)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
