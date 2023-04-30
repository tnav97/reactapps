import { Utilities } from '@alcumus/core';
import getApiKeyHeader from '../../lib/utils/getApiKeyHeader';
import getApiUrl from '../../lib/utils/getApiUrl';

export async function validateReferralCode(code: string) {
  const url = getApiUrl('/client-referral?code');
  const { data } = await Utilities.sendAxiosGetRequest(
    `${url}=${code}`,
    getApiKeyHeader()
  );
  return data;
}
