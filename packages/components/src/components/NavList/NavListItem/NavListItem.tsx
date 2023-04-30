import React from 'react';
import { Text, StyleVariables } from '../../../index';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

export interface NavListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  isSelected?: boolean;
}

const useStyles = makeStyles({
  container: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  selected: {
    color: StyleVariables.colors.text.info,
    fontWeight: StyleVariables.fonts.weight.semiBold,
    cursor: 'pointer',
  },
  notSelected: {
    color: StyleVariables.colors.text.default,
    marginLeft: StyleVariables.spacing(1.75),
    cursor: 'pointer',
  },
  verticalLine: {
    marginRight: StyleVariables.spacing(1),
    width: StyleVariables.spacing(0.75),
    height: StyleVariables.spacing(3),
    backgroundColor: StyleVariables.colors.icon.info,
  },
});

export default function NavListItem({
  label,
  isSelected = false,
  className,
  ...rest
}: NavListItemProps) {
  const classes = useStyles();

  return (
    <div className={clsx([className, classes.container])} {...rest}>
      {isSelected && <div className={classes.verticalLine} />}
      <Text
        data-testid="nav-item-label"
        className={isSelected ? classes.selected : classes.notSelected}
        as={isSelected ? 'h6' : 'p'}
      >
        {label}
      </Text>
    </div>
  );
}
