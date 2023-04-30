import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import PasswordForm from './index';

describe('PasswordForm', () => {
  test('it does not allow invalid password', async () => {
    const mockSubmitHandle = jest.fn();
    render(
      <MemoryRouter>
        <PasswordForm
          email="foo@freeemail.com"
          isLoggingIn={false}
          error={undefined}
          attemptLogin={mockSubmitHandle}
        />
      </MemoryRouter>
    );

    const [passwordInput] = screen.getAllByTestId('passwordInput');
    const [submitButton] = screen.getAllByTestId('submitButton');

    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    const [errorMessage] = screen.getAllByTestId('errorMessage');
    expect(errorMessage).toHaveTextContent('passwordError');
  });
});
