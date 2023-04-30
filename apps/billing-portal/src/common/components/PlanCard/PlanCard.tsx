import { Button, StyleVariables, Text } from '@alcumus/components';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import React from 'react';
import FeaturesList from '../FeaturesList/FeaturesList';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    borderRadius: '8px',
    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.25)',
    color: StyleVariables.colors.text.default,
    width: '100%',
    height: '100%',
  },
  content: {
    padding: '0rem 1.5rem 0rem 1.5rem',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    [theme.breakpoints.down('xs')]: {
      padding: '0rem 1rem',
    },
  },
  bar: {
    height: '8px',
    width: '100%',
    backgroundColor: StyleVariables.colors.action.primary.default,
    borderRadius: '8px 8px 0 0',
  },
  actionButton: {
    marginBottom: '2.5rem',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '1.875rem',
    },
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
  },
  recommendedText: {
    marginTop: '0.75rem',
    backgroundColor: StyleVariables.colors.surface.selected,
    fontSize: StyleVariables.fonts.size.small,
    borderRadius: '30px',
    padding: '0rem 1rem',
    fontWeight: StyleVariables.fonts.weight.regular,
  },
  planName: {
    marginTop: '3rem',
    fontWeight: StyleVariables.fonts.weight.medium,
    [theme.breakpoints.down('xs')]: { marginTop: '1rem' },
  },
  planNameWithRecommendedText: {
    marginTop: '0.75rem',
  },
  horizontalLine: {
    backgroundColor: StyleVariables.colors.surface.hover,
    width: '100%',
    border: 'none',
    height: '1px',
    marginTop: '1.5rem',
  },
  horizontalLineWithoutPriceModel: {
    marginTop: '3.97rem',
  },
  priceModel: {
    marginTop: '1rem',
    fontWeight: StyleVariables.fonts.weight.medium,
  },
  currency: {
    marginBottom: '0.3rem',
  },
  planPrice: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    marginTop: '1rem',
  },
  alternativePlanPrice: {
    marginTop: '2.188rem',
  },
  yearlyPriceHighlight: {
    minHeight: '1.2rem',
    marginTop: '1.5rem',
    color: StyleVariables.colors.text.success,
    fontWeight: StyleVariables.fonts.weight.semiBold,
  },
}));

export interface PlanCardProps {
  name: string;
  price?: string;
  badge?: string;
  priceDescription?: string;
  billingDetails?: string;
  savings?: string;
  features: Array<string>;
  buttonText: string;
  onButtonClick: Function;
}

const planPriceAlternative = 'planPriceAlternative';
const planPrice = 'planPrice';
const planContainer = 'planContainer';
const recommendedBadge = 'recommendedBadge';
const planName = 'planName';
const priceModel = 'priceModel';
const horizontalLine = 'horizontalLine';
const featuresListContainer = 'featuresListContainer';
const actionButtonContainer = 'actionButtonContainer';
const yearlyPriceHighlight = 'yearlyPriceHighlight';

export const planCardDataTestIds = {
  planPriceAlternative,
  planPrice,
  planContainer,
  recommendedBadge,
  planName,
  priceModel,
  horizontalLine,
  featuresListContainer,
  actionButtonContainer,
  yearlyPriceHighlight,
};

export default function PlanCard({
  name,
  badge,
  price,
  priceDescription,
  billingDetails,
  savings,
  features,
  buttonText,
  onButtonClick,
}: PlanCardProps) {
  const classes = useStyles();

  return (
    <div
      className={classes.container}
      data-testid={planCardDataTestIds.planContainer}
    >
      <div className={classes.bar} />
      <div className={classes.content}>
        {badge && (
          <div
            className={classes.recommendedText}
            data-testid={planCardDataTestIds.recommendedBadge}
          >
            {badge}
          </div>
        )}
        <Text
          as="h4"
          className={clsx(
            classes.planName,
            badge && classes.planNameWithRecommendedText
          )}
          data-testid={planCardDataTestIds.planName}
        >
          {name}
        </Text>
        {price && (
          <Text
            as="h2"
            data-testid={planCardDataTestIds.planPrice}
            className={classes.planPrice}
          >
            {price}
          </Text>
        )}
        {priceDescription && (
          <Text
            as="h6"
            className={classes.priceModel}
            data-testid={planCardDataTestIds.priceModel}
          >
            {priceDescription}
          </Text>
        )}
        {billingDetails && (
          <Text
            as="h6"
            className={classes.priceModel}
            data-testid={planCardDataTestIds.priceModel}
          >
            {billingDetails}
          </Text>
        )}
        <Text
          as="h6"
          center={true}
          className={classes.yearlyPriceHighlight}
          data-testid={planCardDataTestIds.yearlyPriceHighlight}
        >
          {savings || ''}
        </Text>
        <hr
          className={clsx(
            classes.horizontalLine,
            !priceModel && classes.horizontalLineWithoutPriceModel
          )}
          data-testid={planCardDataTestIds.horizontalLine}
        />
        <FeaturesList
          data-testid={planCardDataTestIds.featuresListContainer}
          featureItems={features}
        />
        <div
          className={classes.actionButton}
          data-testid={planCardDataTestIds.actionButtonContainer}
        >
          <Button
            rounded
            onClick={onButtonClick}
            size="medium"
            fullWidth={true}
            data-testid={`${name}Button`}
          >
            {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
}
