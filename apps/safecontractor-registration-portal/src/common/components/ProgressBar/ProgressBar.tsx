import React from 'react';
import { StyleVariables } from '@alcumus/components';
import { Grid, makeStyles, withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

interface ProgressBarSection {
  progress?: number;
}

const BorderLinearProgress = withStyles(() => ({
  root: {
    height: 6,
    borderRadius: 8,
  },
  colorPrimary: {
    backgroundColor: StyleVariables.colors.surface.neutral.disabled,
  },
  bar: {
    borderRadius: 0,
    backgroundColor: StyleVariables.colors.interactive.default,
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  progressContainer: {
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  progressBar: {
    marginTop: '6px',
    width: '100%',
  },
  progressMiddleContainer: {
    display: 'flex',
  },
  textContainer: {
    marginBottom: '4px',
    paddingRight: '12px',
    whiteSpace: 'nowrap',
    color: StyleVariables.colors.text.subdued,
    fontSize: StyleVariables.fonts.size.xs,
    lineHeight: StyleVariables.fonts.lineHeight.xs,
    fontWeight: StyleVariables.fonts.weight.regular,
  },
  ellipsis: {
    marginTop: '16px',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('sm')]: {
      marginTop: '24px',
    },
  },
}));
export default function ProgressBar(progressBarProps: ProgressBarSection) {
  const classes = useStyles();

  return (
    <div className={classes.ellipsis}>
      {typeof progressBarProps?.progress === 'number' ? (
        <Grid container className={classes.progressContainer}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6} className={classes.progressMiddleContainer}>
            <Typography className={classes.textContainer}>
              {`${progressBarProps?.progress}% complete`}
            </Typography>
            <BorderLinearProgress
              className={classes.progressBar}
              variant="determinate"
              value={progressBarProps?.progress}
            />
          </Grid>
        </Grid>
      ) : (
        ''
      )}
    </div>
  );
}
