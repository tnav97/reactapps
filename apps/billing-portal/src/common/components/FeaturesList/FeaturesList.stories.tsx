import React from 'react';
import { Story } from '@storybook/react';
import FeaturesList, { FeaturesListProps } from './FeaturesList';

export default {
  title: 'Components/FeaturesList',
  component: FeaturesList,
};

const FeaturesListTemaplate: Story<FeaturesListProps> = (
  args: FeaturesListProps
) => (
  <div style={{ width: '600px' }}>
    <FeaturesList {...args} />
  </div>
);

export const ListOfFeatures = FeaturesListTemaplate.bind({});
ListOfFeatures.args = {
  featureItems: ['feature item 1', 'feature item 2', 'feature item 3'],
};
