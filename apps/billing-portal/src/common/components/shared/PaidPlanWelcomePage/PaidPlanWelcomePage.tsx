import {
  Image,
  Page,
  StyleVariables,
  Text,
  TranslateReady,
} from '@alcumus/components';
import { useQuery } from '@alcumus/hooks';
import dateFormat from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { enCA, frCA } from 'date-fns/locale';
import { Divider, Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Add as AddIcon, Settings as SettingsIcon } from '@mui/icons-material';
import { TFunction } from 'i18next';
import React from 'react';

import postMessageToWindowParent, {
  MessageType,
} from '../../../../lib/utils/postMessageToWindowParent';
import {
  alcumusLogoIcon,
  welcomeToPaidPlanImagePath,
} from '../../../constants/images';
import FeaturesList from '../../FeaturesList/FeaturesList';
import { planCardDataTestIds } from '../../PlanCard/PlanCard';
import { ActionButton } from './ActionButton';
import i18next from 'i18next';

const locales = { 'en-CA': enCA, 'fr-CA': frCA };
const useStyles = (featureItems: string[]) =>
  makeStyles((theme: Theme) => ({
    headerBg: {
      backgroundColor: StyleVariables.colors.surface.default,
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 24,
    },
    headerText: {
      fontWeight: StyleVariables.fonts.weight.regular,
    },
    accentText: {
      fontWeight: StyleVariables.fonts.weight.semiBold,
      color: StyleVariables.colors.action.primary.default,
    },
    logoIcon: {
      paddingRight: 16,
    },
    page: {
      backgroundColor: StyleVariables.colors.surface.default,
      padding: 0,
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(3),
      },
    },
    featureTitle: {
      fontWeight: StyleVariables.fonts.weight.semiBold,
    },
    actionButton: {
      padding: '6px 16px',
    },
    footerSectionDescriptionText: {
      padding: '16px 0',
    },
    featuresWrapper: {
      columns:
        featureItems?.length > 35
          ? 5
          : featureItems.length > 30
          ? 4
          : featureItems.length > 20
          ? 3
          : 2,
      [theme.breakpoints.only('xs')]: {
        columns: 1,
      },
    },
    divider: {
      margin: '0 24px',
      [theme.breakpoints.down('sm')]: {
        margin: '24px 0',
        width: '100%',
        height: '1px',
      },
    },
    imageWrapper: {
      flexBasis: '20%',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    availableSeats: {
      fontWeight: StyleVariables.fonts.weight.semiBold,
      color: StyleVariables.colors.text.success,
    },
    mainWrapper: {
      backgroundColor: StyleVariables.colors.surface.neutral?.disabled,
      padding: 24,
      minHeight: 370,
      marginBottom: 36,
    },
    footerWrapper: {
      backgroundColor: StyleVariables.colors.surface.default,
      width: '100%',
      padding: '0 40px',
    },
  }));

interface Props {
  t: TFunction;
  tReady: boolean;
}

export default function PaidPlanWelcomePage({ tReady, t }: Props) {
  const planName = useQuery().get('planName');
  const featureItems: string[] = planName
    ? t(`planFeatures.${planName.toLowerCase()}`, {
        returnObjects: true,
        defaultValue: [],
      })
    : [];
  const accountHolderName = useQuery().get('accountHolderName');
  const activeSeats = useQuery().get('activeSeats');
  const seatsAvailable = useQuery().get('seatsAvailable');
  const currentLocale =
    useQuery().get('lng') ?? (i18next.languages && i18next.languages[0]);

  const getPaymentDateString = () => {
    const paymentDate = useQuery().get('nextPaymentDate');
    if (paymentDate) {
      const date = parseISO(paymentDate ?? '');
      if (date)
        return dateFormat(date, 'MMM do, yyyy', {
          locale: locales[currentLocale],
        });
    }
    return '';
  };

  const manageSubscription = () =>
    postMessageToWindowParent(MessageType.BUTTON_CLICK, {
      button: 'manageSubscription',
    });

  const inviteUsers = () =>
    postMessageToWindowParent(MessageType.BUTTON_CLICK, {
      button: 'inviteUsers',
    });

  const classes = useStyles(featureItems)();
  const nextPaymentDate = getPaymentDateString();

  return (
    <TranslateReady tReady={tReady}>
      <Page className={classes.page}>
        <Grid
          container
          direction="row"
          justifyContent="space-evenly"
          alignContent="center"
          className={classes.headerBg}
        >
          <Grid item>
            <Image
              src={alcumusLogoIcon}
              alt={'alcumus-icon'}
              className={classes.logoIcon}
              data-testid={'alcumus-icon'}
            />
          </Grid>
          <Grid item>
            <Text
              as="h4"
              className={classes.headerText}
              data-testid="headerText"
            >
              {t('congratulations', {
                accountHolderName,
              })}
            </Text>
            <Text
              as="h4"
              className={classes.headerText}
              data-testid="headerText"
            >
              {t('welcomeToYour')}
              <span className={classes.accentText}>
                {t('plan', {
                  planName,
                })}
              </span>
            </Text>
          </Grid>
        </Grid>
        <Grid container direction="row" item>
          <Grid item md={4} className={classes.imageWrapper}>
            <Image
              src={welcomeToPaidPlanImagePath}
              alt={t('welcomeToPaidPlan')}
              data-testid={'welcome_to_paid_plan'}
            />
          </Grid>
          <Grid item md={8} xs={12}>
            <Grid item className={classes.mainWrapper} md={12}>
              <Grid item>
                <Text as="h5" className={classes.featureTitle}>
                  {t('features')}:
                </Text>
                <FeaturesList
                  className={classes.featuresWrapper}
                  data-testid={planCardDataTestIds.featuresListContainer}
                  featureItems={featureItems}
                />
              </Grid>
            </Grid>
            <Grid container item className={classes.footerWrapper} md={12}>
              <ActionButton
                onClick={manageSubscription}
                startIcon={<SettingsIcon />}
                data-testid="manageSubscriptionBtn"
                title={t('billing')}
                description={<> {nextPaymentDate}</>}
                buttonText={t('manage')}
              />
              <Grid item md={2} xs={12}>
                <Divider className={classes.divider} orientation="vertical" />
              </Grid>
              <ActionButton
                onClick={inviteUsers}
                startIcon={<AddIcon />}
                data-testid="inviteUsersBtn"
                title={t('userLicense')}
                buttonText={t('inviteUsers')}
                description={
                  <>
                    {activeSeats} {t('active')} |{' '}
                    <span className={classes.availableSeats}>
                      {seatsAvailable} {t('available')}
                    </span>{' '}
                  </>
                }
              />
            </Grid>
          </Grid>
        </Grid>
      </Page>
    </TranslateReady>
  );
}
