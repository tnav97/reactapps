import React from 'react';
import { Grid } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  containerImage: {
    backgroundImage: `url(/images/manvanLogo.png)`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `cover`,
    minHeight: '100vh',
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
    [theme.breakpoints.down('xl')]: {
      backgroundSize: 'contain',
    },
  },
}));

export default function MotoRightOrderComponentSection() {
  const classes = useStyles();
  return <Grid item md={6} className={classes.containerImage}></Grid>;
}
