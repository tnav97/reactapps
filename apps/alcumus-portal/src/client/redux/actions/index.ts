import { Constants } from '@alcumus/core';
import store from 'store';
import { generateRequest } from './generateRequest';
import { UserProfile } from '../../../common/types';

export const Actions = {
  Auth: {
    LoginPending: 'LoginPending',
    LoginCompleted: 'LoginCompleted',
    LoginFailed: 'LoginFailed',
    LogoutPending: 'LogoutPending',
    LogoutCompleted: 'LogoutCompleted',
    LogoutFailed: 'LogoutFailed',
    RegistrationPending: 'RegistrationPending',
    RegistrationCompleted: 'RegistrationCompleted',
    RegistrationFailed: 'RegistrationFailed',
    SubmitForgotPasswordPending: 'SubmitForgotPasswordPending',
    SubmitForgotPasswordCompleted: 'SubmitForgotPasswordCompleted',
    SubmitForgotPasswordFailed: 'SubmitForgotPasswordFailed',
    AllowResendingForgotPasswordRequest: 'AllowResendingForgotPasswordRequest',
    RefreshTokenPending: 'RefreshTokenPending',
    RefreshTokenCompleted: 'RefreshTokenCompleted',
    RefreshTokenFailed: 'RefreshTokenFailed',
    ExchangeCodeForTokensPending: 'ExchangeCodeForTokensPending',
    ExchangeCodeForTokensCompleted: 'ExchangeCodeForTokensCompleted',
    ExchangeCodeForTokensFailed: 'ExchangeCodeForTokensFailed',
    FetchOauthUrlPending: 'FetchOauthUrlPending',
    FetchOauthUrlCompleted: 'FetchOauthUrlCompleted',
    FetchOauthUrlFailed: 'FetchOauthUrlFailed',
  },
  User: {
    FetchUserRolePending: 'FetchUserRolePending',
    FetchUserRoleCompleted: 'FetchUserRoleCompleted',
    FetchUserRoleFailed: 'FetchUserRoleFailed',
    FetchUserProfilePending: 'FetchUserProfilePending',
    FetchUserProfileCompleted: 'FetchUserProfileCompleted',
    FetchUserProfileFailed: 'FetchUserProfileFailed',
    UpdatePasswordPending: 'UpdatePasswordPending',
    UpdatePasswordCompleted: 'UpdatePasswordCompleted',
    UpdatePasswordFailed: 'UpdatePasswordFailed',
    ResetPasswordUpdateStatus: 'ResetPasswordUpdateStatus',
    UpdateProfilePending: 'UpdateProfilePending',
    UpdateProfileCompleted: 'UpdateProfileCompleted',
    UpdateProfileFailed: 'UpdateProfileFailed',
    ResetProfileUpdateStatus: 'ResetProfileUpdateStatus',
    UpdateUserEmailPending: 'UpdateUserEmailPending',
    UpdateUserEmailCompleted: 'UpdateUserEmailCompleted',
    UpdateUserEmailFailed: 'UpdateUserEmailFailed',
    ResetUserEmailUpdateStatus: 'ResetUserEmailUpdateStatus',
  },
  Apps: {
    AppLaunchPending: 'AppLaunchPending',
    AppLaunchCompleted: 'AppLaunchCompleted',
    AppLaunchFailed: 'AppLaunchFailed',
  },
  Applications: {
    FetchApplicationsPending: 'FetchApplicationsPending',
    FetchApplicationsCompleted: 'FetchApplicationsCompleted',
    FetchApplicationsFailed: 'FetchApplicationsFailed',
  },
  Categories: {
    FetchCategoriesPending: 'FetchCategoriesPending',
    FetchCategoriesCompleted: 'FetchCategoriesCompleted',
    FetchCategoriesFailed: 'FetchCategoriesFailed',
  },
};

export const loginWithEmailAndPassword = (
  email: string,
  password: string,
  organizationIdentifier?: string
) =>
  generateRequest({
    endpoint: '/api/auth/login',
    method: 'POST',
    body: {
      email,
      password,
      organizationIdentifier,
    },
    types: [
      Actions.Auth.LoginPending,
      Actions.Auth.LoginCompleted,
      Actions.Auth.LoginFailed,
    ],
  });

export const register = (newUserProfile: {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
}) =>
  generateRequest({
    endpoint: '/api/auth/register',
    method: 'POST',
    body: newUserProfile,
    types: [
      Actions.Auth.RegistrationPending,
      Actions.Auth.RegistrationCompleted,
      Actions.Auth.RegistrationFailed,
    ],
  });

export const submitForgotPasswordRequest = (email: string) =>
  generateRequest({
    endpoint: '/api/auth/forgot-password',
    method: 'POST',
    body: {
      email,
    },
    types: [
      Actions.Auth.SubmitForgotPasswordPending,
      Actions.Auth.SubmitForgotPasswordCompleted,
      Actions.Auth.SubmitForgotPasswordFailed,
    ],
  });

export const logoutUser = () =>
  generateRequest({
    endpoint: '/api/auth/logout',
    method: 'DELETE',
    headers: {
      [Constants.RequestHeaders.AccessToken]: store.get(
        Constants.LocalStorageKeys.AccessToken
      ),
    },
    body: {
      refreshToken: store.get(Constants.LocalStorageKeys.RefreshToken),
    },
    types: [
      Actions.Auth.LogoutPending,
      Actions.Auth.LogoutCompleted,
      Actions.Auth.LogoutFailed,
    ],
  });

export const allowResendingPassword = () => ({
  type: Actions.Auth.AllowResendingForgotPasswordRequest,
});

export const fetchUserProfile = () =>
  generateRequest({
    endpoint: '/api/users/me',
    headers: {
      [Constants.RequestHeaders.AccessToken]: store.get(
        Constants.LocalStorageKeys.AccessToken
      ),
    },
    types: [
      Actions.User.FetchUserProfilePending,
      Actions.User.FetchUserProfileCompleted,
      Actions.User.FetchUserProfileFailed,
    ],
  });

export const fetchUserRole = () =>
  generateRequest({
    endpoint: `/api/users/role/me`,
    headers: {
      [Constants.RequestHeaders.AccessToken]: store.get(
        Constants.LocalStorageKeys.AccessToken
      ),
    },
    types: [
      Actions.User.FetchUserRolePending,
      Actions.User.FetchUserRoleCompleted,
      Actions.User.FetchUserRoleFailed,
    ],
  });

export const updatePassword = (newPassword: string, oldPassword?: string) =>
  generateRequest({
    endpoint: '/api/users/password',
    method: 'PUT',
    headers: {
      [Constants.RequestHeaders.AccessToken]: store.get(
        Constants.LocalStorageKeys.AccessToken
      ),
    },
    body: {
      oldPassword,
      newPassword,
    },
    types: [
      Actions.User.UpdatePasswordPending,
      Actions.User.UpdatePasswordCompleted,
      Actions.User.UpdatePasswordFailed,
    ],
  });

export const resetPasswordUpdateStatus = () => ({
  type: Actions.User.ResetPasswordUpdateStatus,
});

export const updateProfile = (profile: Partial<UserProfile>) =>
  generateRequest({
    endpoint: '/api/users/profile',
    method: 'PATCH',
    headers: {
      [Constants.RequestHeaders.AccessToken]: store.get(
        Constants.LocalStorageKeys.AccessToken
      ),
    },
    body: {
      ...profile,
    },
    types: [
      Actions.User.UpdateProfilePending,
      Actions.User.UpdateProfileCompleted,
      Actions.User.UpdateProfileFailed,
    ],
  });

export const resetProfileUpdateStatus = () => ({
  type: Actions.User.ResetProfileUpdateStatus,
});

export const refreshTokens = (refreshToken: string) =>
  generateRequest({
    method: 'POST',
    endpoint: '/api/auth/tokens/refresh',
    headers: {
      [Constants.RequestHeaders.AccessToken]: store.get(
        Constants.LocalStorageKeys.AccessToken
      ),
    },
    body: {
      refreshToken,
    },
    types: [
      Actions.Auth.RefreshTokenPending,
      Actions.Auth.RefreshTokenCompleted,
      Actions.Auth.RefreshTokenFailed,
    ],
  });

export const getTokens = (code: string, clientInfo: string) =>
  generateRequest({
    endpoint: '/api/auth/authorize',
    method: 'POST',
    body: { code, clientInfo },
    types: [
      Actions.Auth.ExchangeCodeForTokensPending,
      Actions.Auth.ExchangeCodeForTokensCompleted,
      Actions.Auth.ExchangeCodeForTokensFailed,
    ],
  });

export const fetchAllApplicationsFromApi = () =>
  generateRequest({
    endpoint: '/api/applications',
    method: 'GET',
    headers: {
      [Constants.RequestHeaders.AccessToken]: store.get(
        Constants.LocalStorageKeys.AccessToken
      ),
    },
    types: [
      Actions.Applications.FetchApplicationsPending,
      Actions.Applications.FetchApplicationsCompleted,
      Actions.Applications.FetchApplicationsFailed,
    ],
  });

export const fetchAllApplicationCategories = () =>
  generateRequest({
    endpoint: '/api/applications/categories',
    method: 'GET',

    headers: {
      [Constants.RequestHeaders.AccessToken]: store.get(
        Constants.LocalStorageKeys.AccessToken
      ),
    },
    types: [
      Actions.Categories.FetchCategoriesPending,
      Actions.Categories.FetchCategoriesCompleted,
      Actions.Categories.FetchCategoriesFailed,
    ],
  });

export const updateUserEmail = (email: string) =>
  generateRequest({
    endpoint: '/api/users/identifiers',
    method: 'PATCH',
    headers: {
      [Constants.RequestHeaders.AccessToken]: store.get(
        Constants.LocalStorageKeys.AccessToken
      ),
    },
    body: {
      email,
    },
    types: [
      Actions.User.UpdateUserEmailPending,
      Actions.User.UpdateUserEmailCompleted,
      Actions.User.UpdateUserEmailFailed,
    ],
  });

export const resetUserEmailUpdateStatus = () => ({
  type: Actions.User.ResetUserEmailUpdateStatus,
});
