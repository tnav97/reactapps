import React from 'react';
import { makeStyles } from '@mui/styles';
import styleVariables from '../../styles/variables';
import Text from '../Text';
import {
  OutlinedIcon,
  OutlinedIconType,
  RegularIcon,
  RegularIconType,
} from '../Icon';
import clsx from 'clsx';

export interface CheckBannerItem {
  title: string;
  checked: boolean;
}

export interface CheckedBannerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: Array<CheckBannerItem>;
  header?: string;
}

const useStyles = makeStyles({
  wrapper: {
    borderRadius: styleVariables.spacing(1),
    backgroundColor: styleVariables.colors.base.background,
    padding: `${styleVariables.spacing(1)} ${styleVariables.spacing(2)}`,
    color: styleVariables.colors.text.default,
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: styleVariables.spacing(0.5),
    marginLeft: styleVariables.spacing(0.3),
  },
  checkIcon: {
    color: styleVariables.colors.base.success,
    fontSize: styleVariables.spacing(2.5),
  },
  closeIcon: {
    color: styleVariables.colors.icon.default,
    fontSize: styleVariables.spacing(2.5),
  },
  icon: { marginRight: styleVariables.spacing(1.5) },
  header: { marginBottom: styleVariables.spacing(1) },
});

export default function CheckBanner({
  items,
  className,
  header,
  ...rest
}: CheckedBannerProps) {
  const classes = useStyles();
  const Icon = (
    icon: OutlinedIconType | RegularIconType,
    className: string,
    outline = false
  ): JSX.Element =>
    outline ? (
      <OutlinedIcon
        icon={icon as OutlinedIconType}
        className={clsx(classes.icon, className)}
      />
    ) : (
      <RegularIcon
        icon={icon as RegularIconType}
        className={clsx(classes.icon, className)}
      />
    );

  const checkIcon: JSX.Element = Icon('check_circle', classes.checkIcon);
  const closeIcon: JSX.Element = Icon('close', classes.closeIcon, true);

  return (
    <div className={clsx(className, classes.wrapper)} {...rest}>
      {header && (
        <div className={classes.header}>
          <Text>{header}</Text>
        </div>
      )}
      {items.map(({ title, checked }) => (
        <div key={title} className={classes.item}>
          {checked ? checkIcon : closeIcon}
          <Text>{title}</Text>
        </div>
      ))}
    </div>
  );
}
