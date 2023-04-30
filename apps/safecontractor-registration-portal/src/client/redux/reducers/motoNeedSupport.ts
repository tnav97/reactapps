import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface MotoNeedSupportReducerStateType {
  selected?: number;
  selectedValue?: string;
}

export const defaultState: MotoNeedSupportReducerStateType = {
  selected: undefined,
  selectedValue: undefined,
};

export default function motoNeedSupportReducer(
  state: MotoNeedSupportReducerStateType = defaultState,
  action: TypeAndPayload<MotoNeedSupportReducerStateType> = { type: undefined }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.MotoNeedSupport.support:
      return {
        ...state,
        selected: payload?.selected,
        selectedValue: payload?.selectedValue,
      };
    default:
      return state;
  }
}
