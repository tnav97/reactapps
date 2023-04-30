import { BillingFrequency } from './billingFrequency';

export interface BaseEntity {
  id: string;
  createdAt: string;
  modifiedAt: string;
  deletedAt: string | null;
}

export interface Price extends BaseEntity {
  externalId: string;
  price: number;
  currency: string;
  billingFrequency: BillingFrequency;
  plan?: Plan;
}

export interface Plan extends BaseEntity {
  name: string;
  productId: string;
  maxSeats: number;
  prices: Price[];
  product?: Product;
}

export interface Product extends BaseEntity {
  name: string;
}
