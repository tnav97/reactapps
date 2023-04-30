import { getAuthorizationHeader } from '../../lib/utils';
import { Constants, Utilities } from '@alcumus/core';
import { OrganizationMemberStatusRequest } from '../../common/types';
import { BadAxios } from '../utilities/badAxios';

export async function patchOrganizationMember(
  accessToken: string,
  memberId: number,
  organizationMemberStatusDto: OrganizationMemberStatusRequest
) {
  const headers = getAuthorizationHeader(accessToken);
  const { data: member } = await BadAxios.sendAxiosPatchRequest(
    Utilities.getApiUrl(`/users/api/v2/members/${memberId}/accounts`),
    organizationMemberStatusDto,
    headers
  );

  await BadAxios.sendAxiosDeleteRequest(
    Utilities.getApiUrl(
      `/subscriptions/api/v1/members/${memberId}/applications`
    ),
    headers
  );

  return member;
}

export async function deleteOrganizationMember(
  accessToken: string,
  memberId: number
) {
  const headers = getAuthorizationHeader(accessToken);
  const { data: member } = await BadAxios.sendAxiosDeleteRequest(
    Utilities.getApiUrl(`/users/api/v2/members/${memberId}/accounts`),
    headers
  );

  await BadAxios.sendAxiosDeleteRequest(
    Utilities.getApiUrl(
      `/subscriptions/api/v1/members/${memberId}/applications`
    ),
    headers
  );

  return member;
}

export async function isLoginUnique(
  organizationIdentifier: string,
  emailAddress: string
): Promise<Boolean> {
  const axiosInstance = Utilities.getServicesAxiosClient();
  const url = Utilities.getApiUrl(
    `/users/api/v1/migrate/auth/${organizationIdentifier}/logins/${emailAddress}`
  );
  const headers = {
    [Constants.RequestHeaders.ApiKey]:
      Utilities.ProcessEnv.getValueOrThrow('SERVICES_API_KEY'),
  };

  const loginResponse = await axiosInstance.get(url, {
    headers,
    validateStatus: (status: number) => status < 500,
  });

  if (loginResponse.status === 200) {
    return false;
  }
  return true;
}
