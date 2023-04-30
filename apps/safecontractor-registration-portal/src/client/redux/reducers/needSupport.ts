import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface NeedSupportReducerStateType {
  selected?: number;
  selectedValue?: string;
}

export const defaultState: NeedSupportReducerStateType = {
  selected: undefined,
  selectedValue: undefined,
};

export default function needSupportReducer(
  state: NeedSupportReducerStateType = defaultState,
  action: TypeAndPayload<NeedSupportReducerStateType> = { type: undefined }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.NeedSupport.support:
      return {
        ...state,
        selected: payload?.selected,
        selectedValue: payload?.selectedValue,
      };
    default:
      return state;
  }
}
