import { connect } from 'react-redux';
import { MessageReducerStateType } from '../../../client/redux/reducers/message-reducer';
import CompanyDetails from './CompanyDetails';
import { AddressRequest } from '../../types';
import {
  findAddressLookup,
  postAddressLookup,
} from '../../../client/redux/actions';

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
    findAddressLookup: (code: string) => dispatch(findAddressLookup(code)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyDetails);
