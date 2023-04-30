import React, { useState } from 'react';
import { Box, Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  Navbar,
  Page,
  StyleVariables,
  Text,
  TranslateReady,
} from '@alcumus/components';
import { TFunction } from 'i18next';
import PlanCard from '../PlanCard/PlanCard';
import Switch from '../Switch/Switch';
import Stepper from '../Stepper/Stepper';
import { Plan } from '../../../types/plans';
import { useHistory } from 'react-router-dom';
import { BillingFrequency } from '../../../types/billingFrequency';
import PlanCardFromPlan from '../PlanCard/PlanCardFromPlan';
import { Categories } from '../../constants/analyticsEvents';
import Analytics from '@alcumus/analytics-package';

const useStyles = makeStyles((theme: Theme) => ({
  stepper: {
    width: '350px',
  },
  pageContentContainer: {
    color: StyleVariables.colors.text.default,
    marginTop: '-4rem',
    padding: '0 2rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '2.125rem',
      padding: '0 2rem',
    },
  },
  title: {
    marginTop: '2.5rem',
    [theme.breakpoints.down('sm')]: {
      marginTop: '1.5rem',
    },
  },
  plansContainer: {
    marginTop: '2.5rem',
    padding: '0 20vw',
    [theme.breakpoints.down('md')]: {
      padding: '0 2rem',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop: '1rem',
      padding: 0,
    },
  },
  plansGridContainer: {
    minHeight: '55vh',
    padding: '1rem',
  },
  switch: {
    marginRight: '1rem',
  },
  saveLabel: {
    fontSize: StyleVariables.fonts.size.regular,
    lineHeight: StyleVariables.fonts.lineHeight.regular,
    backgroundColor: StyleVariables.colors.surface.neutral?.disabled,
    borderRadius: '4px',
    padding: '0 0.5rem',
  },
  priceSelector: { marginTop: '1.5rem' },
  gridItem: {
    [theme.breakpoints.down('sm')]: {
      minHeight: '60vh',
    },
  },
  navbar: {
    [theme.breakpoints.down('xs')]: {
      padding: '0 16px',
    },
  },
}));

export interface PlansPageProps {
  t: TFunction;
  tReady: boolean;
  plans: Array<Plan>;
  onPlanSelected: ({ plan: Plan, billingFrequency: BillingFrequency }) => void;
}

export const PlansPageDataTestIds = {
  pageContentsContainer: 'pageContentsContainer',
};

export default function PlansPage({
  t,
  tReady,
  plans,
  onPlanSelected,
}: PlansPageProps) {
  const classes = useStyles();
  const history = useHistory();

  const steps = t('stepper', {
    returnObjects: true,
    defaultValue: [],
  }) as Array<string>;

  const [yearly, setYearly] = useState<boolean>(false);

  const handleSwitchToggle = (yearly: boolean) => {
    setYearly(yearly);
  };

  const onPlanSelectedHandler = (plan?: Plan) => {
    if (plan) {
      onPlanSelected({
        plan,
        billingFrequency: yearly
          ? BillingFrequency.YEARLY
          : BillingFrequency.MONTHLY,
      });
      Analytics.getInstance().trackWithCategory(
        Categories.plans,
        `${plan.name} selected`
      );
      history.push('/review');
    }
  };

  const onContactSalesHandler = () => {
    // TODO: add logic when contact sales is selected
  };

  return (
    <TranslateReady tReady={tReady}>
      <Page>
        <div className={classes.navbar}>
          <Navbar />
        </div>
        <Grid
          container
          className={classes.pageContentContainer}
          justifyContent="center"
          data-testid={PlansPageDataTestIds.pageContentsContainer}
        >
          <Grid item xs={12} md={5}>
            <Stepper steps={steps} activeStep={0} />
          </Grid>
          <Grid item xs={12}>
            <Text center as="h2" className={classes.title}>
              {t('title')}
            </Text>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              display="flex"
              justifyContent="center"
              className={classes.priceSelector}
            >
              <Switch
                leftLabel={t('switchMonthly')}
                rightLabel={t('switchYearly')}
                onChange={handleSwitchToggle}
                className={classes.switch}
              />
              <div className={classes.saveLabel}>{t('saveLabel')}</div>
            </Box>
          </Grid>
        </Grid>
        <div className={classes.plansContainer}>
          <Grid
            container
            spacing={4}
            className={classes.plansGridContainer}
            data-testid="productPlansRoot"
          >
            {plans.map((plan) => {
              return (
                <Grid
                  item
                  xs={12}
                  md={4}
                  key={plan.id}
                  className={classes.gridItem}
                >
                  <PlanCardFromPlan
                    t={t}
                    plan={plan}
                    billingFrequency={
                      yearly
                        ? BillingFrequency.YEARLY
                        : BillingFrequency.MONTHLY
                    }
                    isRecommended={plan.name === 'Standard'}
                    onSelected={onPlanSelectedHandler}
                  />
                </Grid>
              );
            })}
            <Grid item xs={12} md={4} className={classes.gridItem}>
              <PlanCard
                name={t('premium.name')}
                price={t('premium.contact')}
                priceDescription={t('premium.description1')}
                billingDetails={t(`premium.description2`)}
                features={t('planFeatures.premium', { returnObjects: true })}
                buttonText={t('contactSales')}
                onButtonClick={() => onContactSalesHandler()}
              />
            </Grid>
          </Grid>
        </div>
      </Page>
    </TranslateReady>
  );
}
