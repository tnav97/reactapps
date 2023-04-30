import { Button, TranslateReady } from '@alcumus/components';
import { makeStyles } from '@mui/styles';
import React from 'react';
import postMessageToWindowParent, {
  MessageType,
} from '../../../../lib/utils/postMessageToWindowParent';
import Banner from '../../Banner/Banner';
import { upgradeBannerIllustration } from '../../../constants/images';
import IframeThemeProvider from '../../IframeThemeProvider';
import { TranslationProps } from '../../../../types/translationProps';

const useStyles = makeStyles((theme) => ({
  buttons: {
    display: 'flex',
    '& > :not(:last-child)': {
      marginRight: '16px',
      [theme.breakpoints.down('sm')]: {
        marginRight: 0,
      },
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      '& > *': {
        marginTop: '16px',
      },
    },
  },
}));

export default function UpgradeBanner({ t, tReady }: TranslationProps) {
  const classes = useStyles();

  const props = {
    texts: {
      heading: t('upgrade.heading'),
      body: t('failedPayment.body'),
    },
    illustration: {
      src: upgradeBannerIllustration,
      alt: t('upgrade.illustrationAlt'),
    },
  };

  // Sends a JS message to window parent, which is the host application if this opens in an iframe
  const dismissBanner = () =>
    postMessageToWindowParent(MessageType.BUTTON_CLICK, { button: 'dismiss' });

  const explorePlans = () =>
    postMessageToWindowParent(MessageType.BUTTON_CLICK, {
      button: 'explorePlans',
    });

  return (
    <IframeThemeProvider>
      <TranslateReady tReady={tReady}>
        <Banner {...props}>
          <div className={classes.buttons}>
            <Button
              onClick={dismissBanner}
              data-testid="dismissBtn"
              variant="outlined"
              rounded={true}
            >
              {t('upgrade.dismissButton')}
            </Button>
            <Button
              data-testid="explorePlansBtn"
              onClick={explorePlans}
              rounded={true}
            >
              {t('upgrade.explorePlansButton')}
            </Button>
          </div>
        </Banner>
      </TranslateReady>
    </IframeThemeProvider>
  );
}
