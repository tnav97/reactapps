import { Utilities } from '@alcumus/core';
const baseUrl = Utilities.ProcessEnv.getValue('SCRP_PAYMENT_GATEWAY_API_URL');
export default function getPaymentGatewayApiUrl(path: string): string {
  return `${baseUrl}${path}`;
}
