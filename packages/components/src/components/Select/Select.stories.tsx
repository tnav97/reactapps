import React from 'react';
import { Story } from '@storybook/react';
import Select, { SelectProps } from './Select';
import Page from '../Page';

export default {
  title: 'Components/Select',
  component: Select,
};

const SelectTemplate: Story<SelectProps> = (args: SelectProps) => (
  <Page>
    <div style={{ width: '200px' }}>
      <Select {...args} />
    </div>
  </Page>
);

export const selectPlan = SelectTemplate.bind({});
selectPlan.args = {
  items: [
    { id: 'montly', name: 'monthly' },
    { name: 'yearly', id: 'yearly' },
  ],
  label: 'plans',
  helperText: 'helper text',
  required: true,
};

export const multipleSelect = SelectTemplate.bind({});
multipleSelect.args = {
  items: [
    { id: 'monthly', name: 'monthly' },
    { name: 'yearly', id: 'yearly' },
  ],
  value: ['yearly'],
  multiple: true,
  label: 'plans',
  required: true,
};
