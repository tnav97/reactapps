import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface BasketReducerStateType {
  total?: number;
  discountCode?: string;
}

export const defaultState: BasketReducerStateType = {
  total: undefined,
  discountCode: undefined,
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
      };
    default:
      return state;
  }
}
