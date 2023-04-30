import { render, screen } from '@testing-library/react';
import React from 'react';
import { generateMockTFunction } from '../../../testUtils.jsdom';
import Questionnaire, { QuestionnaireVariant } from './Questionnaire';

jest.mock('@alcumus/analytics-package');
const tFunction = generateMockTFunction('questionnaire');
const QuestionnaireWithCommonProps = (props) => (
  <Questionnaire
    form={{}}
    setForm={() => {}}
    t={tFunction}
    tReady={true}
    {...props}
  />
);

describe('Questionnaire.tsx', () => {
  test('it should render design A', () => {
    render(
      <QuestionnaireWithCommonProps
        variant={QuestionnaireVariant.SENTENCE_BUILDER}
      />
    );

    expect(screen.getByText('Tell us about yourself...')).toBeInTheDocument();
  });

  test('it should render design B', () => {
    render(
      <QuestionnaireWithCommonProps variant={QuestionnaireVariant.WIZARD} />
    );

    expect(
      screen.getByText('What is your current job title?')
    ).toBeInTheDocument();
  });
});
