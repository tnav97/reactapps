import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import UpgradeBanner from './UpgradeBanner';

describe('UpgradeBanner', () => {
  const windowPostMessage = jest.fn();

  const MockedUpgradeBanner = () => (
    <UpgradeBanner t={(_: string) => _} tReady={true} />
  );

  beforeAll(() => {
    global.window.postMessage = windowPostMessage;
  });

  it('when dismiss is clicked, posts message to parent window', () => {
    render(<MockedUpgradeBanner />);

    const dismissBtn = screen.getByTestId(/dismissBtn/);
    expect(dismissBtn).toBeInTheDocument();

    fireEvent.click(dismissBtn);

    expect(windowPostMessage).toBeCalled();
    expect(windowPostMessage).toHaveBeenCalledWith(
      {
        isBillingPortalMessage: true,
        type: 'BUTTON_CLICK',
        button: 'dismiss',
      },
      '*'
    );
  });

  it('when explore plans is clicked, posts message to parent window', () => {
    render(<MockedUpgradeBanner />);

    const explorePlansBtn = screen.getByTestId(/explorePlansBtn/);
    expect(explorePlansBtn).toBeInTheDocument();

    fireEvent.click(explorePlansBtn);

    expect(windowPostMessage).toBeCalled();
    expect(windowPostMessage).toHaveBeenCalledWith(
      {
        isBillingPortalMessage: true,
        type: 'BUTTON_CLICK',
        button: 'explorePlans',
      },
      '*'
    );
  });
});
