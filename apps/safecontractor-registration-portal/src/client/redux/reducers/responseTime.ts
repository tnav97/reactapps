import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface ResponseTimeReducerStateType {
  selected?: number;
  selectedValue?: string;
}

export const defaultState: ResponseTimeReducerStateType = {
  selected: undefined,
  selectedValue: undefined,
};

export default function responseTimeReducer(
  state: ResponseTimeReducerStateType = defaultState,
  action: TypeAndPayload<ResponseTimeReducerStateType> = { type: undefined }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.ResponseTime.responseTime:
      return {
        ...state,
        selected: payload?.selected,
        selectedValue: payload?.selectedValue,
      };
    default:
      return state;
  }
}
