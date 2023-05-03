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
    [Breakpoints.down('sm')]: {
      display: 'none',
    },
    [Breakpoints.down('lg')]: {
      backgroundImage: `url(/images/tablet_man_van.png)`,
      backgroundSize: `cover`,
      minHeight: '100vh',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right',
    },
  },
}));

export default function MotoRightHomeSection() {
  const classes = useStyles();
  return <Grid item md={4} lg={6} className={classes.containerImage}></Grid>;
}
