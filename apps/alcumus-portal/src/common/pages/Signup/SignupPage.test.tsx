import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SignupPage from './SignupPage';
import StateDecorator from '../../../client/redux/StateDecorator';
import { defaultTestInitialState } from '../../../../tests/defaultTestInitialState';

describe('SignupPage', () => {
  test('it should render', () => {
    render(
      <MemoryRouter>
        <StateDecorator initialState={defaultTestInitialState}>
          <SignupPage useAzureAd={false} />
        </StateDecorator>
      </MemoryRouter>
    );
    expect(screen.getAllByText(/Create Account/)).toHaveLength(2);
  });
});
