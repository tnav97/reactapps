import { Utilities } from '@alcumus/core';
import getApiKeyHeader from '../../lib/utils/getApiKeyHeader';
import getApiUrl from '../../lib/utils/getApiUrl';

export interface UpdateRegistrationPaymentRequest {
  contractorId: string;
  paymentMethod: string;
  sourcePortal: string;
}

export interface UpdateRegistrationPaymentResponse {
  success: string;
  paymentUrl: string;
}

export async function updateRegistrationPayment(
  request: UpdateRegistrationPaymentRequest
): Promise<UpdateRegistrationPaymentResponse> {
  const url = getApiUrl('/select-payment');
  const { data } = await Utilities.sendAxiosPostRequest(
    `${url}`,
    request,
    getApiKeyHeader()
  );
  return data;
}
