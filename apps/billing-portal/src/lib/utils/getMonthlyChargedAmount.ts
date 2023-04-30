import { Price } from '../../types/plans';
import { BillingFrequency } from '../../types/billingFrequency';

export default function getMonthlyChargedAmount(price: Price) {
  let amount = price.price;
  if (price.billingFrequency === BillingFrequency.YEARLY) {
    amount = price.price / 12;
  }

  return amount / 100;
}
