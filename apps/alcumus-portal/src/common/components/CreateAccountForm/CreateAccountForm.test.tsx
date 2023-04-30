import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CreateAccountForm from './CreateAccountForm';

describe('CreateAccountForm', () => {
  test('it should prevent submitting form with details not filled', () => {
    const mockSubmitHandle = jest.fn();

    render(
      <MemoryRouter>
        <CreateAccountForm registered={false} register={mockSubmitHandle} />
      </MemoryRouter>
    );

    const submitButton = screen.getByTestId('submitButton');
    fireEvent.click(submitButton);

    expect(screen.getByTestId('firstNameError')).toBeInTheDocument();
    expect(screen.getByTestId('lastNameError')).toBeInTheDocument();
    expect(screen.getByTestId('emailError')).toBeInTheDocument();
    expect(screen.getByTestId('usernameError')).toBeInTheDocument();
    expect(screen.getByTestId('passwordError')).toBeInTheDocument();
    expect(screen.getByTestId('confirmPasswordError')).toBeInTheDocument();

    expect(mockSubmitHandle).not.toHaveBeenCalled();
  });

  test('it should allow submitting form with valid email and password', () => {
    const mockSubmitHandle = jest.fn();

    render(
      <MemoryRouter>
        <CreateAccountForm registered={false} register={mockSubmitHandle} />
      </MemoryRouter>
    );

    const firstNameInput = screen.getByTestId('firstNameInput');
    const lastNameInput = screen.getByTestId('lastNameInput');
    const emailInput = screen.getByTestId('emailInput');
    const usernameInput = screen.getByTestId('usernameInput');
    const passwordInput = screen.getByTestId('passwordInput');
    const confirmPasswordInput = screen.getByTestId('confirmPasswordInput');
    const submitButton = screen.getByTestId('submitButton');

    fireEvent.change(firstNameInput, {
      target: { value: 'Test' },
    });
    fireEvent.change(lastNameInput, {
      target: { value: 'User' },
    });
    fireEvent.change(emailInput, {
      target: { value: 'test.user@alcumus.com' },
    });
    fireEvent.change(usernameInput, {
      target: { value: 'testuser' },
    });
    fireEvent.change(passwordInput, {
      target: { value: 'Safety@123' },
    });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'Safety@123' },
    });
    fireEvent.click(submitButton);

    expect(mockSubmitHandle).toHaveBeenCalled();
  });
});
