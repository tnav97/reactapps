import Axios from 'axios';
import { getBillingServiceApiUrl } from '../../lib/utils/getBillingServiceApiUrl';
import { getBillingServiceKey } from '../../lib/utils/getBillingServiceKey';

export interface BillingAddressDto {
  id: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface BillingAccountDto {
  id?: string;
  accountHolderName: string;
  accountHolderEmail: string;
  billingEmail?: string | undefined;
  externalId?: string;
  billingAddress?: BillingAddressDto;
}

export default async function createBillingAccount(
  request: BillingAccountDto
): Promise<BillingAccountDto | undefined> {
  const config = {
    headers: {
      'x-api-key': getBillingServiceKey(),
    },
  };
  return (
    await Axios.post<BillingAccountDto>(
      getBillingServiceApiUrl('billingAccounts'),
      request,
      config
    )
  ).data;
}
