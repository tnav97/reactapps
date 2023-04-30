import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Dropdown, { DropdownProps } from './Dropdown';

describe('Dropdown Component', () => {
  test('it renders value, labels when provided', async () => {
    const props: DropdownProps = {
      options: ['Option 1', 'Option 2', 'Option 3'],
      value: 'Selected Option',
      customValueLabel: 'Enter custom value:',
      customValueSubmitButtonText: 'Save',
      onSelect: () => {},
      onCustomValue: () => {},
      'data-testid': 'dropdown-trigger',
    };
    render(<Dropdown {...props} />);

    fireEvent.click(screen.getByTestId('dropdown-trigger'));

    expect(screen.getByText('Selected Option')).toBeInTheDocument();
    expect(screen.getByText('Enter custom value:')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  test('it should work without custom value input', () => {
    const props: DropdownProps = {
      options: ['Option 1', 'Option 2', 'Option 3'],
      onSelect: jest.fn(),
      'data-testid': 'dropdown-trigger',
    };
    render(<Dropdown {...props} />);
    const dropdownTrigger = screen.getByTestId('dropdown-trigger');
    expect(dropdownTrigger).toBeInTheDocument();

    fireEvent.click(dropdownTrigger);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
    expect(screen.queryByTestId('custom-value-input')).not.toBeInTheDocument();
    expect(screen.queryByTestId('submit-button')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('Option 2'));

    expect(props.onSelect).toBeCalled();
    expect(props.onSelect).toBeCalledWith('Option 2');
  });

  test('it should work with custom value input', async () => {
    const props: DropdownProps = {
      options: ['Option 1', 'Option 2', 'Option 3'],
      onSelect: jest.fn(),
      onCustomValue: jest.fn(),
      'data-testid': 'dropdown-trigger',
    };
    render(<Dropdown {...props} />);
    const dropdownTrigger = screen.getByTestId('dropdown-trigger');
    expect(dropdownTrigger).toBeInTheDocument();

    fireEvent.click(dropdownTrigger);

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
    expect(
      screen.queryByTestId('dropdown-trigger-custom-value-input')
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId('dropdown-trigger-submit-button')
    ).toBeInTheDocument();

    await act(async () => {
      await fireEvent.input(
        screen.getByTestId('dropdown-trigger-custom-value-input'),
        {
          target: { value: 'My Custom Value' },
        }
      );
      await fireEvent.click(
        screen.getByTestId('dropdown-trigger-submit-button')
      );
    });

    expect(props.onSelect).toBeCalledTimes(0);
    expect(props.onCustomValue).toBeCalled();
    expect(props.onCustomValue).toBeCalledWith('My Custom Value');
  });
});
