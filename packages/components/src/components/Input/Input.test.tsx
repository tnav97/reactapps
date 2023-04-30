import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Input, { InputProps } from './Input';

describe('Input Component', () => {
  test('it should render', () => {
    const props: InputProps = {
      label: 'First name',
      value: 'John',
      placeholder: 'Enter name',
      tooltip: 'Tooltip content',
      hint: 'Hint content',
    };
    render(<Input {...props} />);
    expect(screen.getByText(/First name/)).toBeInTheDocument();

    const input = screen.getByLabelText(/First name/);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('value', 'John');
    expect(input).toHaveAttribute('placeholder', 'Enter name');

    const tooltip = screen.queryByTestId('input-tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('Tooltip content');

    const hint = screen.queryByTestId('input-hint');
    expect(hint).toBeInTheDocument();
    expect(hint).toHaveTextContent('Hint content');
  });

  test('it should respect type attribute', () => {
    render(<Input label="Password" type="password" value="pass" />);
    expect(screen.getByText(/Password/)).toBeInTheDocument();

    const input = screen.getByLabelText(/Password/);
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');
    expect(input).toHaveAttribute('value', 'pass');
  });

  test('it should render input adornment', () => {
    render(
      <Input
        label="First name"
        value="John"
        placeholder="Enter name"
        adornment={<div data-testid="test" />}
      />
    );
    expect(screen.getByText(/First name/)).toBeInTheDocument();
    expect(screen.queryByTestId('input-adornment')).toBeInTheDocument();
    expect(screen.queryByTestId('test')).toBeInTheDocument();
  });

  test('it should call onChange on input', () => {
    const onChange = jest.fn();
    render(
      <Input
        label="Name"
        value="test"
        onChange={(e) => onChange(e.target.value)}
      />
    );
    expect(screen.getByText(/Name/)).toBeInTheDocument();

    const input = screen.getByLabelText(/Name/) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('value', 'test');

    fireEvent.input(input, { target: { value: 'updated' } });

    expect(onChange).toBeCalledTimes(1);
    expect(onChange).toBeCalledWith('updated');
  });

  test('it should not use stale onChange callback', () => {
    const onChangeOld = jest.fn();
    const onChangeNew = jest.fn();
    const { rerender } = render(
      <Input label="Name" value="test" onChange={onChangeOld} />
    );
    rerender(<Input label="Name" value="test" onChange={onChangeNew} />);

    expect(screen.getByText(/Name/)).toBeInTheDocument();

    const input = screen.getByLabelText(/Name/) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('value', 'test');

    fireEvent.input(input, { target: { value: 'updated' } });

    expect(onChangeOld).toBeCalledTimes(0);
    expect(onChangeNew).toBeCalledTimes(1);
  });

  test('it should fire callback when increment buttons are used', () => {
    const onIncrementButtonClick = jest.fn();
    render(
      <Input
        label="Name"
        value="10"
        type="number"
        showIncrementButtons={true}
        onIncrementButtonClick={onIncrementButtonClick}
      />
    );
    expect(screen.getByText(/Name/)).toBeInTheDocument();
    expect(screen.getByTestId('incrementBtn')).toBeInTheDocument();
    expect(screen.getByTestId('decrementBtn')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('incrementBtn'));
    fireEvent.click(screen.getByTestId('decrementBtn'));

    expect(onIncrementButtonClick).toBeCalledTimes(2);
    expect(onIncrementButtonClick.mock.calls[0][0]).toBe(1);
    expect(onIncrementButtonClick.mock.calls[1][0]).toBe(-1);
  });
});
