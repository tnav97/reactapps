import React from 'react';
import { act, render, screen, fireEvent } from '@testing-library/react';
import Analytics from '@alcumus/analytics-package';
import Questionnaire, { QuestionnaireVariant } from '../Questionnaire';
import { EventName, Category } from '../../../../lib/clients/eventsAnalytics';
import { getMockedAxios } from '../../../../testUtils.node';
import { MemoryRouter } from 'react-router-dom';

jest.mock('@alcumus/analytics-package');

const QUESTIONNAIRE: Category = 'Questionnaire';
const FREE_TRIAL_INITIATED: EventName = 'Free Trial Initiated';
const JOB_ROLE_SELECTED: EventName = 'Job Role Selected';
const INDUSTRY_SELECTED: EventName = 'Industry Selected';
const COMPANY_SIZE_SELECTED: EventName = 'Company Size Selected';
const USE_CASE_SELECTED: EventName = 'Use Case Selected';
const translations = {
  'options.role': ['Safety Director'],
  'options.teamSize': ['20 - 50'],
  'options.industry': ['Construction'],
  'options.purpose': ['Digitalize my Safety Management Program'],
};

const mockTrackWithCategory = jest.fn();
const mockTimeEvent = jest.fn();
const mockIdentify = jest.fn();
const MockedAnalytics = Analytics as jest.MockedClass<typeof Analytics>;
MockedAnalytics.getInstance = jest.fn().mockImplementation(() => {
  const item = new Analytics();
  return {
    trackWithCategory: mockTrackWithCategory,
    timeEvent: mockTimeEvent,
    identify: mockIdentify,
  };
});
const mockedAxios = getMockedAxios();

const makeSelections = () => {
  act(() => {
    fireEvent.click(screen.getByTestId('role'));
    fireEvent.click(screen.getByTestId('dropdown-option-Safety Director'));

    fireEvent.click(screen.getByTestId('industry'));
    fireEvent.click(screen.getByTestId('dropdown-option-Construction'));

    fireEvent.click(screen.getByTestId('teamSize'));
    fireEvent.click(screen.getByTestId('dropdown-option-20 - 50'));

    fireEvent.click(screen.getByTestId('purpose'));
    fireEvent.click(
      screen.getByTestId(
        'dropdown-option-Digitalize my Safety Management Program'
      )
    );
  });
};

const QuestionnaireSentenceBuilder = (props) => (
  <Questionnaire
    variant={QuestionnaireVariant.SENTENCE_BUILDER}
    tReady={true}
    {...props}
  />
);

describe('QuestionnaireSentenceBuilder', () => {
  beforeEach(() => {
    MockedAnalytics.mockClear();
    mockTrackWithCategory.mockClear();
    mockTimeEvent.mockClear();
    mockIdentify.mockClear();
  });

  test('it should render', () => {
    render(
      <QuestionnaireSentenceBuilder
        form={{
          firstName: 'John',
        }}
        setForm={(x) => x}
        t={(x) => {
          return translations[x] || x;
        }}
      />
    );

    expect(screen.getByTestId('role')).toBeInTheDocument();
  });

  test('it tracks all selections', () => {
    render(
      <QuestionnaireSentenceBuilder
        form={{
          firstName: 'John',
        }}
        setForm={(x) => x}
        t={(x) => {
          return translations[x] || x;
        }}
      />
    );
    makeSelections();
    expect(mockTrackWithCategory).toHaveBeenCalledTimes(4);
    expect(mockTrackWithCategory.mock.calls).toEqual([
      [
        QUESTIONNAIRE,
        JOB_ROLE_SELECTED,
        {
          value: translations['options.role'][0],
          'Design Variant': QuestionnaireVariant.SENTENCE_BUILDER,
        },
      ],
      [
        QUESTIONNAIRE,
        INDUSTRY_SELECTED,
        {
          value: translations['options.industry'][0],
          'Design Variant': QuestionnaireVariant.SENTENCE_BUILDER,
        },
      ],
      [
        QUESTIONNAIRE,
        COMPANY_SIZE_SELECTED,
        {
          value: translations['options.teamSize'][0],
          'Design Variant': QuestionnaireVariant.SENTENCE_BUILDER,
        },
      ],
      [
        QUESTIONNAIRE,
        USE_CASE_SELECTED,
        {
          value: translations['options.purpose'][0],
          'Design Variant': QuestionnaireVariant.SENTENCE_BUILDER,
        },
      ],
    ]);
  });

  test('it calls onSubmit and tracks Free trial initiated event on button click', async () => {
    mockedAxios.post.mockResolvedValue({});
    const expectedEventData = {
      'Design Variant': 'Sentence builder',
      role: translations['options.role'][0],
      industry: translations['options.industry'][0],
      teamSize: translations['options.teamSize'][0],
      purpose: translations['options.purpose'][0],
    };
    render(
      <MemoryRouter>
        <QuestionnaireSentenceBuilder
          form={{
            email: 'a.b@email.com',
          }}
          setForm={(x) => x}
          t={(x) => {
            return translations[x] || x;
          }}
        />
      </MemoryRouter>
    );

    makeSelections();
    await act(async () => {
      fireEvent.click(screen.getByTestId('start-trial-btn'));
    });
    expect(mockedAxios.post).toHaveBeenCalled();
    expect(mockedAxios.post.mock.calls[0][0]).toBe('/api/startFreeTrial');
    expect(mockTrackWithCategory).toHaveBeenCalledTimes(5);
    expect(mockTrackWithCategory.mock.calls[4]).toEqual([
      QUESTIONNAIRE,
      FREE_TRIAL_INITIATED,
      expectedEventData,
    ]);
  });
});
