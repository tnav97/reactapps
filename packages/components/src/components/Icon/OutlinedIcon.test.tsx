import { render, screen } from '@testing-library/react';
import React from 'react';
import { OutlinedIcon, RegularIcon } from './index';

describe('RegularIcon', () => {
  test('renders', () => {
    // face_unlock is not available in RegularIcon
    render(<OutlinedIcon icon="face_unlock" />);
    const icon = screen.getByTestId('icon-face_unlock');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveTextContent('face_unlock');
    expect(icon).toHaveClass('material-icons-outlined');
  });
});
