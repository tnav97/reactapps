import { render, screen } from '@testing-library/react';
import React from 'react';
import { RegularIcon } from './index';

describe('RegularIcon', () => {
  test('renders', () => {
    // cloudy_snowing is not available in Outlined
    render(<RegularIcon icon="cloudy_snowing" />);
    const icon = screen.getByTestId('icon-cloudy_snowing');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveTextContent('cloudy_snowing');
    expect(icon).toHaveClass('material-icons');
  });
});
