import React from 'react';
import { Story } from '@storybook/react';
import { RegularIcon, RegularIconProps } from './RegularIcon';

export default {
  title: 'Components/Icon/RegularIcon',
  component: RegularIcon,
};

const RegularIconTemplate: Story<RegularIconProps> = (props) => (
  <RegularIcon {...props} style={{ fontSize: '64px', padding: '50px' }} />
);

export const CloudySnowingIcon = RegularIconTemplate.bind({});
CloudySnowingIcon.args = {
  icon: 'cloudy_snowing',
};
