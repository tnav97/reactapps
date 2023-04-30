import { CreateBillingAccountDto } from './types';
import axios from 'axios';

export class BillingServiceApi {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private billingServiceApiUrl: string,
    private billingServiceApiKey: string
  ) {}

  async createBillingAccount(
    billingAccountDto: CreateBillingAccountDto
  ): Promise<string> {
    const { data } = await axios.post(
      `${this.billingServiceApiUrl}/api/v1/billingAccounts`,
      billingAccountDto,
      {
        headers: {
          'x-api-key': this.billingServiceApiKey,
        },
      }
    );

    return data.id;
  }
}
