import { TypeAndPayload } from './index';
import { Plan } from '../../../types/plans';
import { Actions } from '../actions';
import { BillingFrequency } from '../../../types/billingFrequency';

export interface IReviewReducerState {
  plan: Plan;
  seats: number;
  minSeats: number;
  billingFrequency: BillingFrequency;
  accountHolderName: string;
  accountHolderEmail: string;
}

export default function reviewReducer(
  state = {},
  action: TypeAndPayload<IReviewReducerState | Plan | number | BillingFrequency>
) {
  switch (action.type) {
    case Actions.Review.Set:
      return {
        ...state,
        ...(action.payload as IReviewReducerState),
      };

    case Actions.Review.Update.Plan:
      return {
        ...state,
        plan: action.payload,
      };

    case Actions.Review.Update.Seats:
      return {
        ...state,
        seats: action.payload,
      };

    case Actions.Review.Update.BillingFrequency:
      return {
        ...state,
        billingFrequency: action.payload,
      };
    default:
      return state;
  }
}
