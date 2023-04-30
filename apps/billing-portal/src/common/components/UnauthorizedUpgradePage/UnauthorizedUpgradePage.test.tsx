import React from 'react';
import UnAuthorizedUpgradePage from './UnauthorizedUpgradePage';
import { render, screen } from '@testing-library/react';

describe('un-authorised upgrade page tests', () => {
  test('it renders', () => {
    render(<UnAuthorizedUpgradePage tReady={true} t={(x) => x} />);
    const img = screen.getByTestId('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/images/unauthorized-upgrade.svg');
  });
});
