import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import styleVariables from '../../styles/variables';

const useStyles = makeStyles({
  loadingStage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    padding: '0.7rem 0',
    margin: '0 -5%',
    overflow: 'hidden',
    color: styleVariables.colors.white,
    width: '100%',
  },
  loadingDots: {
    position: 'relative',
    left: '-9999px',
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: styleVariables.colors.white,
    boxShadow: `0 0 0 -5px ${styleVariables.colors.white}`,
    animation: '$dotPulse 1.5s infinite linear',
    animationDelay: '0.25s',
    '&::before': {
      content: "''",
      display: 'inline-block',
      position: 'absolute',
      top: 0,
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: styleVariables.colors.white,
      boxShadow: `9981px 0 0 -5px ${styleVariables.colors.white}`,
      animation: '$dotPulseBefore 1.5s infinite linear',
      animationDelay: '0s',
    },
    '&::after': {
      content: "''",
      display: 'inline-block',
      position: 'absolute',
      top: 0,
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: styleVariables.colors.white,
      boxShadow: `10007px 0 0 -5px ${styleVariables.colors.white}`,
      animation: '$dotPulseAfter 1.5s infinite linear',
      animationDelay: '0.5s',
    },
  },
  '@keyframes dotPulseBefore': {
    '0%': { boxShadow: `9981px 0 0 -5px ${styleVariables.colors.white}` },
    '30%': { boxShadow: `9981px 0 0 2px ${styleVariables.colors.white}` },
    '60%': { boxShadow: `9981px 0 0 -5px ${styleVariables.colors.white}` },
    '100%': { boxShadow: `9981px 0 0 -5px ${styleVariables.colors.white}` },
  },

  '@keyframes dotPulse': {
    '0%': { boxShadow: `9999px 0 0 -5px ${styleVariables.colors.white}` },
    '30%': { boxShadow: `9999px 0 0 2px ${styleVariables.colors.white}` },
    '60%': { boxShadow: `9999px 0 0 -5px ${styleVariables.colors.white}` },
    '100%': { boxShadow: `9999px 0 0 -5px ${styleVariables.colors.white}` },
  },

  '@keyframes dotPulseAfter': {
    '0%': { boxShadow: `10007px 0 0 -5px ${styleVariables.colors.white}` },
    '30%': { boxShadow: `10007px 0 0 2px ${styleVariables.colors.white}` },
    '60%': { boxShadow: `10007px 0 0 -5px ${styleVariables.colors.white}` },
    '100%': { boxShadow: `10007px 0 0 -5px ${styleVariables.colors.white}` },
  },
});
export default function ButtonLoadingIndicator() {
  const classes = useStyles();
  return (
    <div className={classes.loadingStage} data-testid="loadingIndicator">
      <div className={classes.loadingDots}></div>
    </div>
  );
}
