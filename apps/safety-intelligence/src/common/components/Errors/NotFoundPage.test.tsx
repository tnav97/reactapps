import React from 'react';
import { render, screen } from '@testing-library/react';

import { NotFoundPage } from './NotFoundPage';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';

describe('ErrorPage', () => {
  test('it should render', () => {
    render(
      <BrowserRouter>
        <RecoilRoot>
          <NotFoundPage tReady={true} t={(x) => x} />
        </RecoilRoot>
      </BrowserRouter>
    );
    expect(screen.getByTestId('base-button')).toBeInTheDocument();
    expect(screen.getByText('notFoundButton')).toBeInTheDocument();
    expect(screen.getByText('notFoundHeader')).toBeInTheDocument();
  });
});
