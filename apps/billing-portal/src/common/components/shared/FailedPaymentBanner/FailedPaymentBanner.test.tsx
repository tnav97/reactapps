import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import FailedPaymentBanner from './FailedPaymentBanner';

describe('FailedPaymentBanner', () => {
  const windowPostMessage = jest.fn();

  const MockedFailedPaymentBanner = () => (
    <FailedPaymentBanner t={(_: string) => _} tReady={true} />
  );

  beforeAll(() => {
    global.window.postMessage = windowPostMessage;
  });

  it('when manage payments is clicked, posts message to parent window', () => {
    render(<MockedFailedPaymentBanner />);

    const managePaymentsBtn = screen.getByTestId(/managePaymentsBtn/);
    expect(managePaymentsBtn).toBeInTheDocument();

    fireEvent.click(managePaymentsBtn);

    expect(windowPostMessage).toBeCalled();
    expect(windowPostMessage).toHaveBeenCalledWith(
      {
        isBillingPortalMessage: true,
        type: 'BUTTON_CLICK',
        button: 'managePayments',
      },
      '*'
    );
  });
});
