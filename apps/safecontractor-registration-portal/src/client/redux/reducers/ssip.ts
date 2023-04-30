import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface SSIPRegistrationDetails {
  ssipClientName?: string;
  ssipClientId?: number;
  accreditationDate?: string;
  expirationDate?: string;
}

export interface ssipListReducerStateType {
  selected?: number;
  selectedValue?: string;
  ssipRegistrationForm?: SSIPRegistrationDetails;
}

export const defaultState: ssipListReducerStateType = {
  selected: undefined,
  selectedValue: undefined,
  ssipRegistrationForm: undefined,
};

export default function ssipListReducer(
  state: ssipListReducerStateType = defaultState,
  action: TypeAndPayload<ssipListReducerStateType> = {
    type: undefined,
  }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.SSIP.ssip:
      return {
        ...state,
        selected: payload?.selected,
        selectedValue: payload?.selectedValue,
        ssipRegistrationForm: payload?.ssipRegistrationForm,
      };
    default:
      return state;
  }
}
