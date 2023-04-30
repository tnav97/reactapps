import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface ChoosePlanReducerStateType {
  selected?: number;
  selectedValue?: string;
}

export const defaultState: ChoosePlanReducerStateType = {
  selected: undefined,
  selectedValue: undefined,
};

export default function choosePlanReducer(
  state: ChoosePlanReducerStateType = defaultState,
  action: TypeAndPayload<ChoosePlanReducerStateType> = { type: undefined }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.ChoosePlans.choosePlan:
      return {
        ...state,
        selected: payload?.selected,
        selectedValue: payload?.selectedValue,
      };
    default:
      return state;
  }
}
