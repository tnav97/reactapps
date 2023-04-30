import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Stepper from './Stepper';

describe('Stepper Component tests', () => {
  const StepperWithProps = (
    <Stepper
      steps={['Select plan', 'Review', 'confirm', 'Payment']}
      activeStep={1}
    />
  );

  beforeEach(() => {
    render(StepperWithProps);
  });
  test('it renders', () => {
    expect(screen.getByTestId(/stepperBase/)).toBeInTheDocument();
    expect(screen.getByText(/Select plan/)).toBeInTheDocument();
    expect(screen.getByText(/Review/)).toBeInTheDocument();
    expect(screen.getByText(/Payment/)).toBeInTheDocument();
  });

  test('it renders completed steps', () => {
    expect(screen.getAllByTestId(/completedStep/).length).toBe(1);
  });

  test('it renders active steps ', () => {
    expect(screen.getAllByTestId('activeStep').length).toBe(1);
  });

  test('it renders inactive steps ', () => {
    expect(screen.getAllByTestId('inactiveStep').length).toBe(2);
  });
});
