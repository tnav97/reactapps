import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';

type FlexDirection =
  | 'row'
  | 'row-reverse'
  | 'column'
  | 'column-reverse'
  | 'initial'
  | 'inherit'
  | 'revert'
  | 'unset';

interface CenterStyleProps {
  direction: FlexDirection;
}

const useStyles = makeStyles(() => ({
  centered: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: (props: CenterStyleProps) => props.direction,
  },
}));

interface CenterProps {
  children: React.ReactNode;
  /** An optional className you can provide to override styles */
  className?: string;
  /** Direction of the content laid out in flex container. Default is "row" */
  direction?: FlexDirection;
  [x: string]: any;
}

/**
 * Center content with flex container layout
 */
export default function Center({
  children,
  className,
  direction = 'row',
  ...rest
}: CenterProps) {
  const classes = useStyles({
    direction,
  });
  return (
    <div className={clsx(classes.centered, className)} {...rest}>
      {children}
    </div>
  );
}
