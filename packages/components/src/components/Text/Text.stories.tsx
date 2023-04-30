import React from 'react';
import { Story } from '@storybook/react';
import Text, { TextProps } from './Text';

const Template: Story<TextProps> = (args) => <Text {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'This is a text',
  uppercase: false,
  center: false,
  bold: false,
  italic: false,
  underline: false,
};

export default {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    as: {
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'p',
        'small',
        'span',
        'strong',
        'b',
        'i',
        'u',
      ],
      control: { type: 'radio' },
    },
    uppercase: {
      control: { type: 'boolean' },
    },
    center: {
      control: { type: 'boolean' },
    },
  },
};
