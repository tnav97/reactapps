import React from 'react';
import { Grid } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  containerImage: {
    backgroundImage: `url(/images/manvanLogo.png)`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `cover`,
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    [theme.breakpoints.down('lg')]: {
      backgroundImage: `url(/images/tablet_man_van.png)`,
      backgroundSize: `cover`,
      minHeight: '100vh',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right',
    },
  },
}));

export default function RightHomeSection() {
  const classes = useStyles();
  return <Grid item md={4} lg={6} className={classes.containerImage}></Grid>;
}
