import {
  StyleVariables,
  Text,
  Button as BaseButton,
} from '@alcumus/components';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import React from 'react';

interface Props {
  onClick?: (e) => void;
  className?: string;
}
const useStyles = makeStyles(() => ({
  buttonBase: {
    borderRadius: 205,
    padding: '8px 24px',
  },
  buttonText: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    lineHeight: StyleVariables.fonts.lineHeight.h5,
  },
}));
export function CancelButton({ onClick, className }: Props) {
  const classes = useStyles();
  const { t } = useTranslation(['translation', 'AriaLabels']);

  return (
    <BaseButton
      aria-label={t('cancel', { ns: 'AriaLabels' })}
      uppercase={false}
      rounded
      className={clsx(classes.buttonBase, className)}
      size="medium"
      data-testid="cancelButton"
      variant="outlined"
      onClick={(e) => onClick && onClick(e)}
    >
      <Text center className={classes.buttonText}>
        {t('cancel', { ns: 'translation' })}
      </Text>
    </BaseButton>
  );
}
