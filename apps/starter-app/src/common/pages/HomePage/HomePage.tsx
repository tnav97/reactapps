import React from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import { Page, StyleVariables } from '@alcumus/components';
import Message from '../../components/Message';

const useStyles = makeStyles(() => ({
  title: {
    color: StyleVariables.colors.action.primary.default,
  },
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <Page>
      <Typography variant="h1" className={classes.title}>
        Welcome to Starter App
      </Typography>
      <Message />
    </Page>
  );
}
