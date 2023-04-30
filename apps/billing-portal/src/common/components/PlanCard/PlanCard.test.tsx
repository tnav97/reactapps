import React from 'react';
import PlanCard, { planCardDataTestIds } from './PlanCard';
import { Button } from '@alcumus/components';
import { render, screen } from '@testing-library/react';

describe('ProductPlan component tests', () => {
  const getStartedButton = (
    <Button rounded onClick={() => ({})} size="medium">
      Get started
    </Button>
  );
  const planFeatures = [
    'All the ‘Starter’ perks ',
    'Documents',
    'Training management',
    'Access to our technical support desk during business hours',
    'Access to our monthly product knowledge sharing sessions',
  ];

  test('it renders', () => {
    render(
      <PlanCard
        name="Standard"
        features={planFeatures}
        buttonText=""
        onButtonClick={() => {}}
      />
    );
    expect(
      screen.getByTestId(planCardDataTestIds.planContainer)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(planCardDataTestIds.featuresListContainer)
    ).toBeInTheDocument();
    expect(
      screen.getByTestId(planCardDataTestIds.planName)
    ).toBeInTheDocument();
  });

  test('it renders price', () => {
    render(
      <PlanCard
        name="Standard"
        features={planFeatures}
        price="20"
        onButtonClick={() => {}}
        buttonText=""
      />
    );
    expect(
      screen.getByTestId(planCardDataTestIds.planPrice)
    ).toBeInTheDocument();
  });

  test('it renders recommended text', () => {
    render(
      <PlanCard
        name="Standard"
        features={planFeatures}
        badge="Recommended"
        onButtonClick={() => null}
        buttonText=""
      />
    );
    expect(
      screen.getByTestId(planCardDataTestIds.recommendedBadge)
    ).toBeInTheDocument();
  });

  test('it renders price model', () => {
    render(
      <PlanCard
        name="Standard"
        features={planFeatures}
        priceDescription="User/month"
        onButtonClick={() => null}
        buttonText=""
      />
    );
    expect(
      screen.getByTestId(planCardDataTestIds.priceModel)
    ).toBeInTheDocument();
  });

  test('it renders yearly price highlight', () => {
    render(
      <PlanCard
        name="Standard"
        features={planFeatures}
        priceDescription="User/month"
        savings="you saved 100$"
        onButtonClick={() => null}
        buttonText=""
      />
    );
    expect(
      screen.getByTestId(planCardDataTestIds.yearlyPriceHighlight)
    ).toBeInTheDocument();
  });

  test('it renders action button', () => {
    render(
      <PlanCard
        name="Standard"
        features={planFeatures}
        onButtonClick={() => null}
        buttonText=""
      />
    );
    expect(
      screen.getByTestId(planCardDataTestIds.actionButtonContainer)
    ).toBeInTheDocument();
  });
});
