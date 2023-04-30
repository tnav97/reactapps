import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import UserMenu from './UserMenu';
import { MemoryRouter } from 'react-router';
import StateDecorator from '../../../client/redux/StateDecorator';
import { defaultTestInitialState } from '../../../../tests/defaultTestInitialState';

describe('PortalPage/UserMenu', () => {
  test('it should render', () => {
    const mockLogoutClick = jest.fn();
    const mockViewProfileClick = jest.fn();

    render(
      <MemoryRouter>
        <StateDecorator initialState={defaultTestInitialState}>
          <UserMenu
            user={{ email: 'alcumusdeveloper@gmail.com' }}
            onLogout={mockLogoutClick}
          />
        </StateDecorator>
      </MemoryRouter>
    );

    const logoutLink = screen.getByTestId('logoutLink');
    fireEvent.click(logoutLink);
    expect(mockLogoutClick).toHaveBeenCalled();
  });
});
