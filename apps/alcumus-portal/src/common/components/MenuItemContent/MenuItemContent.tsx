import React from 'react';
import { makeStyles } from '@mui/styles';
import {
  OutlinedIcon,
  OutlinedIconType,
  StyleVariables,
  Text,
} from '@alcumus/components';

export interface MenuItemContentProps {
  title?: string;
  icon?: OutlinedIconType;
  critical?: boolean;
}

const useStyles = makeStyles({
  container: { display: 'flex' },
  icon: {
    marginRight: StyleVariables.spacing(1),
    color: (critical) =>
      critical
        ? StyleVariables.colors.icon.critical
        : StyleVariables.colors.icon.default,
  },
  title: {
    color: (critical) =>
      critical
        ? StyleVariables.colors.text.critical
        : StyleVariables.colors.text.default,
  },
});

export function MenuItemContent({
  title,
  icon,
  critical = false,
}: MenuItemContentProps) {
  const classes = useStyles(critical);
  return (
    <div className={classes.container}>
      {icon && <OutlinedIcon icon={icon} className={classes.icon} />}
      {title && <Text className={classes.title}>{title}</Text>}
    </div>
  );
}
