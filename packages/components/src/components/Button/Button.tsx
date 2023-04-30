import React, { ReactNode } from 'react';
import { Button as BaseButton } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import styleVariables from '../../styles/variables';
import clsx from 'clsx';
import ButtonLoadingIndicator from './ButtonLoadingIndicator';

export type ButtonVariant = 'outlined' | 'contained' | 'critical' | 'text';

export interface ButtonProps {
  variant?: ButtonVariant;
  rounded?: boolean;
  uppercase?: boolean;
  disabled?: boolean;
  onClick?: Function;
  children: ReactNode;
  fullWidth?: boolean;
  className?: string;
  size?: 'small' | 'medium' | 'large';
  href?: string;
  [x: string]: string | undefined | boolean | ReactNode | Function;
  showLoadingIndicator?: boolean;
}

const useStyles = makeStyles({
  button: {
    textTransform: 'none',
    fontFamily: styleVariables.fonts.family.heading,
    fontWeight: styleVariables.fonts.weight.semiBold,
    paddingLeft: '24px',
    paddingRight: '24px',
    '&:focus-visible': {
      outline: '-webkit-focus-ring-color auto 1px',
      outlineOffset: '3px',
    },
  },
  buttonSmall: {
    paddingTop: '7px',
    paddingBottom: '7px',
    fontSize: styleVariables.fonts.size.small,
  },
  buttonMedium: {
    paddingTop: '10px',
    paddingBottom: '10px',
    fontSize: styleVariables.fonts.size.regular,
  },
  buttonLarge: {
    paddingTop: '12px',
    paddingBottom: '12px',
    fontSize: styleVariables.fonts.size.h5,
  },
  textUppercase: {
    textTransform: 'uppercase',
  },
  rounded: {
    borderRadius: '50px',
  },
  filled: {
    backgroundColor: styleVariables.colors.action.primary.default,
    color: styleVariables.colors.text.secondary,
    '&:hover, &:hover.Mui-disabled': {
      // Please keep the above CSS selector, it is important to show correct hover state on mobiles
      backgroundColor: styleVariables.colors.action.primary.hover,
    },
    '&:active': {
      backgroundColor: styleVariables.colors.action.primary.pressed,
    },
    '&.Mui-disabled': {
      backgroundColor: styleVariables.colors.action.primary.disabled,
      color: styleVariables.colors.text.secondary,
    },
  },
  critical: {
    backgroundColor: styleVariables.colors.action.critical.default,
    color: styleVariables.colors.text.secondary,
    '&:hover, &:hover.Mui-disabled': {
      // Please keep the above CSS selector, it is important to show correct hover state on mobiles
      backgroundColor: styleVariables.colors.action.critical.hover,
    },
    '&:active': {
      backgroundColor: styleVariables.colors.action.critical.pressed,
    },
    '&.Mui-disabled': {
      backgroundColor: styleVariables.colors.action.critical.disabled,
      color: styleVariables.colors.text.secondary,
    },
  },
  outlined: {
    backgroundColor: styleVariables.colors.action.secondary.default,
    color: styleVariables.colors.text.default,
    border: `1px solid ${styleVariables.colors.border.default}`,
    '&:hover, &:hover.Mui-disabled': {
      // Please keep the above CSS selector, it is important to show correct hover state on mobiles
      backgroundColor: styleVariables.colors.action.secondary.hover,
      border: `1px solid ${styleVariables.colors.border.default}`,
      boxSizing: 'border-box',
    },
    '&:active': {
      backgroundColor: styleVariables.colors.action.secondary.pressed,
    },
    '&.Mui-disabled': {
      backgroundColor: styleVariables.colors.action.secondary.disabled,
      color: styleVariables.colors.text.default,
    },
  },
});

export default function Button({
  variant = 'contained',
  onClick,
  className,
  children = null,
  uppercase = false,
  fullWidth = false,
  rounded = false,
  showLoadingIndicator = false,
  ...props
}: ButtonProps) {
  const classes = useStyles({});
  const buttonContent = showLoadingIndicator ? (
    <ButtonLoadingIndicator />
  ) : (
    children
  );
  let realVariant: ButtonVariant;
  if (variant === 'contained' || variant === 'critical') {
    realVariant = 'contained';
  } else {
    realVariant = variant === 'outlined' ? 'outlined' : 'text';
  }
  return (
    <BaseButton
      onClick={(e) => onClick && onClick(e)}
      disableElevation
      disableRipple
      classes={{
        // label: clsx({ [classes.textUppercase]: uppercase }),
        sizeSmall: classes.buttonSmall,
        sizeLarge: classes.buttonLarge,
        contained: clsx({
          [classes.filled]: variant === 'contained',
          [classes.critical]: variant === 'critical',
        }),
        outlined: classes.outlined,
        root: clsx([
          classes.button,
          rounded && classes.rounded,
          { [classes.buttonMedium]: props.size === 'medium' },
        ]),
      }}
      className={className}
      fullWidth={fullWidth}
      variant={realVariant}
      {...props}
    >
      {buttonContent}
    </BaseButton>
  );
}
