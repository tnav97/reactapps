import React from 'react';
import Chip, { ChipProps } from './Chip';
import { Story } from '@storybook/react';
import DeleteIcon from '@mui/icons-material/Delete';
import FaceIcon from '@mui/icons-material/Face';

export default {
  component: Chip,
  title: 'Components/Chip',
};

const Template: Story<ChipProps> = (args) => <Chip {...args}>Chip</Chip>;

export const Default = Template.bind({});
Default.args = {
  variant: 'filled',
  label: 'Chip',
  deleteIcon: <DeleteIcon />,
};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  label: 'Chip',
  icon: <FaceIcon />,
};
