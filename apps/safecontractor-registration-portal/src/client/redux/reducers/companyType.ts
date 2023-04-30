import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface CompanyTypeReducerStateType {
  selected?: number;
  selectedValue?: string;
  companyType?: string;
}

export const defaultState: CompanyTypeReducerStateType = {
  selected: undefined,
  selectedValue: undefined,
  companyType: undefined,
};

export default function companyTypeReducer(
  state: CompanyTypeReducerStateType = defaultState,
  action: TypeAndPayload<CompanyTypeReducerStateType> = { type: undefined }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.CompanyType.companyType:
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
