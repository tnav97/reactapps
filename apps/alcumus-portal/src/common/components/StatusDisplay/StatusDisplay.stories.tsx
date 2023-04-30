import React from 'react';
import { Story } from '@storybook/react';
import { MemberStatus } from '../../constants';
import { StatusDisplayProps } from './StatusDisplay';
import StatusDisplay from './index';

export default {
  component: StatusDisplay,
  title: 'Components/StatusDisplay',
};

const Template: Story<StatusDisplayProps> = (args) => (
  <StatusDisplay {...args} />
);

export const critical = Template.bind({});
critical.args = {
  status: MemberStatus.CANCELED,
};

export const success = Template.bind({});
success.args = {
  status: MemberStatus.ACTIVE,
};

export const pending = Template.bind({});
pending.args = {
  status: MemberStatus.PENDING_INVITE,
};

export const invited = Template.bind({});
invited.args = {
  status: MemberStatus.PENDING_ACCEPTANCE,
};

export const disabled = Template.bind({});
disabled.args = {
  status: MemberStatus.DISABLED,
};

export const expired = Template.bind({});
expired.args = {
  status: MemberStatus.INVITE_EXPIRED,
};
