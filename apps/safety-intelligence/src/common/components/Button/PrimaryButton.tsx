import {
  StyleVariables,
  Text,
  Button as BaseButton,
} from '@alcumus/components';
import { makeStyles } from '@mui/styles';
import React from 'react';

interface Props {
  text: string;
  ariaLabel: string;
  onClick?: (e) => void;
  disabled?: boolean;
  id: string;
}
const useStyles = makeStyles(() => ({
  buttonBase: {
    borderRadius: 100,
    padding: '8px 24px',
  },
  buttonText: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    lineHeight: StyleVariables.fonts.lineHeight.h5,
  },
}));
export function PrimaryButton({
  id,
  text,
  ariaLabel,
  onClick,
  disabled,
}: Props) {
  const classes = useStyles();

  return (
    <BaseButton
      aria-label={ariaLabel}
      uppercase={false}
      rounded
      className={classes.buttonBase}
      size="medium"
      disabled={disabled}
      data-testid={id}
      id={id}
      onClick={(e) => onClick && onClick(e)}
    >
      <Text center className={classes.buttonText}>
        {text}
      </Text>
    </BaseButton>
  );
}
