import { TypeAndPayload } from './index';
import { Actions } from '../actions';

export interface CreateAccountReducerStateType {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  agreeTerms?: boolean;
}

export const defaultState: CreateAccountReducerStateType = {
  firstName: undefined,
  lastName: undefined,
  email: undefined,
  password: undefined,
  agreeTerms: undefined,
};

export default function createAccountReducer(
  state: CreateAccountReducerStateType = defaultState,
  action: TypeAndPayload<CreateAccountReducerStateType> = { type: undefined }
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.CreateAccount.createAccount:
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
