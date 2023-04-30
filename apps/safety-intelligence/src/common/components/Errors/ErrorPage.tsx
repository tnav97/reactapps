import React from 'react';
import {
  Button,
  Error,
  StyleVariables,
  Text,
  TranslateReady,
} from '@alcumus/components';
import { useHistory } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import { makeStyles } from '@mui/styles';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';

interface Props {
  buttonText?: string;
  headerText?: string;
  t: TFunction;
  tReady: boolean;
}

const useStyles = makeStyles(() => ({
  body: {
    whiteSpace: 'pre-line',
  },
  customNavLink: {
    color: StyleVariables.colors.text.default,
    textDecoration: 'underline',
    '&:hover': {
      color: StyleVariables.colors.action.primary.default,
    },
  },
  buttonText: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    lineHeight: StyleVariables.fonts.lineHeight.h5,
  },
  buttonBase: {
    borderRadius: 100,
    padding: '8px 24px',
  },
}));

function ErrorPage({ buttonText, headerText, t, tReady }: Props) {
  const history = useHistory();
  const classes = useStyles();
  const link = 'https://support.ecompliance.com/hc/en-us/requests/new';
  const handleClick = () => {
    history.goBack();
  };
  return (
    <TranslateReady tReady={tReady}>
      <NavBar>
        <Error
          header={headerText ?? t('headerText')}
          body={
            <Text as="h4" center data-testid="body" className={classes.body}>
              <span>{`${t('errorPageContact')} \n`}</span>
              {`${t('at')} `}
              <a href={link} className={classes.customNavLink}>
                {link}
              </a>
              {`${t('errorPageContactNumber')}`}
            </Text>
          }
          imgSrc="/images/error.svg"
        >
          <Button
            aria-label="refresh-button"
            uppercase={false}
            rounded
            className={classes.buttonBase}
            onClick={handleClick}
            data-testid="base-button"
          >
            <Text center as="h4" className={classes.buttonText}>
              {buttonText ?? t('errorPageDefaultButton')}
            </Text>
          </Button>
        </Error>
      </NavBar>
    </TranslateReady>
  );
}

export { ErrorPage };
export default withTranslation('ErrorPage')(ErrorPage);
