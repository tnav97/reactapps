import React from 'react';
import PaidPlanWelcomePage from './PaidPlanWelcomePage';
import { fireEvent, render, screen } from '@testing-library/react';
import { useQuery } from '@alcumus/hooks';
import faker from 'faker';
import qs from 'querystring';

jest.mock('@alcumus/hooks', () => ({
  useQuery: jest.fn(),
}));

const useQueryMock = useQuery as jest.MockedFunction<typeof useQuery>;

describe('when rending PaidPlanWelcomePage', () => {
  const windowPostMessage = jest.fn();

  const MockedPaidPlanWelcomePage = () => (
    // @ts-ignore
    <PaidPlanWelcomePage t={(x: string) => x} tReady={true} />
  );

  beforeAll(() => {
    global.window.postMessage = windowPostMessage;
  });

  const params = {
    activeSeats: 2,
    seatsAvailable: 10,
    accountHolderName: 'Tony Stark',
    purchasedPlan: 'Standard',
    nextPaymentDate: faker.date.soon(30).toISOString(),
  };

  it('it should post message to parent window when invite users is clicked', () => {
    useQueryMock.mockReturnValue(new URLSearchParams(qs.stringify(params)));

    render(<MockedPaidPlanWelcomePage />);

    const inviteUsersBtn = screen.getByTestId(/inviteUsersBtn/);
    expect(inviteUsersBtn).toBeInTheDocument();

    fireEvent.click(inviteUsersBtn);

    expect(windowPostMessage).toBeCalled();
    expect(windowPostMessage).toHaveBeenCalledWith(
      {
        isBillingPortalMessage: true,
        type: 'BUTTON_CLICK',
        button: 'inviteUsers',
      },
      '*'
    );
  });

  it('it should post message to parent window when manage subscription is clicked', () => {
    useQueryMock.mockReturnValue(new URLSearchParams(qs.stringify(params)));
    render(<MockedPaidPlanWelcomePage />);

    const manageSubscriptionBtn = screen.getByTestId(/manageSubscriptionBtn/);
    expect(manageSubscriptionBtn).toBeInTheDocument();

    fireEvent.click(manageSubscriptionBtn);

    expect(windowPostMessage).toBeCalled();
    expect(windowPostMessage).toHaveBeenCalledWith(
      {
        isBillingPortalMessage: true,
        type: 'BUTTON_CLICK',
        button: 'manageSubscription',
      },
      '*'
    );
  });
});
