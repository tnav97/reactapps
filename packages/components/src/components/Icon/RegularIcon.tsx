import React from 'react';
import { Icon } from './Icon';
import { RegularIconType } from './generated/RegularIconType';

export interface RegularIconProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  icon: RegularIconType;
}

export function RegularIcon({ icon, ...rest }: RegularIconProps) {
  return <Icon icon={icon} filled={true} {...rest} />;
}
