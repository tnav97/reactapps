import React from 'react';
import { render } from '@testing-library/react';
import store from 'store';
import { MemoryRouter } from 'react-router-dom';
import PrivatePageLayout from './PrivatePageLayout';
import { defaultTestInitialState } from '../../../../tests/defaultTestInitialState';
import StateDecorator from '../../../client/redux/StateDecorator';

describe('PrivatePageLayout', () => {
  beforeAll(() => {
    store.set('refreshToken', 'aReallyLongRefreshToken');
    store.set('expiresIn', 300);
  });

  afterAll(() => {
    store.remove('refreshToken');
    store.remove('expiresIn');
  });

  test('it should match snapshot with user profile not having name set', () => {
    const { container } = render(
      <MemoryRouter>
        <StateDecorator initialState={defaultTestInitialState}>
          <PrivatePageLayout
            user={{ email: 'alcumusdeveloper@gmail.com' }}
            fetchUserProfile={() => {}}
            refreshTokens={() => {}}
          >
            <h1>Test Page</h1>
          </PrivatePageLayout>
        </StateDecorator>
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });

  test('it should match snapshot with user profile having name set', () => {
    const { container } = render(
      <MemoryRouter>
        <StateDecorator initialState={defaultTestInitialState}>
          <PrivatePageLayout
            user={{
              firstName: 'foo',
              lastName: 'bar',
              email: 'alcumusdeveloper@gmail.com',
            }}
            fetchUserProfile={() => {}}
            refreshTokens={() => {}}
          >
            <h1>Test Page</h1>
          </PrivatePageLayout>
        </StateDecorator>
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
