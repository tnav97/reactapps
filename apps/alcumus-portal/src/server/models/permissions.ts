import { Utilities } from '@alcumus/core';
import { getAuthorizationHeader } from '../../lib/utils';

export async function getLoggedInUserRoleAndPermissions(
  accessToken: string,
  organizationId: number
) {
  const headers = getAuthorizationHeader(accessToken);
  const { data: roleAndPermissions } = await Utilities.sendAxiosGetRequest(
    Utilities.getApiUrl(`/authorization/api/v1/me/roles/${organizationId}`),
    headers
  );
  return roleAndPermissions;
}
