import React from 'react';
import { Grid } from '@mui/material';
import { createTheme} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const Breakpoints = createTheme().breakpoints;
const useStyles = makeStyles((theme) => ({
  containerImage: {
    backgroundImage: `url(/images/manvanLogo.png)`,
    backgroundRepeat: `no-repeat`,
    backgroundSize: `cover`,
    minHeight: '100vh',
    [Breakpoints.down('lg')]: {
      display: 'none',
    },
    [Breakpoints.down('xl')]: {
      backgroundSize: 'contain',
    },
  },
}));

export default function MotoRightOrderComponentSection() {
  const classes = useStyles();
  return <Grid item md={6} className={classes.containerImage}></Grid>;
}
