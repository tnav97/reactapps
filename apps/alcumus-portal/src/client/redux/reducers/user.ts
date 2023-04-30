import { TypeAndPayload } from './index';
import { ApiError } from 'redux-api-middleware';
import { Actions } from '../actions';
import {
  RoleAndPermissions as RoleAndPermissionsPayload,
  UserProfile,
} from '../../../common/types';

// TODO: move types to separate file

export type UserProfilePayload = UserProfile;

export interface UserReducerState extends UserProfile {
  isFetching?: boolean;
  error?: string;
  isUpdatingPassword?: boolean;
  errorUpdatingPassword?: string;
  passwordUpdated?: boolean;
  isUpdatingProfile?: boolean;
  errorUpdatingProfile?: string;
  profileUpdated?: boolean;
  isRoleFetching?: boolean;
  errorRoleFetching?: string;
  isUpdatingEmail?: boolean;
  errorUpdatingEmail?: string;
  emailUpdated?: boolean;
}

export const defaultState: UserReducerState = {
  isFetching: false,
};

export default function userReducer(
  state: UserReducerState = defaultState,
  action: TypeAndPayload<
    | UserProfilePayload
    | RoleAndPermissionsPayload
    | ApiError<{ errors: { newEmail: { key: string; message: string } } }>
  > = {}
) {
  const { payload } = action;
  switch (action.type) {
    case Actions.User.FetchUserProfilePending:
      return {
        ...state,
        isFetching: true,
        error: undefined,
      };

    case Actions.User.FetchUserProfileCompleted:
      return {
        ...state,
        ...(payload as UserProfilePayload),
        isFetching: false,
      };

    case Actions.User.FetchUserProfileFailed:
      return {
        ...state,
        isFetching: false,
        error: 'User profile could not be retrieved',
      };

    case Actions.User.UpdatePasswordPending:
      return {
        ...state,
        isUpdatingPassword: true,
        errorUpdatingPassword: undefined,
        passwordUpdated: false,
      };

    case Actions.User.UpdatePasswordCompleted:
      return {
        ...state,
        isUpdatingPassword: false,
        passwordUpdated: true,
      };

    case Actions.User.UpdatePasswordFailed: {
      const error = payload as ApiError;
      return {
        ...state,
        isUpdatingPassword: false,
        errorUpdatingPassword:
          error.response.message ??
          'There was an error updating password, please try again.',
      };
    }

    case Actions.User.ResetPasswordUpdateStatus:
      return {
        ...state,
        passwordUpdated: false,
      };

    case Actions.User.UpdateProfilePending:
      return {
        ...state,
        isUpdatingProfile: true,
        errorUpdatingProfile: undefined,
        profileUpdated: false,
      };

    case Actions.User.UpdateProfileCompleted:
      return {
        ...state,
        isUpdatingProfile: false,
        profileUpdated: true,
      };

    case Actions.User.UpdateProfileFailed:
      return {
        ...state,
        isUpdatingProfile: false,
        errorUpdatingProfile:
          'There was an error updating profile, please try again.',
      };

    case Actions.User.ResetProfileUpdateStatus:
      return {
        ...state,
        profileUpdated: false,
      };

    case Actions.Auth.LogoutCompleted:
      return {
        ...state,
        email: undefined,
      };

    case Actions.User.UpdateUserEmailPending:
      return {
        ...state,
        isUpdatingEmail: true,
        errorUpdatingEmail: undefined,
        emailUpdated: false,
      };

    case Actions.User.UpdateUserEmailCompleted:
      return {
        ...state,
        isUpdatingEmail: false,
        emailUpdated: true,
      };

    case Actions.User.UpdateUserEmailFailed: {
      const error = payload as ApiError;
      const bestErrorMessage =
        error.status === 409
          ? error.response.errors.newEmail.message
          : error.status < 500
          ? error.response.message
          : 'There was an error updating email, please try again.';
      return {
        ...state,
        isUpdatingEmail: false,
        errorUpdatingEmail: bestErrorMessage,
      };
    }

    case Actions.User.ResetUserEmailUpdateStatus:
      return {
        ...state,
        emailUpdated: false,
      };

    default:
      return state;
  }
}
