import { connect } from 'react-redux';
import { MessageReducerStateType } from '../../../client/redux/reducers/message-reducer';
import { validateReferralCode } from '../../../client/redux/actions';
import MotoReferralCodePage from './MotoReferralCode';

function mapStateToProps({ message }: { message: MessageReducerStateType }) {
  return {
    isFetching: message.isFetching,
    error: message.error,
    messageFromApi: message.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    validateReferralCode: (code: string) =>
      dispatch(validateReferralCode(code)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MotoReferralCodePage);
