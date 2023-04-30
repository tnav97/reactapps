import React from 'react';
import { Grid, Paper, Theme } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

export default {
  title: 'Style Guide/Elevation',
  component: 'Elevation',
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    marginTop: '40px',
    marginBottom: '40px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export function Elevations() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <Paper className={classes.paper} elevation={1}>
            elevation=1
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper} elevation={2}>
            elevation=2
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper} elevation={3}>
            elevation=3
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper} elevation={4}>
            elevation=4
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper} elevation={6}>
            elevation=6
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper} elevation={8}>
            elevation=8
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper} elevation={16}>
            elevation=16
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper} elevation={24}>
            elevation=24
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
