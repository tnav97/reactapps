import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from './LoginPage';
import StateDecorator from '../../../client/redux/StateDecorator';
import { defaultTestInitialState } from '../../../../tests/defaultTestInitialState';

describe('LoginPage', () => {
  test('it should render', () => {
    render(
      <MemoryRouter>
        <StateDecorator initialState={defaultTestInitialState}>
          <LoginPage />
        </StateDecorator>
      </MemoryRouter>
    );
    expect(screen.getByText(/login/)).toBeInTheDocument();
  });
});
