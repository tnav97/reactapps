import { Utilities } from '@alcumus/core';
import { AddressRequest } from '../../common/types';
import getExperianApiKey from '../../lib/utils/getExperianApiKey';
import getExperianApiUrl from '../../lib/utils/getExperianApiUrl';

export interface AddressResponse {
  result: Result;
}

export interface Result {
  more_results_available: boolean;
  confidence: string;
  suggestions: Suggestion[];
}

export interface Suggestion {
  global_address_key: string;
  text: string;
  matched: Array<number[]>;
  format: string;
}

export interface AddressDetail {
  global_address_key: string;
  text: string;
  matched: Array<number[]>;
  format: string;
}

export interface Address {
  global_address_key: string;
  text: string;
}

export async function postAddressLookup(
  request: AddressRequest
): Promise<AddressResponse> {
  const url = getExperianApiUrl('/address/search/v1');
  const { data } = await Utilities.sendAxiosPostRequest(
    `${url}`,
    request,
    getExperianApiKey()
  );
  return data;
}
