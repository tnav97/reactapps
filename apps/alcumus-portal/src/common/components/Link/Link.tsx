import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import { StyleVariables } from '@alcumus/components';

interface LinkComponentProps {
  to: string;
  target?: string;
  className?: string;
  rel?: string;
  children: React.ReactNode;
  [x: string]: any;
}

const useStyles = makeStyles(() => ({
  link: {
    color: StyleVariables.colors.action.primary.default,
    fontFamily: StyleVariables.fonts.family.heading,
    fontSize: StyleVariables.fonts.size.regular,
    fontWeight: StyleVariables.fonts.weight.bold,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
    },
  },
}));

export default function LinkComponent({
  to,
  target,
  rel,
  className,
  children,
  ...rest
}: LinkComponentProps) {
  const classes = useStyles();

  return target ? (
    <a
      href={to}
      target={target}
      className={clsx(classes.link, className)}
      rel={rel}
      {...rest}
    >
      {children}
    </a>
  ) : (
    <Link to={to} className={clsx(classes.link, className)} rel={rel} {...rest}>
      {children}
    </Link>
  );
}
