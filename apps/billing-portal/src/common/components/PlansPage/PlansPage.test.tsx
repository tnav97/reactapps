import React from 'react';
import PlansPage, { PlansPageDataTestIds } from './PlansPage';
import { Plan } from '../../../types/plans';
import Analytics from '@alcumus/analytics-package';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BillingFrequency } from '../../../types/billingFrequency';
import { get } from 'lodash';

jest.mock('@alcumus/analytics-package');

const mockTrackWithCategory = jest.fn();
const MockedAnalytics = Analytics as jest.MockedClass<typeof Analytics>;
MockedAnalytics.getInstance = jest.fn().mockImplementation(() => {
  return {
    trackWithCategory: mockTrackWithCategory,
  };
});

const plans: Array<Plan> = [
  {
    name: 'Starter',
    id: '1',
    productId: '1',
    createdAt: '',
    deletedAt: '',
    modifiedAt: '',
    maxSeats: 100,
    prices: [
      {
        id: '1',
        currency: 'CAD',
        billingFrequency: BillingFrequency.MONTHLY,
        price: 1500,
        createdAt: '',
        deletedAt: '',
        modifiedAt: '',
        externalId: '',
      },
      {
        id: '2',
        currency: 'CAD',
        billingFrequency: BillingFrequency.YEARLY,
        price: 14400,
        createdAt: '',
        deletedAt: '',
        modifiedAt: '',
        externalId: '',
      },
    ],
  },
  {
    name: 'Standard',
    id: '3',
    productId: '1',
    createdAt: '',
    deletedAt: '',
    modifiedAt: '',
    maxSeats: 200,
    prices: [
      {
        id: '3',
        price: 1800,
        currency: 'CAD',
        billingFrequency: BillingFrequency.MONTHLY,
        createdAt: '',
        deletedAt: '',
        modifiedAt: '',
        externalId: '',
      },
      {
        id: '4',
        price: 16000,
        currency: 'CAD',
        billingFrequency: BillingFrequency.YEARLY,
        createdAt: '',
        deletedAt: '',
        modifiedAt: '',
        externalId: '',
      },
    ],
  },
];
const translations = {
  planFeatures: {
    starter: [
      'Employee management',
      'Inspections',
      'Incidents',
      'Meetings',
      'Action Items',
      'Basic charts & reports',
    ],
    standard: [
      "All the 'Starter' perks",
      'Documents',
      'Training management',
      'Access to our technical support desk during business hours',
      'Access to our monthly product knowledge sharing sessions',
    ],
    premium: [
      "All the 'Standard' perks",
      'Hazzard assessments',
      'Programs (IOS,COR,OSHA)',
      'Asset management',
    ],
  },
  stepper: ['Select plan', 'Review', 'Payment'],
  saveLabel: 'Save 20%',
  switchMonthly: 'Monthly',
  switchYearly: 'Yearly',
  title: 'Our pricing plans',
  billingFrequency: {
    monthly: 'billed monthly',
    yearly: 'billed yearly',
  },
  getStarted: 'Get Started',
  contactSales: 'Contact sales',
  yearlyPriceHighlight: 'You save',
};

describe('ProductPlansPage tests', () => {
  // Todo: add tests to assert onPlanSelected works
  const currentAccountSeats = 12;
  const ProductPlansPageWithProps = (
    plansFromBillingService: Plan[] = [],
    onPlanSelected = () => ({})
  ) => (
    <MemoryRouter>
      <PlansPage
        t={(x: string) => get(translations, x) || x}
        tReady={true}
        onPlanSelected={onPlanSelected}
        plans={plansFromBillingService}
      />
    </MemoryRouter>
  );
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('it renders', async () => {
    await act(async () => {
      render(ProductPlansPageWithProps());
    });
    expect(
      screen.getByTestId(PlansPageDataTestIds.pageContentsContainer)
    ).toBeInTheDocument();
  });

  test('it renders plans', async () => {
    await act(async () => {
      render(ProductPlansPageWithProps(plans));
    });
    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('Standard')).toBeInTheDocument();
    expect(
      screen.getAllByText(translations.billingFrequency.monthly).length
    ).toBeGreaterThan(0);
  });

  test('it switches to yearly prices', async () => {
    await act(async () => {
      render(ProductPlansPageWithProps(plans));
    });

    const switchComponent = screen.getByTestId('switchComponent');
    await act(async () => {
      fireEvent.click(switchComponent.childNodes[0].childNodes[0]);
    });
    expect(screen.getByText('Starter')).toBeInTheDocument();
    expect(screen.getByText('Standard')).toBeInTheDocument();
    expect(
      screen.getAllByText(translations.billingFrequency.yearly).length
    ).toBeGreaterThan(0);
  });

  test('it calls Analytics trackWithCategory on button click', async () => {
    await act(async () => {
      render(ProductPlansPageWithProps(plans));
    });

    const starterButton = screen.getByTestId('StarterButton');
    await act(async () => {
      fireEvent.click(starterButton);
    });
    expect(mockTrackWithCategory).toBeCalledTimes(1);
    expect(mockTrackWithCategory).toBeCalledWith('Plans', 'Starter selected');
  });

  test('it calls onPlanSelected', async () => {
    const mockedOnPlanSelected = jest.fn();
    await act(async () => {
      render(ProductPlansPageWithProps(plans, mockedOnPlanSelected));
    });
    const starterGetStartedButton = screen.getByTestId('StarterButton');
    await act(async () => {
      fireEvent.click(starterGetStartedButton);
    });

    expect(mockedOnPlanSelected).toBeCalledTimes(1);
    expect(mockedOnPlanSelected).toBeCalledWith({
      billingFrequency: 'monthly',
      plan: plans[0],
    });
  });
});
