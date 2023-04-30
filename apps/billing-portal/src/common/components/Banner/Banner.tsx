import { StyleVariables, Text } from '@alcumus/components';
import { makeStyles } from '@mui/styles';
import React from 'react';

export interface BannerProps {
  texts: {
    heading: string;
    body: string;
  };
  illustration?: {
    src: string;
    alt: string;
  };
  children: JSX.Element;
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    padding: '24px',
    border: '2px solid',
    borderColor: StyleVariables.colors.border.default,
    borderRadius: '8px',
    backgroundColor: StyleVariables.colors.surface.default,
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
  content: {
    flexGrow: 1,
    marginRight: '64px',
    '& > :not(:first-child)': {
      marginTop: '24px',
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: 0,
    },
  },
  heading: {
    fontWeight: 600,
  },
  illustration: {
    flexBasis: '200px',
    [theme.breakpoints.down('sm')]: {
      margin: '24px',
    },
  },
}));

export default function Banner({ texts, illustration, children }: BannerProps) {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.content}>
        <Text as="h4" className={classes.heading}>
          {texts.heading}
        </Text>
        <Text as="p">{texts.body}</Text>
        {children}
      </div>
      {illustration && illustration.src && (
        <img
          src={illustration.src}
          alt={illustration.alt}
          className={classes.illustration}
        />
      )}
    </div>
  );
}
