import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import SuccessMessage from './ForgotPasswordSuccessMessage';

describe('SuccessMessage', () => {
  test('it renders success message and allows resending link', () => {
    const mockResendLinkClick = jest.fn();
    render(
      <MemoryRouter>
        <SuccessMessage
          email="alcumustester@alcumus.com"
          onResendLink={mockResendLinkClick}
        />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/We’ve sent a recovery link to/)
    ).toBeInTheDocument();
    expect(screen.getByText(/alcumustester@alcumus.com/)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Resend link/));
    expect(mockResendLinkClick).toHaveBeenCalled();
  });
});
