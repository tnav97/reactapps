import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface EmployeeReducerStateType {
  selected?: number;
  selectedValue?: string;
}

export const defaultState: EmployeeReducerStateType = {
  selected: undefined,
  selectedValue: undefined,
};

export default function employeeReducer(
  state: EmployeeReducerStateType = defaultState,
  action: TypeAndPayload<EmployeeReducerStateType> = { type: undefined }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.Employee.employee:
      return {
        ...state,
        selected: action.payload?.selected,
        selectedValue: payload?.selectedValue,
      };
    default:
      return state;
  }
}
