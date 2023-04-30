import { Button, TranslateReady } from '@alcumus/components';
import { makeStyles } from '@mui/styles';
import { Launch } from '@mui/icons-material';
import React from 'react';
import postMessageToWindowParent, {
  MessageType,
} from '../../../../lib/utils/postMessageToWindowParent';
import Banner from '../../Banner/Banner';
import { paymentBannerIllustration } from '../../../constants/images';
import IframeThemeProvider from '../../IframeThemeProvider';
import { TranslationProps } from '../../../../types/translationProps';

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    '& > *': {
      marginRight: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
    },
  },
}));

export default function FailedPaymentBanner({ t, tReady }: TranslationProps) {
  const classes = useStyles();

  const props = {
    texts: {
      heading: t('failedPayment.heading'),
      body: t('failedPayment.body'),
    },
    illustration: {
      src: paymentBannerIllustration,
      alt: t('failedPayment.illustrationAlt'),
    },
  };

  const managePayments = () =>
    postMessageToWindowParent(MessageType.BUTTON_CLICK, {
      button: 'managePayments',
    });

  return (
    <IframeThemeProvider>
      <TranslateReady tReady={tReady}>
        <Banner {...props}>
          <div className={classes.buttons}>
            <Button
              onClick={managePayments}
              rounded={true}
              data-testid="managePaymentsBtn"
            >
              {t('failedPayment.button')} &nbsp; <Launch />
            </Button>
          </div>
        </Banner>
      </TranslateReady>
    </IframeThemeProvider>
  );
}
