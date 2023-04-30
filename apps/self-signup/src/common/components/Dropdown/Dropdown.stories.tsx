import React from 'react';
import { Story } from '@storybook/react';
import Dropdown, { DropdownProps } from './Dropdown';
import { Text, StyleVariables } from '@alcumus/components';
import { makeStyles } from '@mui/styles';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
};

const useStyles = makeStyles({
  typography: {
    fontFamily: StyleVariables.fonts.family.heading,
  },
});

const DropdownTemplate: Story<DropdownProps> = (props) => {
  const classes = useStyles();
  return (
    <Text component="span" variant="h5" className={classes.typography}>
      I am a
      <Dropdown {...props} classes={{ menu: classes.typography }} />
    </Text>
  );
};

export const Empty = DropdownTemplate.bind({});
Empty.args = {
  options: ['Option 1', 'Option 2', 'Option 3'],
};
Empty.argTypes = {
  onSelect: { action: 'select' },
};

export const EmptyWithCustomAllowed = DropdownTemplate.bind({});
EmptyWithCustomAllowed.args = {
  options: ['Option 1', 'Option 2', 'Option 3'],
  customValueLabel: 'None of the above? Enter below:',
};
EmptyWithCustomAllowed.argTypes = {
  onSelect: { action: 'select' },
  onCustomValue: { action: 'select' },
};

export const Filled = DropdownTemplate.bind({});
Filled.args = {
  value: 'Selected Option',
  options: ['Option 1', 'Option 2', 'Option 3'],
};
Filled.argTypes = {
  onSelect: { action: 'select' },
};
