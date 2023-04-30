import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface MotoCompanyTypeReducerStateType {
  selected?: number;
  selectedValue?: string;
  companyType?: string;
}

export const defaultState: MotoCompanyTypeReducerStateType = {
  selected: undefined,
  selectedValue: undefined,
  companyType: undefined,
};

export default function motoCompanyTypeReducer(
  state: MotoCompanyTypeReducerStateType = defaultState,
  action: TypeAndPayload<MotoCompanyTypeReducerStateType> = { type: undefined }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.MotoCompanyType.companyType:
      return {
        ...state,
        selected: payload?.selected,
        selectedValue: payload?.selectedValue,
        companyType: payload?.companyType,
      };
    default:
      return state;
  }
}
