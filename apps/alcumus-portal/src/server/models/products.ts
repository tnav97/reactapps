import { Utilities } from '@alcumus/core';
import { getAuthorizationHeader } from '../../lib/utils';

export async function getProducts(accessToken: string) {
  const headers = getAuthorizationHeader(accessToken);
  const url = Utilities.getApiUrl(`/subscriptions/api/v1/products`);
  const applicationLookupKeys: string[] | undefined =
    Utilities.ProcessEnv.getValue(
      'ALCUMUS_PORTAL_SUPPORTED_APPLICATION_LOOKUP_KEYS'
    )?.split(',');

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

export async function getProductCategories(accessToken: string) {
  const headers = getAuthorizationHeader(accessToken);
  const url = Utilities.getApiUrl('/subscriptions/api/v1/products/categories');

  const { data } = await Utilities.sendAxiosGetRequest(url, headers);
  return data;
}
