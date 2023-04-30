import { Constants, Types, Utilities } from '@alcumus/core';
import { EnvVariables } from '../constants';

export async function getOauthUrl(
  _: Types.Request,
  { organizationIdentifier }: { organizationIdentifier?: string }
): Promise<string> {
  const apiKeyHeader = {
    [Constants.RequestHeaders.ApiKey]: EnvVariables.ServicesApiKey as string,
  };

  const oauthUrlEndpoint = organizationIdentifier
    ? `/auth/api/v1/oauth/url?organizationIdentifier=${organizationIdentifier}`
    : `/auth/api/v1/oauth/url`;
  const { data: oauthUrl } = await Utilities.sendAxiosGetRequest(
    Utilities.getApiUrl(oauthUrlEndpoint),
    apiKeyHeader
  );
  return oauthUrl;
}

export async function validateToken(accessToken: string): Promise<number> {
  const axiosInstance = Utilities.getAxiosInstance();
  let response;
  try {
    response = await axiosInstance.get(
      Utilities.getApiUrl('/auth/api/v1/tokens/validate'),
      {
        headers: {
          'x-access-token': accessToken as string,
        },
      }
    );
  } catch (e: any) {
    return e.response.status as number;
  }

  return response.status;
}
