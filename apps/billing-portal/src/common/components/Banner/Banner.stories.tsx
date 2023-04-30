import { Button, Page } from '@alcumus/components';
import { Launch } from '@mui/icons-material';
import { Story } from '@storybook/react';
import React from 'react';
import Banner, { BannerProps } from './Banner';
import {
  paymentBannerIllustration,
  upgradeBannerIllustration,
} from '../../constants/images';

export default {
  title: 'Components/Banner',
  component: Banner,
};

const BannerTemplate: Story<BannerProps> = (args: BannerProps) => (
  <div style={{ width: '1200px' }}>
    <Page>
      <Banner {...args} />
    </Page>
  </div>
);

export const UpgradePrompt = BannerTemplate.bind({});
UpgradePrompt.args = {
  texts: {
    heading: 'You’re missing out on the full power of Alcumus eCompliance',
    body: `You are currently using a free account with functionality limitations. 
    To unlock the full power of Alcumus eCompliance, we encourge you to explore our pricing plans and upgrade your account.`,
  },
  illustration: {
    src: upgradeBannerIllustration,
    alt: 'Upgrade',
  },
  children: (
    <div style={{ display: 'flex' }}>
      <Button
        onClick={() => ({})}
        variant="outlined"
        rounded={true}
        style={{ 'margin-right': '16px' }}
      >
        Dismiss
      </Button>
      <Button onClick={() => ({})} rounded={true}>
        Explore our plans
      </Button>
    </div>
  ),
};

export const FailedPaymentPrompt = BannerTemplate.bind({});
FailedPaymentPrompt.args = {
  texts: {
    heading: 'Oops.... it looks like your payment status is ‘overdue’',
    body: 'This may be due to an expired card or a failed transaction. To learn more click the button below.',
  },
  illustration: {
    src: paymentBannerIllustration,
    alt: 'Payment issue',
  },
  children: (
    <div style={{ display: 'flex' }}>
      <Button onClick={() => ({})} rounded={true}>
        View my payments &nbsp; <Launch />
      </Button>
    </div>
  ),
};
