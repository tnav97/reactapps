import React from 'react';
import { Story } from '@storybook/react';
import { OutlinedIcon, OutlinedIconProps } from './OutlinedIcon';

export default {
  title: 'Components/Icon/OutlinedIcon',
  component: OutlinedIcon,
};

const OutlinedIconTemplate: Story<OutlinedIconProps> = (props) => (
  <OutlinedIcon {...props} style={{ fontSize: '64px', padding: '50px' }} />
);

export const CloudySnowingIcon = OutlinedIconTemplate.bind({});
CloudySnowingIcon.args = {
  icon: 'face_unlock',
};
