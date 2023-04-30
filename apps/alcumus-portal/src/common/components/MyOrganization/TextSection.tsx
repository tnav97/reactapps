import React from 'react';
import { makeStyles } from '@mui/styles';
import { StyleVariables, Text } from '@alcumus/components';
import { TFunction } from 'i18next';

export interface TextSectionProps {
  textValue?: string;
  dataTestId?: string;
  t: TFunction;
}

const useStyles = makeStyles(() => ({
  empty: {
    color: StyleVariables.colors.text.disabled,
  },
}));

export default function TextSection({
  textValue,
  dataTestId,
  t,
}: TextSectionProps) {
  const classes = useStyles();
  return (
    <Text
      as="p"
      data-testid={dataTestId?.length ? dataTestId : undefined}
      className={textValue?.length ? undefined : classes.empty}
    >
      {textValue?.length ? textValue : t('notEntered')}
    </Text>
  );
}
