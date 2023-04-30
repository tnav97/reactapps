import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import UserProfileSection from './UserProfileSection';

describe('UserProfileSection', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('it should allow saving profile changes', () => {
    const mockProfileUpdate = jest.fn();

    render(
      <UserProfileSection
        updateProfile={mockProfileUpdate}
        resetProfileUpdateStatus={() => {}}
        fetchUserProfile={() => {}}
      />
    );

    // Should render with disabled submit button from beginning
    expect(screen.getByTestId('saveProfileButton')).toBeDisabled();

    // Should enable submit once inputs are filled
    fireEvent.change(screen.getByTestId('firstNameInput'), {
      target: { value: 'John' },
    });
    fireEvent.change(screen.getByTestId('lastNameInput'), {
      target: { value: 'Doe' },
    });
    expect(screen.getByTestId('saveProfileButton')).toBeEnabled();

    // Should allow submitting profile changes
    fireEvent.click(screen.getByTestId('saveProfileButton'));
    expect(mockProfileUpdate).toHaveBeenCalled();
  });
});
