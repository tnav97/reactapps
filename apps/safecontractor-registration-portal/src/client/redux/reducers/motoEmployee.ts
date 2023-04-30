import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface MotoEmployeeReducerStateType {
  selected?: number;
  selectedValue?: string;
}

export const defaultState: MotoEmployeeReducerStateType = {
  selected: undefined,
  selectedValue: undefined,
};

export default function motoEmployeeReducer(
  state: MotoEmployeeReducerStateType = defaultState,
  action: TypeAndPayload<MotoEmployeeReducerStateType> = { type: undefined }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.MotoEmployee.employee:
      return {
        ...state,
        selected: action.payload?.selected,
        selectedValue: payload?.selectedValue,
      };
    default:
      return state;
  }
}
