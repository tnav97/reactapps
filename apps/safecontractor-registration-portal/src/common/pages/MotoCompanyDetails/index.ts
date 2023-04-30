import { connect } from 'react-redux';
import { MessageReducerStateType } from '../../../client/redux/reducers/message-reducer';
import { AddressRequest } from '../../types';
import { postAddressLookup } from '../../../client/redux/actions';
import MotoCompanyDetails from './MotoCompanyDetails';

function mapStateToProps({ message }: { message: MessageReducerStateType }) {
  return {
    isFetching: message.isFetching,
    error: message.error,
    messageFromApi: message.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postAddressLookup: (request: AddressRequest) =>
      dispatch(postAddressLookup(request)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MotoCompanyDetails);
