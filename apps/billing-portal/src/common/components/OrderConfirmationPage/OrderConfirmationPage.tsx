import React, { useEffect } from 'react';
import { ActionPage, TranslateReady } from '@alcumus/components';
import { TFunction } from 'i18next';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { orderConfirmation } from '../../constants/images';
import getSuccessRedirectUrl from '../../services/getSuccessRedirectUrl';

const useStyles = makeStyles((theme: Theme) => ({
  img: {
    width: '5rem',
    height: '5rem',
    marginTop: '8.75rem',
    [theme.breakpoints.down('xs')]: {
      marginTop: '6.5rem',
    },
  },
}));

export interface OrderConfirmationPageProps {
  t: TFunction;
  tReady: boolean;
}

export default function OrderConfirmationPage({
  t,
  tReady,
}: OrderConfirmationPageProps) {
  const classes = useStyles();

  useEffect(() => {
    let isMounted = true;

    getSuccessRedirectUrl().then((url) => {
      setTimeout(() => {
        if (isMounted) {
          window.location.assign(url);
        }
      }, 3000);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <TranslateReady tReady={tReady}>
      <ActionPage
        body={t('body')}
        header={t('header')}
        imgSrc={orderConfirmation}
        imageClassName={classes.img}
      />
    </TranslateReady>
  );
}
