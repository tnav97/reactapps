import React from 'react';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';

import Text from '../Text';
import styleVariables from '../../styles/variables';
import { RegularIcon } from '../Icon';

export interface CheckedItem {
  header: string;
  details: string;
}

export interface CheckedItemProps
  extends CheckedItem,
    React.HTMLAttributes<HTMLDivElement> {}

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
  },
  checkIcon: {
    marginRight: styleVariables.spacing(2),
    marginTop: styleVariables.spacing(0.4),
    color: styleVariables.colors.icon.success,
  },
  title: { color: styleVariables.colors.text.info },
  details: { color: styleVariables.colors.text.default },
  checkItem: { fontWeight: styleVariables.fonts.weight.medium },
});

export default function CheckedItem({
  header,
  details,
  className,
  ...rest
}: CheckedItemProps) {
  const classes = useStyles();

  return (
    <div className={clsx(className, classes.wrapper)} {...rest}>
      <RegularIcon icon="check_circle" className={classes.checkIcon} />
      <div>
        <Text
          as="h5"
          data-testid={`title${header}`}
          className={clsx(classes.checkItem, classes.title)}
        >
          {header}
        </Text>
        <Text className={clsx(classes.checkItem, classes.details)} as="h5">
          {details}
        </Text>
      </div>
    </div>
  );
}
