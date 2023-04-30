import React from 'react';
import { render, screen } from '@testing-library/react';

import { ErrorPage } from './ErrorPage';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

describe('ErrorPage', () => {
  test('it should render', () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <ErrorPage tReady={true} t={(x) => x} />
        </RecoilRoot>
      </BrowserRouter>
    );
    expect(screen.getByTestId('base-button')).toBeInTheDocument();
    expect(screen.getByText('errorPageDefaultButton')).toBeInTheDocument();
    expect(screen.getByText('headerText')).toBeInTheDocument();
  });
});
