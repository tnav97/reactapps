import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface companyList {
  name?: string;
  registrationNumber?: string;
}

export interface MotoSubsidiaryListReducerStateType {
  selected?: number;
  selectedValue?: string;
  companyList?: Array<companyList> | null;
}

export const defaultState: MotoSubsidiaryListReducerStateType = {
  selected: undefined,
  selectedValue: undefined,
  companyList: undefined,
};

export default function motoSubsidiaryListReducer(
  state: MotoSubsidiaryListReducerStateType = defaultState,
  action: TypeAndPayload<MotoSubsidiaryListReducerStateType> = {
    type: undefined,
  }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.MotoSubsidiary.subsidiary:
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
