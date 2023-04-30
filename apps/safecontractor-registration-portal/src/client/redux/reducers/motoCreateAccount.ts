import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface MotoCreateAccountReducerStateType {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  agreeTerms?: boolean;
}

export const defaultState: MotoCreateAccountReducerStateType = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  password: undefined,
  agreeTerms: undefined,
};

export default function motoCreateAccountReducer(
  state: MotoCreateAccountReducerStateType = defaultState,
  action: TypeAndPayload<MotoCreateAccountReducerStateType> = {
    type: undefined,
  }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.MotoCreateAccount.createAccount:
      return {
        ...state,
        firstName: payload?.firstName,
        lastName: payload?.lastName,
        email: payload?.email,
        password: payload?.password,
        agreeTerms: payload?.agreeTerms,
      };
    default:
      return state;
  }
}
