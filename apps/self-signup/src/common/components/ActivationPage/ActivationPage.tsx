import { Image, Page, StyleVariables } from '@alcumus/components';
import { Grid, LinearProgress } from '@mui/material';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { TFunction } from 'i18next';
import React, { useEffect } from 'react';

export interface ActivationPageProps {
  t: TFunction;
}

const useStyles = makeStyles({
  page: {
    padding: 0,
  },
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
    backgroundColor: StyleVariables.colors.surface.neutral?.default,
    height: '8px',
    borderRadius: StyleVariables.spacing(1),
  },
  progressBar: {
    backgroundColor: StyleVariables.colors.action.primary.default,
  },
});

interface ActivationResponse {
  redirectUrl: string;
}

async function activateAccount(invitationCode): Promise<ActivationResponse> {
  const res = await axios.post('/api/activateAccount', { invitationCode });

  return {
    redirectUrl: res.data.redirectUrl,
  };
}

export default function ActivationPage({ t }: ActivationPageProps) {
  const classes = useStyles();

  useEffect(() => {
    let isMounted = true;
    const queryParams = new URLSearchParams(window.location.search);
    const invitationCode = queryParams.get('invitationCode');
    if (invitationCode) {
      activateAccount(invitationCode).then((res) => {
        setTimeout(() => {
          if (isMounted) {
            window.location.assign(res.redirectUrl);
          }
        }, 2000);
      });
    } else {
      console.error('Invitation code missing');
    }
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Page className={classes.page}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        className={classes.grid}
      >
        <Image
          src="/images/alcumus-logo-with-tagline.svg"
          alt={t('logoAltText')}
          className={classes.image}
        />
        <LinearProgress
          variant="indeterminate"
          data-testid="activateAccountPageIndicator"
          className={classes.progress}
          classes={{
            bar1Indeterminate: classes.progressBar,
            bar2Indeterminate: classes.progressBar,
          }}
        />
      </Grid>
    </Page>
  );
}
