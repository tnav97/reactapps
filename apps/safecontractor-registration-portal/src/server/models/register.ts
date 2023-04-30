import { Utilities } from '@alcumus/core';
import { RegisterRequest } from '../../common/types';
import getApiKeyHeader from '../../lib/utils/getApiKeyHeader';
import getApiUrl from '../../lib/utils/getApiUrl';
export interface RegisterResponse {
  success: string;
  company: CompanyResponse;
}
export interface CompanyResponse {
  id: string;
  coref: string;
  skipPayment: boolean;
}
export async function registration(
  request: RegisterRequest
): Promise<RegisterResponse> {
  const url = getApiUrl('/register');
  const { data } = await Utilities.sendAxiosPostRequest(
    `${url}`,
    request,
    getApiKeyHeader()
  );
  return data;
}
