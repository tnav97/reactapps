import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePageServices from './HomePageServices';

describe('HomePageServices', () => {
  test('it renders correctly', () => {
    render(<HomePageServices />);

    expect(
      screen.getByText(/End-to-end Risk Management Services/)
    ).toBeInTheDocument();
    expect(screen.getByTestId('serviceDescription1').textContent).toEqual(
      'Browse our rangeof services'
    );
    expect(screen.getByTestId('serviceDescription2').textContent).toEqual(
      'Click ADD toenquire'
    );
    expect(screen.getByTestId('serviceDescription3').textContent).toEqual(
      "We'll be in touch toget the App added"
    );
  });
});
