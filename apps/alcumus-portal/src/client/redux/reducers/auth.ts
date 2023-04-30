import store from 'store';
import { TypeAndPayload } from './index';
import { Actions } from '../actions';
import {
  updateTokensInLocalStorage,
  removeTokensFromLocalStorage,
} from '../../../lib/utils';
import { redirectToLogout } from '../../../lib/utils/redirectIfRedirectPathSet';

// TODO: move types to separate file
export type LoginResponsePayload = {
  accessToken: string;
  refreshToken: string;
  fieldIdSamlToken?: string;
  eComplianceSamlToken?: string;
  expiresIn: number;
};

export interface AuthReducerState {
  isLoggingIn?: boolean;
  isSubmittingForgotPasswordRequest?: boolean;
  passwordRecoveryLinkSent?: boolean;
  loginError?: string;
  loginSuccess?: boolean;
  loggedOut?: boolean;
  isRegistering?: boolean;
  registrationError?: string;
  registered?: boolean;
  authUrl?: string;
  rememberMyDomain?: boolean;
  isFetchingAuthUrl?: boolean;
  authUrlError?: boolean;
}

export const defaultState: AuthReducerState = {
  isLoggingIn: false,
  isSubmittingForgotPasswordRequest: false,
  passwordRecoveryLinkSent: false,
  loginSuccess: false,
  loginError: undefined,
  loggedOut: !!store.get('accessToken'),
  isRegistering: false,
  registrationError: undefined,
  registered: false,
  rememberMyDomain: false,
  authUrlError: false,
};

export default function authReducer(
  state: AuthReducerState = defaultState,
  action: TypeAndPayload<LoginResponsePayload> = {}
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.Auth.LoginPending:
    case Actions.Auth.ExchangeCodeForTokensPending:
      return {
        ...state,
        isLoggingIn: true,
        loginSuccess: false,
        loginError: undefined,
      };

    case Actions.Auth.LoginCompleted:
    case Actions.Auth.ExchangeCodeForTokensCompleted:
      updateTokensInLocalStorage(payload as LoginResponsePayload);
      return {
        ...state,
        isLoggingIn: false,
        loginSuccess: true,
        loggedOut: false,
      };

    case Actions.Auth.LoginFailed:
      return {
        ...state,
        isLoggingIn: false,
        loginError: 'Credentials could not be verified',
      };

    case Actions.Auth.ExchangeCodeForTokensFailed:
      return {
        ...state,
        isLoggingIn: false,
        loginError: 'Session could not be established',
      };

    case Actions.Auth.RegistrationPending:
      return {
        ...state,
        isRegistering: true,
        registrationError: undefined,
        registered: false,
      };

    case Actions.Auth.RegistrationCompleted:
      updateTokensInLocalStorage(payload as LoginResponsePayload);
      return {
        ...state,
        isRegistering: false,
        registered: true,
      };

    case Actions.Auth.RegistrationFailed:
      return {
        ...state,
        isRegistering: false,
        registrationError: Object.keys(
          (payload as any)?.response?.errors || {}
        ).includes('password')
          ? 'Please enter a strong password containing alphabets, numbers and symbols'
          : 'Registration failed, please try again.',
      };

    case Actions.Auth.SubmitForgotPasswordPending:
      return {
        ...state,
        isSubmittingForgotPasswordRequest: true,
        passwordRecoveryLinkSent: false,
      };

    case Actions.Auth.SubmitForgotPasswordCompleted:
      return {
        ...state,
        isSubmittingForgotPasswordRequest: false,
        passwordRecoveryLinkSent: true,
      };

    case Actions.Auth.SubmitForgotPasswordFailed:
      return {
        ...state,
        isSubmittingForgotPasswordRequest: false,
        passwordRecoveryLinkSent: false,
      };

    case Actions.Auth.AllowResendingForgotPasswordRequest:
      return {
        ...state,
        passwordRecoveryLinkSent: false,
      };

    case Actions.Auth.LogoutCompleted:
    case Actions.Auth.RefreshTokenFailed:
      removeTokensFromLocalStorage();
      redirectToLogout();
      return {
        ...state,
        loginSuccess: false,
        loginError: undefined,
        loggedOut: true,
        isLoggingIn: false,
        isSubmittingForgotPasswordRequest: false,
        passwordRecoveryLinkSent: false,
        isRegistering: false,
        registrationError: undefined,
        registered: false,
      };

    case Actions.Auth.LogoutFailed:
      return {
        ...state,
        loggedOut: false,
      };

    case Actions.Auth.RefreshTokenCompleted:
      updateTokensInLocalStorage(payload as LoginResponsePayload);
      return state;

    case Actions.Auth.FetchOauthUrlPending:
      return {
        ...state,
        isFetchingAuthUrl: true,
        authUrlError: false,
      };
    case Actions.Auth.FetchOauthUrlCompleted:
      return {
        ...state,
        isFetchingAuthUrl: false,
        authUrl: (payload as any)?.authUrl,
        authUrlError: false,
      };
    case Actions.Auth.FetchOauthUrlFailed:
      return {
        ...state,
        isFetchingAuthUrl: false,
        authUrlError: true,
      };
    default:
      return state;
  }
}
