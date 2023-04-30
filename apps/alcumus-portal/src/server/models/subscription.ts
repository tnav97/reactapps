import { Types, Utilities } from '@alcumus/core';
import { getAuthorizationHeader } from '../../lib/utils';
import { BadAxios } from '../utilities/badAxios';

interface UserApplicationAccess {
  userApplicationAccessId: number;
  userOrganizationId: string;
  applicationId: number;
  isEnabled: boolean;
  userId: number;
  organizationId: number;
}

export async function getSubscriptionSeats(
  accessToken: string,
  subscriptionId: number,
  organizationId: number
) {
  const headers = getAuthorizationHeader(accessToken);
  const url = Utilities.getApiUrl(
    `/subscriptions/api/v1/subscriptions/${subscriptionId}/organizations/${organizationId}/seats`
  );

  const { data } = await Utilities.sendAxiosGetRequest(url, headers);
  return data;
}

export async function getSubscription(
  accessToken: string,
  subscriptionId: number
) {
  const headers = getAuthorizationHeader(accessToken);
  const url = Utilities.getApiUrl(
    `/subscriptions/api/v1/subscriptions/${subscriptionId}`
  );

  const { data } = await Utilities.sendAxiosGetRequest(url, headers);
  return data;
}

export async function getUserApplicationAccess(
  accessToken: string,
  subscriptionId: number,
  organizationId: number
): Promise<Array<UserApplicationAccess>> {
  const headers = getAuthorizationHeader(accessToken);
  const url = Utilities.getApiUrl(
    `/subscriptions/api/v1/organizations/${organizationId}/subscriptions/${subscriptionId}`
  );

  const { data } = await Utilities.sendAxiosGetRequest(url, headers);
  return data;
}

export async function patchSubscriptionSeats(
  accessToken: string,
  subscriptionId: number,
  subscriptionSeats
) {
  const headers = getAuthorizationHeader(accessToken);
  const { data } = await BadAxios.sendAxiosPatchRequest(
    Utilities.getApiUrl(
      `/subscriptions/api/v1/subscriptions/${subscriptionId}`
    ),
    subscriptionSeats,
    { ...headers, 'x-api-client-app': 'alcumus-portal' }
  );

  return data;
}

export async function patchSubscriptionStatus(
  accessToken: string,
  subscriptionId: number,
  patchStatusRequest: { subscriptionStatus: boolean }
) {
  const headers = getAuthorizationHeader(accessToken);
  const axiosInstance = Utilities.getServicesAxiosClient();
  const subscriptionResponse = await axiosInstance.patch(
    Utilities.getApiUrl(
      `/subscriptions/api/v1/subscriptions/${subscriptionId}/status`
    ),
    patchStatusRequest,
    { headers: { ...headers, 'x-api-client-app': 'alcumus-portal' } }
  );

  if (subscriptionResponse.status >= 400 && subscriptionResponse.status < 500) {
    throw new Types.LocalizedError(
      subscriptionResponse.status,
      subscriptionResponse.data.message
    );
  }

  return subscriptionResponse.data;
}
