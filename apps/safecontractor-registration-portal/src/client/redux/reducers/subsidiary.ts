import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface companyList {
  name?: string;
  registrationNumber?: string;
}

export interface SubsidiaryListReducerStateType {
  selected?: number;
  selectedValue?: string;
  companyList?: Array<companyList> | null;
}

export const defaultState: SubsidiaryListReducerStateType = {
  selected: undefined,
  selectedValue: undefined,
  companyList: undefined,
};

export default function subsidiaryListReducer(
  state: SubsidiaryListReducerStateType = defaultState,
  action: TypeAndPayload<SubsidiaryListReducerStateType> = { type: undefined }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.Subsidiary.subsidiary:
      return {
        ...state,
        selected: payload?.selected,
        selectedValue: payload?.selectedValue,
        companyList: payload?.companyList,
      };
    default:
      return state;
  }
}
