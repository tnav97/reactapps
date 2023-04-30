import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface MotoResponseTimeReducerStateType {
  selected?: number;
  selectedValue?: string;
}

export const defaultState: MotoResponseTimeReducerStateType = {
  selected: undefined,
  selectedValue: undefined,
};

export default function motoResponseTimeReducer(
  state: MotoResponseTimeReducerStateType = defaultState,
  action: TypeAndPayload<MotoResponseTimeReducerStateType> = { type: undefined }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.MotoResponseTime.responseTime:
      return {
        ...state,
        selected: payload?.selected,
        selectedValue: payload?.selectedValue,
      };
    default:
      return state;
  }
}
