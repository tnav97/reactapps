import { BillingFrequency } from '../../types/billingFrequency';
import { Plan } from '../../types/plans';

export default function calculateYearlySavings(plan: Plan): number {
  const monthlyPrice = plan.prices.find(
    (price) => price.billingFrequency === BillingFrequency.MONTHLY
  );
  const yearlyPrice = plan.prices.find(
    (price) => price.billingFrequency === BillingFrequency.YEARLY
  );

  if (monthlyPrice && yearlyPrice) {
    return (monthlyPrice.price * 12 - yearlyPrice.price) / 100;
  }

  return 0;
}
