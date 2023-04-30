import { BaseEntity, Price } from './plans';

export interface SubscriptionDto extends BaseEntity {
  billingAccountId: string;
  status: string;
  externalId: string;
  seats: number;
  cardNumber: string;
  cardExpiry: string;
  previousPaymentDate: Date;
  nextPaymentDate?: Date;
  price: Price;
}
