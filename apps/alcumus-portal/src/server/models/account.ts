import { Constants, Types, Utilities } from '@alcumus/core';
import { AuthenticationError } from '../errors/AuthenticationError';
import { getAuthorizationHeader } from '../../lib/utils';
import { EnvVariables } from '../constants';
import { UserLogin, UserProfile } from '../../common/types';
import { getAccessTokenIfPresent } from '../../lib/utils/getAccessToken';
import { BadAxios } from '../utilities/badAxios';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
  scope: string;
  fieldIdSamlToken?: string;
  eComplianceSamlToken?: string;
}

export async function registerUser(
  _: Types.Request,
  firstName: string,
  lastName: string,
  email: string,
  username: string,
  password: string
): Promise<void> {
  await Utilities.sendAxiosPostRequest(
    Utilities.getApiUrl('/users/api/v1/users'),
    {
      firstName,
      lastName,
      email,
      username,
      password,
      createAccount: true,
    },
    {
      [Constants.RequestHeaders.ApiKey]: EnvVariables.ServicesApiKey as string,
    }
  );
}

export async function verifyCredentials(
  _: Types.Request,
  email: string,
  password: string,
  organizationIdentifier?: string
): Promise<LoginResponse> {
  try {
    const {
      data: {
        accessToken,
        refreshToken,
        expiresIn,
        tokenType,
        scope,
        fieldIdSamlToken,
        eComplianceSamlToken,
      },
    } = await Utilities.sendAxiosPostRequest(
      Utilities.getApiUrl('/auth/api/v1/login'),
      {
        username: email,
        password,
        organizationIdentifier,
      },
      {
        [Constants.RequestHeaders.ApiKey]:
          EnvVariables.ServicesApiKey as string,
      }
    );

    return {
      accessToken,
      refreshToken,
      expiresIn,
      tokenType,
      scope,
      fieldIdSamlToken,
      eComplianceSamlToken,
    };
  } catch (err: any) {
    if (err.status === 500) {
      throw new AuthenticationError('Credentials could not be verified');
    } else {
      throw err;
    }
  }
}

export async function destroyCredentials(
  request: Types.Request,
  accessToken: string
): Promise<void> {
  try {
    const axiosInstance = Utilities.getAxiosInstance(request);
    axiosInstance.defaults.validateStatus = (status: number) => status < 500;
    const response = await axiosInstance.post(
      Utilities.getApiUrl('/auth/api/v1/logout'),
      {
        refreshToken: request.session?.tokens?.refreshToken,
      },
      {
        headers: {
          [Constants.RequestHeaders.AccessToken]: accessToken,
          [Constants.RequestHeaders.ApiKey]:
            EnvVariables.ServicesApiKey as string,
        },
      }
    );
    if (response.status >= 400 && response.status < 500) {
      throw new Types.LocalizedError(response.status, response.data.message);
    }
  } catch (e) {
    console.error(e);
    // Swallow invalid refresh token errors here
  }
}

export async function logoutUser(req: Types.Request) {
  const accessToken = getAccessTokenIfPresent(req);
  if (!accessToken) {
    throw new Error('Access token not found!!!');
  }
  await destroyCredentials(req, accessToken);
}

export async function getLoggedInUserProfile(
  _: Types.Request,
  accessToken: string
) {
  const headers = getAuthorizationHeader(accessToken);
  const [{ data: alcumusProfile }, { data: organizations }] = await Promise.all(
    [
      Utilities.sendAxiosGetRequest(
        Utilities.getApiUrl('/users/api/v1/me'),
        headers
      ),
      Utilities.sendAxiosGetRequest(
        Utilities.getApiUrl('/users/api/v1/me/organizations'),
        headers
      ),
    ]
  );
  return {
    ...alcumusProfile,
    organizations,
  };
}

export async function updateProfile(
  _: Types.Request,
  accessToken: string,
  profile: Partial<UserProfile>
) {
  const headers = getAuthorizationHeader(accessToken);
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: { id, ...updatedProfile },
  } = await BadAxios.sendAxiosPatchRequest(
    Utilities.getApiUrl('/users/api/v1/me'),
    profile,
    headers
  );
  return updatedProfile;
}

export async function updatePassword(
  _: Types.Request,
  userId: number,
  accessToken: string,
  newPassword: string,
  oldPassword?: string
) {
  const endpoint = EnvVariables.FeatureToggles.UseAzureAd
    ? `/users/api/v2/users/${userId}/accounts`
    : `/users/api/v1/users/${userId}/accounts`;
  const mutation = EnvVariables.FeatureToggles.UseAzureAd
    ? { newPassword }
    : { oldPassword, newPassword };

  const headers = getAuthorizationHeader(accessToken);
  const axiosInstance = Utilities.getAxiosInstance(_);
  axiosInstance.defaults.validateStatus = (status: number) => status < 500;
  const response = await axiosInstance.patch(
    Utilities.getApiUrl(endpoint),
    mutation,
    { headers }
  );
  if (response.status >= 400 && response.status < 500) {
    throw new Types.LocalizedError(response.status, response.data.message);
  }
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    data: { id, ...userProfile },
  } = response;
  return userProfile;
}

export async function getUserLogin(accessToken: string): Promise<UserLogin> {
  const headers = getAuthorizationHeader(accessToken);
  const url = Utilities.getApiUrl(`/users/api/v1/me/account`);
  const { data } = await Utilities.sendAxiosGetRequest(url, headers);
  const { userId, ...rest } = data;
  return { userLoginId: userId, ...rest };
}

export async function getUserAccounts(_: Types.Request, userId: number) {
  const { data: accounts } = await Utilities.sendAxiosGetRequest(
    Utilities.getApiUrl(`/users/api/v1/users/${userId}/accounts`),
    {
      [Constants.RequestHeaders.ApiKey]:
        Utilities.ProcessEnv.getValueOrThrow('SERVICES_API_KEY'),
    }
  );
  return accounts;
}

export async function updateUserEmail(
  _: Types.Request,
  accessToken: string,
  userId: number,
  email: string
): Promise<Types.AxiosResponse<any>> {
  const headers = getAuthorizationHeader(accessToken);
  // TODO: This will only work with single user accounts and may need to be changed later
  const accounts = await getUserAccounts(_, userId);
  if (!accounts?.length) {
    throw new Error('Account could not be found');
  }

  const mutation = { newEmail: email, currentEmail: accounts[0].email };
  const axiosInstance = Utilities.getAxiosInstance(_);
  const url = Utilities.getApiUrl(
    `/users/api/v2/users/${userId}/accounts/${accounts[0].id}/email`
  );
  axiosInstance.defaults.validateStatus = (status: number) => status < 500;
  const response = await axiosInstance.patch(url, mutation, { headers });
  return response;
}
