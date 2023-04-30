import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePageActiveApps from './HomePageActiveApps';

describe('HomePageActiveApps', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  test('it should render 2 sections', () => {
    render(<HomePageActiveApps memberId={0} />);

    expect(screen.getByText(/noActiveApps/)).toBeInTheDocument();
  });
});
