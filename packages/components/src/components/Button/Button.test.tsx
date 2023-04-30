import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Input Component', () => {
  test('it should render', () => {
    render(
      <Button variant="contained" onClick={() => {}} fullWidth>
        Submit
      </Button>
    );
    expect(screen.getByText(/Submit/)).toBeInTheDocument();
  });
  test('it should call onClick when clicked', () => {
    const onClick = jest.fn();
    render(
      <Button variant="contained" onClick={onClick} fullWidth={false}>
        Submit
      </Button>
    );
    const button = screen.getByText(/Submit/);
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });
});
