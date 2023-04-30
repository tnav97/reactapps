import React from 'react';
import { Story } from '@storybook/react';
import { Grid } from '@mui/material';
import PlanCard, { PlanCardProps } from './PlanCard';
import { Page } from '@alcumus/components';

export default {
  title: 'Components/PlanCard',
  component: PlanCard,
};

const ProductPlanTemplate: Story<PlanCardProps> = (args: PlanCardProps) => (
  <Page>
    <Grid container justifyContent="center">
      <Grid item xs={12} md={3}>
        <PlanCard {...args} />
      </Grid>
    </Grid>
  </Page>
);

export const ProductPlanStandard = ProductPlanTemplate.bind({});
ProductPlanStandard.args = {
  name: 'Standard',
  price: '$20',
  features: [
    'All the ‘Starter’ perks ',
    'Documents',
    'Training management',
    'Access to our technical support desk during business hours',
    'Access to our monthly product knowledge sharing sessions',
  ],
  badge: 'Recommended',
  priceDescription: 'User/month',
  billingDetails: 'billed monthly',
  buttonText: 'Get Started',
};

export const ProductPlanPremium = ProductPlanTemplate.bind({});
ProductPlanPremium.args = {
  name: 'Premium',
  features: [
    'All the ‘Standard’ perks ',
    'Hazzard assessments',
    'Programs (IOS,COR,OSHA)',
    'Asset management',
  ],
  buttonText: 'Get Started',
};
