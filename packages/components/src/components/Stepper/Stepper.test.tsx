import React from 'react';
import Stepper from './Stepper';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Test for Stepper', () => {
  test('it should render', () => {
    render(<Stepper steps={4} data-testid="stepper" />);
    const stepper = screen.getByTestId('stepper');
    expect(stepper).toBeInTheDocument();
  });

  test('it should render 2 active and 3 inactive spots', () => {
    render(<Stepper steps={5} activeStep={2} />);
    const activeSpots = screen.getAllByTestId('active');
    expect(activeSpots.length).toBe(2);
    const inactiveSpots = screen.getAllByTestId('inactive');
    expect(inactiveSpots.length).toBe(3);
  });
});
