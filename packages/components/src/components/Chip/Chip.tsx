import { Chip as BaseChip } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import React from 'react';
import styleVariables from '../../styles/variables';

const useStyles = makeStyles({
  chip: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '6px 1px 6px 1px',
    gap: '4px',
    position: 'absolute',
    background: styleVariables.colors.surface.neutral.default,
    borderRadius: '20px',
  },
  label: {
    fontFamily: styleVariables.fonts.family.heading,
    fontWeight: styleVariables.fonts.weight.medium,
    fontSize: styleVariables.fonts.size.regular,
    paddingLeft: '5px',
    paddingRight: '5px',
    lineHeight: styleVariables.fonts.lineHeight.regular,
    letterSpacing: styleVariables.fonts.letterSpacing.regular,
    color: styleVariables.colors.base.text,
  },
});
export interface ChipProps {
  key?: string;
  label?: string;
  variant?: 'filled' | 'outlined';
  clickable?: boolean;
  onClick?: Function;
  onDelete?: Function;
  icon?: JSX.Element;
  deleteIcon?: JSX.Element;
  avatar?: JSX.Element;
  color?: 'default' | 'primary' | 'secondary';
  size?: 'small' | 'medium';
  className?: string;
}

export default function Chip({
  key,
  label,
  variant,
  onClick,
  onDelete,
  ...props
}: ChipProps) {
  const classes = useStyles({});
  return (
    <BaseChip
      key={key}
      label={label}
      classes={{
        label: classes.label,
        root: clsx([classes.chip]),
      }}
      variant={variant}
      onClick={(e) => onClick && onClick(e)}
      onDelete={(e) => onDelete && onDelete(e)}
      {...props}
    />
  );
}
