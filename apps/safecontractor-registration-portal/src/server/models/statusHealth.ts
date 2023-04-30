import { Utilities } from '@alcumus/core';
import getApiKeyHeader from '../../lib/utils/getApiKeyHeader';
import getApiUrl from '../../lib/utils/getApiUrl';

export async function validateStatusHealth() {
  const url = getApiUrl('/status');
  const { data } = await Utilities.sendAxiosGetRequest(
    `${url}`,
    getApiKeyHeader()
  );
  return data;
}
