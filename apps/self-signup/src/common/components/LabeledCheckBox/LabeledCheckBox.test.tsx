import React from 'react';
import LabeledCheckBox from './LabeledCheckBox';
import { render, screen, fireEvent } from '@testing-library/react';

describe('Tests for labeled checkbox component', () => {
  test('it should render', () => {
    const checkBoxLabel = 'Labeled Check Box';
    render(
      <LabeledCheckBox onChange={() => ({})}>{checkBoxLabel}</LabeledCheckBox>
    );
    expect(screen.getByText(checkBoxLabel)).toBeInTheDocument();
  });

  test('it should call onCheckChange handler with checked value', () => {
    const testId = 'labeledCheckboxTestId';
    const mockedCallback = jest.fn();

    render(
      <LabeledCheckBox
        onChange={(e, checked) => mockedCallback(checked)}
        data-testid={testId}
      >
        Labeled Check Box
      </LabeledCheckBox>
    );

    const checkBox = screen.getByTestId(testId);

    fireEvent.click(checkBox);
    expect(mockedCallback).toHaveBeenCalled();
    expect(mockedCallback).toHaveBeenCalledWith(true);
  });

  test('it should call onCheckChange handler with checked value (true to false)', () => {
    const testId = 'labeledCheckboxTestId';
    const mockedCallback = jest.fn();

    render(
      <LabeledCheckBox
        checked={true}
        onChange={(e, checked) => mockedCallback(checked)}
        data-testid={testId}
      >
        Labeled Check Box
      </LabeledCheckBox>
    );

    const checkBox = screen.getByTestId(testId);

    fireEvent.click(checkBox);
    expect(mockedCallback).toHaveBeenCalled();
    expect(mockedCallback).toHaveBeenCalledWith(false);
  });
});
