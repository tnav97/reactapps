import { Actions } from '../actions';

export interface ValidationResult {
  isValid: boolean;
  // If a field is present, it means there's an error on it
  firstName?: [string];
  lastName?: [string];
  email?: [string];
  password?: [string];
  companyName?: [string];
}

export interface RegisterFormData {
  firstName?: string;
  lastName?: string;
  email?: string;
  companyName?: string;
  password?: string;
  role?: string;
  purpose?: string;
  teamSize?: string;
  industry?: string;
  enrollmentDate?: string;

  employeeProfileId?: string;
  organizationId?: string;

  // The below are internal fields and server does not use them
  termsCheck?: boolean;
  passwordScore?: number;
}

export enum Steps {
  REGISTER = 'register',
  QUESTIONNAIRE = 'questionnaire',
  SUCCESS = 'success',
}

export interface RegisterReducerStateType {
  form?: RegisterFormData;
  step: Steps;
}

export const defaultState: RegisterReducerStateType = {
  form: undefined,
  step: Steps.REGISTER,
};

export default function registerReducer(
  state: RegisterReducerStateType = defaultState,
  action: { type: string; payload: any }
): RegisterReducerStateType {
  const { payload } = action;
  switch (action.type) {
    case Actions.RegisterSetData:
      return {
        ...state,
        form: {
          ...state.form,
          ...(payload as RegisterFormData),
        },
        step: Steps.QUESTIONNAIRE,
      };

    case Actions.QuestionnaireSetData:
      return {
        ...state,
        form: {
          ...state.form,
          ...(payload as RegisterFormData),
        },
        step: Steps.SUCCESS,
      };

    default:
      return state;
  }
}
