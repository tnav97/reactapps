import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import store from 'store';
import MyAccount from './MyAccount';
import StateDecorator from '../../../../../client/redux/StateDecorator';

describe('MyAccount', () => {
  beforeAll(() => {
    store.set('refreshToken', 'aReallyLongRefreshToken');
    store.set('expiresIn', 300);
  });

  afterAll(() => {
    store.remove('refreshToken');
    store.remove('expiresIn');
  });

  test('it should render for keycloak based updates', () => {
    render(
      <MemoryRouter>
        <StateDecorator>
          <MyAccount useAzureAd={false} t={(x) => x} />
        </StateDecorator>
      </MemoryRouter>
    );
    expect(screen.getByText(/User profile/)).toBeInTheDocument();
    expect(screen.getByText(/Set Password/)).toBeInTheDocument();
    expect(screen.getByTestId('updatePasswordButton')).toBeDisabled();
  });

  test('it should render for azure-ad based updates', () => {
    render(
      <MemoryRouter>
        <StateDecorator>
          <MyAccount useAzureAd t={(x) => x} />
        </StateDecorator>
      </MemoryRouter>
    );
    expect(screen.getByText(/User profile/)).toBeInTheDocument();
  });
});
