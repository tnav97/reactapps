import { connect } from 'react-redux';
import { MessageReducerStateType } from '../../../client/redux/reducers/message-reducer';
import ChoosePlanPage from './ChoosePlan';
import { ChoosePlanRequest } from '../../types';
import { choosePlan } from '../../../client/redux/actions';

function mapStateToProps({ message }: { message: MessageReducerStateType }) {
  return {
    isFetching: message.isFetching,
    error: message.error,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    choosePlan: (request: ChoosePlanRequest) => dispatch(choosePlan(request)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePlanPage);
