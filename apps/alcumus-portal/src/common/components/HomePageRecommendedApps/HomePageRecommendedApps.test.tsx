import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePageRecommendedApps from './HomePageRecommendedApps';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

describe('HomePageRecommendedApps', () => {
  test('it renders correctly', () => {
    render(<HomePageRecommendedApps memberId={0} />);

    expect(screen.getAllByText(/recommendedApps/)[0]).toBeInTheDocument();
  });
});
