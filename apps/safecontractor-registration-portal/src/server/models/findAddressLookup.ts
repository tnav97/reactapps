import { Utilities } from '@alcumus/core';
import getExperianApiKey from '../../lib/utils/getExperianApiKey';
import getExperianApiUrl from '../../lib/utils/getExperianApiUrl';

export async function findAddressLookup(code: string) {
  const url = getExperianApiUrl(`/address/format/v1/${code}`);
  const { data } = await Utilities.sendAxiosGetRequest(
    `${url}`,
    getExperianApiKey()
  );
  return data;
}
