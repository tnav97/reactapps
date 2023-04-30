import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingPage from './LoadingPage';

describe('Loading Page', () => {
  test('it should render', () => {
    render(<LoadingPage />);
    expect(screen.getByTestId('alcumusProgressBar')).toBeInTheDocument();
    expect(screen.getByTestId('alcumusLogo')).toBeInTheDocument();
  });

  test('it should render with custom message', () => {
    render(<LoadingPage message="loading..." />);
    expect(screen.getByText(/loading\.\.\./)).toBeInTheDocument();
  });

  test('it should render with custom logo image', () => {
    render(<LoadingPage logoImageUrl="/foo/bar.gif" />);
    expect(screen.getByTestId('alcumusLogo').getAttribute('src')).toEqual(
      '/foo/bar.gif'
    );
  });
});
