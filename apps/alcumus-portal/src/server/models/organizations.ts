import { Constants, Utilities } from '@alcumus/core';
import {
  Organization,
  OrganizationMemberRole,
  UserDetails,
} from '../../common/types';
import { getAuthorizationHeader } from '../../lib/utils';

export interface OrganizationMemberProfile {
  userAccount: {
    email: string;
  };
  userProfile: {
    firstName: string;
    lastName: string;
  };
  userId: number;
}

export async function getSubscriptions(
  accessToken: string,
  organizationId: number
) {
  const headers = getAuthorizationHeader(accessToken);
  const url = Utilities.getApiUrl(
    `/subscriptions/api/v1/organizations/${organizationId}/subscriptions`
  );

  const { data } = await Utilities.sendAxiosGetRequest(url, headers);
  return data;
}

export async function createSubscription(
  accessToken: string,
  createSubscriptionDto: {
    organizationId: number;
    applicationId: number;
    seats: number;
    endDate: string;
    startDate: string;
  }
) {
  const headers = getAuthorizationHeader(accessToken);
  const url = Utilities.getApiUrl(
    `/subscriptions/api/v1/organizations/${createSubscriptionDto.organizationId}/subscriptions`
  );

  const { data: subscription } = await Utilities.sendAxiosPostRequest(
    url,
    createSubscriptionDto,
    headers
  );
  return subscription;
}

export async function getOrganizationMembersRoles(
  accessToken: string,
  organizationId: number,
  ids: Array<number>
): Promise<Array<OrganizationMemberRole>> {
  const headers = getAuthorizationHeader(accessToken);
  const url = Utilities.getApiUrl(
    '/authorization/api/v1/roles/employees/search'
  );

  const { data } = await Utilities.sendAxiosPostRequest(
    url,
    { organizationId, usersIds: ids },
    headers
  );

  return data;
}

export async function getAllUsersByOrganizationId(
  organizationId: number,
  accessToken: string
): Promise<Array<UserDetails>> {
  const headers = getAuthorizationHeader(accessToken);
  const { data: users } = await Utilities.sendAxiosGetRequest(
    Utilities.getApiUrl(
      `/users/api/v2/members/aggregate?organizationId=${organizationId}`
    ),
    headers
  );
  return users;
}

export async function getAvailableApplications(
  accessToken: string,
  organizationId: number
) {
  const headers = getAuthorizationHeader(accessToken);
  const applicationLookupKeys: string[] | undefined =
    Utilities.ProcessEnv.getValue(
      'ALCUMUS_PORTAL_SUPPORTED_APPLICATION_LOOKUP_KEYS'
    )?.split(',');

  const url = Utilities.getApiUrl(
    `/subscriptions/api/v1/organizations/${organizationId}/applications/available`
  );

  if (applicationLookupKeys && applicationLookupKeys.length) {
    const searchParams = new URLSearchParams(
      `applicationLookupKeys=${applicationLookupKeys.join(',')}`
    );

    const { data } = await Utilities.sendAxiosGetRequest(
      `${url}?${searchParams}`,
      headers
    );
    return data;
  } else {
    return [];
  }
}

export async function getOrganizations(accessToken: string) {
  const headers = getAuthorizationHeader(accessToken);
  const url = Utilities.getApiUrl(`/users/api/v1/me/organizations`);
  const { data } = await Utilities.sendAxiosGetRequest(url, headers);
  return data;
}

export async function searchOrganizations(
  accessToken: string,
  name: string,
  page: number
) {
  const headers = getAuthorizationHeader(accessToken);
  const url = Utilities.getApiUrl(`/tenants/api/v1/organizations/search`);
  const { data } = await Utilities.sendAxiosPostRequest(
    url,
    { name, page },
    headers
  );
  return data;
}

export async function getOrganizationById(organizationId: number) {
  const url = Utilities.getApiUrl('/tenants/api/v1/organizations');
  const headers = {
    [Constants.RequestHeaders.ApiKey]:
      Utilities.ProcessEnv.getValueOrThrow('SERVICES_API_KEY'),
  };

  const { data } = await Utilities.sendAxiosGetRequest(
    `${url}/${organizationId}`,
    headers
  );

  return data;
}

export async function getOrganizationsByIds(organizationIds: number[]) {
  const url = Utilities.getApiUrl('/tenants/api/v1/organizations');
  let names: Organization[] = [];
  const headers = {
    [Constants.RequestHeaders.ApiKey]:
      Utilities.ProcessEnv.getValueOrThrow('SERVICES_API_KEY'),
  };

  if (organizationIds.includes(1)) {
    const { data } = await Utilities.sendAxiosGetRequest(
      `${Utilities.getApiUrl('/tenants/api/v1/organizations/1')}`,
      headers
    );
    names = [data];
  }

  const { data } = await Utilities.sendAxiosGetRequest(
    `${url}?organizationIds=${organizationIds.join('%2C')}`,
    headers
  );
  return names.concat(data);
}

export async function searchMembers(
  accessToken: string,
  organizationId: number,
  userIds: number[]
): Promise<Array<OrganizationMemberProfile>> {
  const headers = getAuthorizationHeader(accessToken);
  const url = Utilities.getApiUrl(`/users/api/v2/members/aggregates/search`);

  const { data } = await Utilities.sendAxiosPostRequest(
    url,
    { userIds, organizationId },
    headers
  );
  return data;
}
