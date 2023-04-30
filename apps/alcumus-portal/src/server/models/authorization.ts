import { getAuthorizationHeader } from '../../lib/utils';
import { Utilities } from '@alcumus/core';

export async function getAllRoles(accessToken: string) {
  const headers = getAuthorizationHeader(accessToken);
  const url = Utilities.getApiUrl(`/authorization/api/v1/roles`);

  const { data } = await Utilities.sendAxiosGetRequest(url, headers);
  return data;
}

export async function getRoleForOrganization(
  accessToken: string,
  organizationId: number
) {
  const headers = getAuthorizationHeader(accessToken);
  const url = Utilities.getApiUrl(
    `/authorization/api/v1/me/roles/${organizationId}`
  );

  const { data } = await Utilities.sendAxiosGetRequest(url, headers);
  return data;
}
