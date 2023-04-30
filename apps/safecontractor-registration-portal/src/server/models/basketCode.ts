import { Utilities } from '@alcumus/core';
import { BasketRequest } from '../../common/types';
import getApiKeyHeader from '../../lib/utils/getApiKeyHeader';
import getApiUrl from '../../lib/utils/getApiUrl';
export interface BasketResponse {
  success: string;
  brand: BrandResponse;
}
export interface Subsidiary {
  id: string;
  label: string;
  price: Price;
  qty: number;
}
export interface Brands {
  brand: string;
  multipleMembershipsPermitted: boolean;
  memberships: Memberships[];
  addOns: AddOns[];
}
export interface Discount {
  discountCode: string;
  type: string;
  price: Price;
  label: string;
}
export interface Memberships {
  id: string;
  price: Price;
  label: string;
}
export interface Price {
  value: number;
  vatRate: string;
  vatAmount: number;
  currency: string;
}

export interface AddOns {
  id: string;
  price: Price;
  label: string;
}
export interface PlanDetail {
  id: string;
  image: string;
  label: string;
  context: string;
  benefits: string;
  callInfo: string;
  task: string;
  rate: number;
}

export interface basketDetail {
  currency: string;
  value: number;
  vatAmount: number;
  vatRate: string;
}

export interface BrandResponse {
  id: string;
  coref: string;
  skipPayment: boolean;
}

export async function basketCode(
  request: BasketRequest
): Promise<BasketResponse> {
  const url = getApiUrl('/basket');
  const { data } = await Utilities.sendAxiosPostRequest(
    `${url}`,
    request,
    getApiKeyHeader()
  );
  return data;
}
