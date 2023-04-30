import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ReduxStateDecorator from '../../../client/redux/StateDecorator';
import HomePage from './HomePage';

describe('HomePage', () => {
  test('it should render', () => {
    render(
      <MemoryRouter>
        <ReduxStateDecorator
          initialState={{
            message: {
              messageFromApi: 'Hello World!',
            },
          }}
        >
          <HomePage />
        </ReduxStateDecorator>
      </MemoryRouter>
    );
    expect(screen.getByText(/Welcome to Starter App/)).toBeInTheDocument();
  });
});
