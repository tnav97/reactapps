import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  test('it should allow user to submit form with valid email and password', () => {
    const mockSubmitHandle = jest.fn();
    render(
      <MemoryRouter>
        <LoginForm
          isLoggingIn={false}
          error={undefined}
          isLoggedIn={false}
          loginWithEmailAndPassword={mockSubmitHandle}
        />
      </MemoryRouter>
    );

    const [emailInput] = screen.getAllByTestId('emailInput');
    const [nextButton] = screen.getAllByTestId('nextButton');
    fireEvent.change(emailInput, {
      target: { value: 'john.doe@freeemail.com' },
    });
    fireEvent.click(nextButton);

    const [passwordInput] = screen.getAllByTestId('passwordInput');
    const [submitButton] = screen.getAllByTestId('submitButton');
    fireEvent.change(passwordInput, {
      target: { value: 'Safety@1234' },
    });
    fireEvent.click(submitButton);
    expect(mockSubmitHandle).toHaveBeenCalled();
  });
});
