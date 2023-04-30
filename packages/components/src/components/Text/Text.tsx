import React from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';
import { Variant } from '@mui/material/styles/createTypography';

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'strong'
  | 'small'
  | 'b'
  | 'i'
  | 'u';

const useStyles = makeStyles(() => ({
  uppercase: {
    textTransform: 'uppercase',
  },
  center: {
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  underline: {
    textDecoration: 'underline',
  },
}));

export interface TextProps {
  as?: TextVariant;
  children?: React.ReactNode;
  uppercase?: boolean;
  center?: boolean;
  className?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  [x: string]: any;
}

export default function Text({
  as: HtmlTag = 'p',
  children = ' ',
  className,
  uppercase = false,
  center = false,
  bold = false,
  italic = false,
  underline = false,
  ...rest
}: TextProps) {
  const classes = useStyles();

  const lowercasedTag = HtmlTag.toLowerCase();

  let typographyVariant = 'body1';
  if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(lowercasedTag)) {
    typographyVariant = lowercasedTag;
  } else if (
    ['strong', 'span', 'small', 'b', 'i', 'u'].includes(lowercasedTag)
  ) {
    typographyVariant = 'body2';
  }

  return (
    <Typography
      variant={typographyVariant as Variant}
      component={lowercasedTag as TextVariant}
      className={clsx(
        {
          [classes.uppercase]: uppercase,
          [classes.center]: center,
          [classes.bold]: bold || ['strong', 'b'].includes(lowercasedTag),
          [classes.italic]: italic || lowercasedTag === 'i',
          [classes.underline]: underline || lowercasedTag === 'u',
        },
        className
      )}
      {...rest}
    >
      {children}
    </Typography>
  );
}
