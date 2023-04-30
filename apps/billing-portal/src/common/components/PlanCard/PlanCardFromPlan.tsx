import { TFunction } from 'i18next';
import React from 'react';
import { BillingFrequency } from '../../../types/billingFrequency';
import { Plan } from '../../../types/plans';
import PlanCard from './PlanCard';
import calculateYearlySavings from '../../../lib/utils/calculateYearlySavings';
import getMonthlyChargedAmount from '../../../lib/utils/getMonthlyChargedAmount';

export interface PlanCardFromPlanProps {
  t: TFunction;
  plan: Plan;
  billingFrequency: BillingFrequency;
  isRecommended: boolean;
  onSelected: (plan: Plan) => void;
}

export default function PlanCardFromPlan({
  plan,
  billingFrequency,
  isRecommended,
  t,
  onSelected,
}: PlanCardFromPlanProps) {
  const price = plan.prices.find(
    (price) => price.billingFrequency === billingFrequency
  );

  if (!price) {
    return null;
  }

  const translateAmount = (tKey: string, amount: number) => {
    return t(tKey, {
      amount,
      formatParams: {
        amount: { currency: price.currency, minimumFractionDigits: 0 },
      },
    });
  };

  const amount = getMonthlyChargedAmount(price);

  const savings =
    billingFrequency === BillingFrequency.YEARLY &&
    calculateYearlySavings(plan);

  return (
    <PlanCard
      badge={isRecommended ? t('recommended') : undefined}
      name={plan.name}
      price={translateAmount('price', amount)}
      priceDescription={t('priceDescription')}
      billingDetails={t(`billingFrequency.${price.billingFrequency}`)}
      savings={
        savings && savings > 0 ? translateAmount('savings', savings) : undefined
      }
      features={t(`planFeatures.${plan.name.toLowerCase()}`, {
        returnObjects: true,
      })}
      buttonText={t('getStarted')}
      onButtonClick={() => onSelected(plan)}
    />
  );
}
