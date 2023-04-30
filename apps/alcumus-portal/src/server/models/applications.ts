import { Utilities } from '@alcumus/core';
import { MemberApplicationsResponse } from '../../common/types';
import { getAuthorizationHeader } from '../../lib/utils';

export async function getApplicationSubscriptionsForMember(
  accessToken: string,
  userId: number,
  organizationId: number
): Promise<MemberApplicationsResponse[]> {
  const headers = getAuthorizationHeader(accessToken);
  const url = Utilities.getApiUrl(
    `/subscriptions/api/v1/users/${userId}/organizations/${organizationId}/applications`
  );

  const { data } = await Utilities.sendAxiosGetRequest(url, headers);

  return data;
}

export async function getActiveApplicationsForMember(
  accessToken: string,
  memberId: number
) {
  const headers = getAuthorizationHeader(accessToken);
  const url = Utilities.getApiUrl(
    `/subscriptions/api/v1/members/${memberId}/applications`
  );

  const activeApplications = await Utilities.sendAxiosGetRequest(url, headers);

  return activeApplications.data;
}
