import React from 'react';
import { StyleVariables } from '@alcumus/components';
import { Grid, LinearProgress } from '@mui/material';

import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  gridImage: {
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  LoadingImage: {
    width: '30vw',
    marginLeft: '-25px',
    [theme.breakpoints.down('sm')]: {
      width: '45vw',
    },
  },
  progress: {
    width: '35vw',
    backgroundColor: StyleVariables.colors.surface.neutral.default,
    height: '8px',
    borderRadius: '5px',
    marginTop: '9%',
    [theme.breakpoints.down('sm')]: {
      width: '30vw',
      backgroundColor: StyleVariables.colors.surface.neutral.default,
      height: '6px',
      borderRadius: '5px',
      marginTop: '9%',
      marginLeft: '30%',
    },
  },
  progressBar: {
    backgroundColor: StyleVariables.colors.action.primary.default,
  },
  LoadingText: {
    marginTop: '2rem',
    fontWeight: 500,
    letterSpacing: '0.0005em',
    textAlign: 'center',
  },
  AlignProgressText: {
    marginLeft: '30%',
  },
}));

export default function Loading() {
  const classes = useStyles();

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={classes.gridImage}
    >
      <Grid>
        <img
          src="/images/alcumus-logo-with-tagline.svg"
          className={classes.LoadingImage}
        />
      </Grid>
      <Grid className="AlignProgressText">
        <LinearProgress
          variant="indeterminate"
          data-testid="activateAccountPageIndicator"
          className={classes.progress}
          classes={{
            bar1Indeterminate: classes.progressBar,
            bar2Indeterminate: classes.progressBar,
          }}
        />
        <Grid alignItems="center" justifyContent="center">
          <p className={classes.LoadingText}>
            Loading recommended pricing plan...
          </p>
        </Grid>
      </Grid>
    </Grid>
  );
}
