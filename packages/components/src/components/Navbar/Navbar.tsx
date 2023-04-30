import { Grid, Theme } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React from 'react';
import Image from '../Image';
import Button from '../Button';

const useStyles = makeStyles((theme: Theme) => ({
  logoContainer: {
    paddingTop: '1rem',
    paddingBottom: '1rem',
    textAlign: 'center',
  },
  logo: {
    width: '9.375rem',
    height: '6vh',
    [theme.breakpoints.down('sm')]: { width: '5.375rem', height: '5vh' },
  },
}));

export interface NavbarProps {
  withLoginButton?: boolean;
}

export default function Navbar({ withLoginButton = false }: NavbarProps) {
  const classes = useStyles();

  return (
    <Grid container spacing={4} justifyContent="space-between">
      <Grid item xs={6}>
        <Image
          data-testid="alcumusLogo"
          src="https://coredevuksstorage01.z33.web.core.windows.net/alcumus-logo-with-tagline.svg"
          alt="Alcumus - Safer, Healthier, Stronger"
          className={classes.logo}
        />
      </Grid>
      {withLoginButton && (
        <Grid
          item
          xs={6}
          container
          justifyContent="flex-end"
          alignItems="flex-start"
        >
          <Button
            variant="outlined"
            rounded={true}
            data-testid="loginBtn"
            onClick={() => window.location.assign('/api/redirects/login')}
          >
            Log In
          </Button>
        </Grid>
      )}
    </Grid>
  );
}
