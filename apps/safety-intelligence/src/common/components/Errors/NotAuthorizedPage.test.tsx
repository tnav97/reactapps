import React from 'react';
import { render, screen } from '@testing-library/react';

import { NotAuthorizedPage } from './NotAuthorizedPage';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

describe('NotAuthorizedPage', () => {
  test('it should render', () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <NotAuthorizedPage tReady={true} t={(x) => x} />
        </RecoilRoot>
      </BrowserRouter>
    );
    expect(screen.getByTestId('base-button')).toBeInTheDocument();
    expect(screen.getByText('notAuthorizedButton')).toBeInTheDocument();
    expect(screen.getByText('notAuthorizedHeader')).toBeInTheDocument();
  });
});
