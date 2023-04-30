import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
import { Button, StyleVariables } from '@alcumus/components';
import { TFunction } from 'i18next';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '1.5rem 0',
  },
  editableContent: {
    color: StyleVariables.colors.text.default,
    fontSize: StyleVariables.fonts.size.regular,
  },
}));

interface EditableContentProps {
  children: React.ReactNode;
  className?: string;
  onEdit?: (callback) => void;
  disableEditButton?: boolean;
  t: TFunction;
  'data-testid'?: string;
}

export default function EditableContent({
  children,
  className,
  onEdit,
  disableEditButton = false,
  t,
  'data-testid': dataTestId,
}: EditableContentProps) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.container, className)}>
      <div className={classes.editableContent}>{children}</div>
      <Button
        rounded
        variant="outlined"
        onClick={onEdit}
        disabled={disableEditButton}
        data-testid={dataTestId || 'editContentsButton'}
      >
        {t('edit')}
      </Button>
    </div>
  );
}
