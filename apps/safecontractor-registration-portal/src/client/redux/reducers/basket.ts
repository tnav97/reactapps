import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface BasketReducerStateType {
  total?: number;
  discountCode?: string;
  basketApiSuccess?: boolean;
}

export const defaultState: BasketReducerStateType = {
  total: undefined,
  discountCode: undefined,
  basketApiSuccess: undefined,
};

export default function BasketReducer(
  state: BasketReducerStateType = defaultState,
  action: TypeAndPayload<BasketReducerStateType> = { type: undefined }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.BasketDetails.basketDetails:
      return {
        ...state,
        total: payload?.total,
        discountCode: payload?.discountCode,
        basketApiSuccess: payload?.basketApiSuccess,
      };
    default:
      return state;
  }
}
