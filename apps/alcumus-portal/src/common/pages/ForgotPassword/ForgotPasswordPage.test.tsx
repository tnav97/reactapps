import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import ForgotPasswordPage from './ForgotPasswordPage';

describe('ForgotPasswordPage', () => {
  test('it allows submitting forgot password request', () => {
    const mockSubmission = jest.fn();
    render(
      <MemoryRouter>
        <ForgotPasswordPage
          sendForgotPasswordRequest={mockSubmission}
          allowResendingPassword={() => {}}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Can't log in?/)).toBeDefined();

    const [emailInput] = screen.getAllByTestId('emailInput');
    const [submitButton] = screen.getAllByTestId('submitButton');
    fireEvent.change(emailInput, {
      target: { value: 'john.doe@freeemail.com' },
    });
    fireEvent.click(submitButton);
    expect(mockSubmission).toHaveBeenCalled();
  });
});
