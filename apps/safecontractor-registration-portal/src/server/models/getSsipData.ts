import { Utilities } from '@alcumus/core';
import getApiKeyHeader from '../../lib/utils/getApiKeyHeader';
import getApiUrl from '../../lib/utils/getApiUrl';

export async function getSsipData() {
  const url = getApiUrl('/ssip-body');
  const { data } = await Utilities.sendAxiosGetRequest(
    `${url}`,
    getApiKeyHeader()
  );
  return data;
}
