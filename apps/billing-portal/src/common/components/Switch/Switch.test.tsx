import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Switch from './Switch';

describe('Switch Component tests', () => {
  const mockedOnChange = jest.fn();
  const rightLabel = 'on';
  const leftLabel = 'off';
  const SwitchWithProps = (
    <Switch
      onChange={mockedOnChange}
      leftLabel={leftLabel}
      rightLabel={rightLabel}
    />
  );
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test('it renders', () => {
    render(SwitchWithProps);
    expect(screen.getByTestId(/switchComponent/)).toBeInTheDocument();
  });

  test('it renders labels', () => {
    render(SwitchWithProps);
    expect(screen.getByTestId(/leftLabel/)).toBeInTheDocument();
    expect(screen.getByTestId(/rightLabel/)).toBeInTheDocument();
  });

  test('it calls onChange', () => {
    render(SwitchWithProps);
    const SwitchElement = screen.getByRole('checkbox');
    expect(SwitchElement).toBeInTheDocument();
    fireEvent.click(SwitchElement);
    expect(mockedOnChange.mock.calls[0][0]).toBe(true);
    fireEvent.click(SwitchElement);
    expect(mockedOnChange.mock.calls[1][0]).toBe(false);
  });
});
