import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface MotoChoosePlanReducerStateType {
  selected?: number;
  selectedValue?: string;
}

export const defaultState: MotoChoosePlanReducerStateType = {
  selected: undefined,
  selectedValue: undefined,
};

export default function motoChoosePlanReducer(
  state: MotoChoosePlanReducerStateType = defaultState,
  action: TypeAndPayload<MotoChoosePlanReducerStateType> = { type: undefined }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.MotoChoosePlans.choosePlan:
      return {
        ...state,
        selected: payload?.selected,
        selectedValue: payload?.selectedValue,
      };
    default:
      return state;
  }
}
