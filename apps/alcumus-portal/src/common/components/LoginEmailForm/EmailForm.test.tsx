import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import EmailForm from './EmailForm';

describe('EmailForm', () => {
  test('it does not allow to proceed with invalid email', () => {
    render(<EmailForm onNext={jest.fn()} />);

    expect(screen.getByRole('button')).toHaveTextContent('next');

    const [emailInput] = screen.getAllByTestId('emailInput');
    const [nextButton] = screen.getAllByTestId('nextButton');

    fireEvent.change(emailInput, { target: { value: 'john.doe' } });
    fireEvent.click(nextButton);

    expect(screen.getByText(/validEmail/)).toBeInTheDocument();
  });
});
