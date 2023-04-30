import { render, screen, fireEvent, act } from '@testing-library/react';
import React from 'react';
import { generateMockTFunction } from '../../../../../testUtils.jsdom';
import QuestionnaireStep, {
  QuestionnaireStepOption,
} from './QuestionnaireStep';

const tFunction = generateMockTFunction('questionnaire');

const options: Array<QuestionnaireStepOption> = [
  {
    label: 'Option 1',
    value: 'option1',
  },
  {
    label: 'Option 2',
    value: 'option2',
  },
  {
    label: 'Option 3',
    value: 'option3',
  },
];

describe('QuestionnaireStep.tsx', () => {
  it('should render', () => {
    render(
      <QuestionnaireStep
        t={tFunction}
        options={options}
        title="Step title"
        onOptionSelect={() => {}}
      />
    );

    expect(screen.getByText('Step title')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('option selection works', () => {
    const onOptionSelect = jest.fn();

    render(
      <QuestionnaireStep
        t={tFunction}
        options={options}
        title="Step title"
        onOptionSelect={onOptionSelect}
      />
    );

    fireEvent.click(screen.getByTestId('questionnaire-tile-Option 1'));
    expect(onOptionSelect).toBeCalledTimes(1);
    expect(onOptionSelect).toBeCalledWith('option1');
  });

  it('previous button works', () => {
    const onPrevious = jest.fn();

    render(
      <QuestionnaireStep
        t={tFunction}
        options={options}
        title="Step title"
        onOptionSelect={() => {}}
        onPrevious={onPrevious}
      />
    );

    fireEvent.click(screen.getByTestId('previous'));
    expect(onPrevious).toBeCalledTimes(1);
  });

  it('custom input works', () => {
    const onCustomValue = jest.fn();

    render(
      <QuestionnaireStep
        t={tFunction}
        options={options}
        title="Step title"
        onOptionSelect={() => {}}
        onCustomValue={onCustomValue}
      />
    );

    act(() => {
      fireEvent.change(screen.getByTestId('custom-value-input'), {
        target: { value: 'Test Value' },
      });
    });

    act(() => {
      fireEvent.click(screen.getByTestId('next'));
    });

    expect(onCustomValue).toBeCalledTimes(1);
    expect(onCustomValue).toBeCalledWith('Test Value');
  });

  it('custom input works - with enter key', () => {
    const onCustomValue = jest.fn();

    render(
      <QuestionnaireStep
        t={tFunction}
        options={options}
        title="Step title"
        onOptionSelect={() => {}}
        onCustomValue={onCustomValue}
      />
    );

    act(() => {
      fireEvent.change(screen.getByTestId('custom-value-input'), {
        target: { value: 'Test Value' },
      });
    });

    act(() => {
      fireEvent.submit(screen.getByTestId('custom-value-input'));
    });

    expect(onCustomValue).toBeCalledTimes(1);
    expect(onCustomValue).toBeCalledWith('Test Value');
  });
});
