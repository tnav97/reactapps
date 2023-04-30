import React from 'react';
import { Grid, LinearProgress } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import Image from '../Image';
import Text from '../Text';
import StyleVariables from '../../styles/variables';
import Center from '../Center';

const useStyles = makeStyles({
  grid: {
    height: '90vh',
  },
  image: {
    width: '30vw',
    height: '30vh',
  },
  progress: {
    marginTop: '80px',
    width: '35vw',
    backgroundColor: StyleVariables.colors.surface.neutral.default,
    height: '8px',
    borderRadius: StyleVariables.spacing(1),
  },
  progressBar: {
    backgroundColor: StyleVariables.colors.action.primary.default,
  },
  loadingMessage: {
    marginTop: '2rem',
    fontWeight: 500,
    letterSpacing: '0.0005em',
  },
});

interface LoadingPageProps {
  message?: string;
  logoImageUrl?: string;
}

export default function LoadingPage({
  message,
  logoImageUrl = 'https://coredevuksstorage01.z33.web.core.windows.net/alcumus-logo-with-tagline.svg',
}: LoadingPageProps) {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={classes.grid}
    >
      <Image
        src={logoImageUrl}
        alt="logo"
        className={classes.image}
        data-testid="alcumusLogo"
      />
      <LinearProgress
        variant="indeterminate"
        className={classes.progress}
        classes={{
          bar1Indeterminate: classes.progressBar,
          bar2Indeterminate: classes.progressBar,
        }}
        data-testid="alcumusProgressBar"
      />
      {!!message?.length && (
        <Center>
          <Text as="p" className={classes.loadingMessage}>
            {message}
          </Text>
        </Center>
      )}
    </Grid>
  );
}
