import axios from 'axios';
import {
  getBillingServiceApiUrl,
  getBillingServiceKey,
} from '../../../lib/utils/billingServiceApi';
import { Plan } from '../../../types/plans';

export async function getPlans(): Promise<Plan[]> {
  const config = {
    headers: {
      'x-api-key': getBillingServiceKey(),
    },
  };
  const response = await axios.get(getBillingServiceApiUrl('/plans'), config);
  return response.data;
}
