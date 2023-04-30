import React from 'react';
import { Icon } from './Icon';
import { OutlinedIconType } from './generated/OutlinedIconType';

export interface OutlinedIconProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  icon: OutlinedIconType;
  className?: string;
}

export function OutlinedIcon({ icon, ...rest }: OutlinedIconProps) {
  return <Icon icon={icon} filled={false} {...rest} />;
}
