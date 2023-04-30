import React from 'react';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import RegisterForm from '../RegisterForm';
import { Page, Navbar, StyleVariables } from '@alcumus/components';
interface StyleProps {
  backdropUrl: string;
}

const useStyles = makeStyles({
  page: {
    backgroundColor: StyleVariables.colors.surface.default,
    padding: 0,
    fontFamily: StyleVariables.fonts.family.heading,
  },
  wrapper: {
    padding: '1rem',
    height: '100vh',
    overflow: 'auto',
  },
  backdrop: {
    backgroundImage: (props: StyleProps) => `url(${props.backdropUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
});

export default function RegisterPage() {
  const classes = useStyles({
    backdropUrl: '/images/register-page-backdrop-full.jpg',
  });

  return (
    <Page className={classes.page}>
      <Grid container>
        <Grid item md={7} className={classes.wrapper}>
          <Navbar withLoginButton={true} />
          <RegisterForm />
        </Grid>
        <Grid item md={5} className={classes.backdrop} />
      </Grid>
    </Page>
  );
}
