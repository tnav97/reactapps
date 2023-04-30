import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import UpdatePasswordForm from './UpdatePasswordForm';

describe('UpdatePasswordForm', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('it should allow setting new password', () => {
    const mockPasswordUpdate = jest.fn();

    render(
      <UpdatePasswordForm
        updatePassword={mockPasswordUpdate}
        resetPasswordUpdateStatus={() => {}}
      />
    );

    // Should render with disabled submit button from beginning
    expect(screen.getByTestId('updatePasswordButton')).toBeDisabled();

    // Should keep submit disabled if passwords dont match
    fireEvent.change(screen.getByTestId('newPasswordInput'), {
      target: { value: 'DoNtSte@lMyP@ssW0rd' },
    });
    fireEvent.change(screen.getByTestId('confirmedPasswordInput'), {
      target: { value: 'DontSte@lMyP@ssW0rd' },
    });
    expect(screen.getByTestId('updatePasswordButton')).toBeDisabled();

    // Should enable submit if passwords match and allow submission to happen
    fireEvent.change(screen.getByTestId('confirmedPasswordInput'), {
      target: { value: 'DoNtSte@lMyP@ssW0rd' },
    });
    expect(screen.getByTestId('updatePasswordButton')).toBeEnabled();
    fireEvent.click(screen.getByTestId('updatePasswordButton'));
    expect(mockPasswordUpdate).toHaveBeenCalled();
  });
});
