import { connect } from 'react-redux';
import {
  register,
  updateRegistrationPayment,
} from '../../../client/redux/actions';
import { MessageReducerStateType } from '../../../client/redux/reducers/message-reducer';
import { UpdateRegistrationPaymentRequest } from '../../../server/models/updateRegistrationPayment';
import { RegisterRequest } from '../../types';
import MotoPaymentDetailsPage from './MotoPaymentDetails';

function mapStateToProps({ message }: { message: MessageReducerStateType }) {
  return {
    isFetching: message.isFetching,
    error: message.error,
    messageFromApi: message.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    register: (request: RegisterRequest) => dispatch(register(request)),
    updateRegistrationPayment: (request: UpdateRegistrationPaymentRequest) =>
      dispatch(updateRegistrationPayment(request)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MotoPaymentDetailsPage);
