import { Utilities } from '@alcumus/core';
import { ChoosePlanRequest } from '../../common/types';
import getApiKeyHeader from '../../lib/utils/getApiKeyHeader';
import getApiUrl from '../../lib/utils/getApiUrl';
export interface ChoosePlanResponse {
  success: string;
  brands: Brands;
}

export interface Brands {
  brand: string;
  multipleMembershipsPermitted: boolean;
  memberships: Memberships[];
  addOns: AddOns[];
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
export async function chooseProductPlan(
  request: ChoosePlanRequest
): Promise<ChoosePlanResponse> {
  const url = getApiUrl('/product');
  const { data } = await Utilities.sendAxiosPostRequest(
    `${url}`,
    request,
    getApiKeyHeader()
  );
  return data;
}
