import React from 'react';
import clsx from 'clsx';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon: string;
  filled: boolean;
}

/**
 * Render a Material Design Icon, used by RegularIcon and OutlinedIcon
 * @param icon Note: this param is a string and does not provide type hints
 * @param filled
 * @param className
 * @param rest
 * @constructor
 */
export function Icon({ icon, filled, className, ...rest }: IconProps) {
  return (
    <span
      className={clsx([
        filled ? 'material-icons' : 'material-icons-outlined',
        className,
      ])}
      data-testid={`icon-${icon}`}
      {...rest}
    >
      {icon}
    </span>
  );
}
