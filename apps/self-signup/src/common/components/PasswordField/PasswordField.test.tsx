import React from 'react';
import { screen, render } from '@testing-library/react';
import PasswordField from './PasswordField';

describe('Password Field Test', () => {
  test('it should render', () => {
    render(
      <PasswordField
        data-testid="passwordTestId"
        onChange={() => {}}
        tooltip={''}
      />
    );
    expect(screen.getByTestId('passwordTestId')).toBeInTheDocument();
  });

  test('it should render tooltip', () => {
    render(
      <PasswordField
        data-testid="passwordTestId"
        onChange={() => {}}
        tooltip={<div>Tooltip</div>}
      />
    );
    expect(screen.getByText('Tooltip')).toBeInTheDocument();
  });

  test('it should not render tooltip', () => {
    render(<PasswordField data-testid="passwordTestId" onChange={() => {}} />);
    expect(() => screen.getByTestId('password-tooltip')).toThrow();
  });
});
