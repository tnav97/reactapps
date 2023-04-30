import Page from '../Page';
import { Grid } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import styleVariables from '../../styles/variables';
import Navbar from '../Navbar';

const useStyles = makeStyles(() => ({
  page: {
    backgroundColor: styleVariables.colors.white,
    padding: 0,
  },
  gridContainer: {
    fontFamily: styleVariables.fonts.family.heading,
    fontStyle: 'normal',
    padding: '1rem',
  },
}));

interface PageWithNavbarProps {
  children?: React.ReactNode;
  withLoginButton?: boolean;
}

export default function PageWithNavbar({
  children,
  withLoginButton,
}: PageWithNavbarProps) {
  const classes = useStyles();

  return (
    <Page className={classes.page}>
      <Grid container className={classes.gridContainer}>
        <Grid item xs={12}>
          <Navbar withLoginButton={withLoginButton} />
        </Grid>
      </Grid>
      {children}
    </Page>
  );
}
