import { combineReducers } from 'redux';
import reviewReducer, { IReviewReducerState } from './reviewReducer';
import { Plan } from '../../../types/plans';
import confirmationReducer, {
  IConfirmationReducerState,
} from './confirmationReducer';

export interface IReduxRootState {
  plans: Plan[];
  review: IReviewReducerState;
  confirmation: IConfirmationReducerState;
}

export interface TypeAndPayload<PayloadType> {
  type?: string;
  payload?: PayloadType;
}

export default combineReducers({
  plans: (state = []) => state,
  review: reviewReducer,
  confirmation: confirmationReducer,
});
