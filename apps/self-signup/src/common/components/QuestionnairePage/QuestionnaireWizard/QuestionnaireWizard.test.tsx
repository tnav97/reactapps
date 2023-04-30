import React from 'react';
import {
  act,
  render,
  screen,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import Analytics from '@alcumus/analytics-package';
import Questionnaire, { QuestionnaireVariant } from '../Questionnaire';
import { generateMockTFunction } from '../../../../testUtils.jsdom';
import { EventName, Category } from '../../../../lib/clients/eventsAnalytics';

jest.mock('@alcumus/analytics-package');

const QUESTIONNAIRE: Category = 'Questionnaire';
const FREE_TRIAL_INITIATED: EventName = 'Free Trial Initiated';
const JOB_ROLE_SELECTED: EventName = 'Job Role Selected';
const INDUSTRY_SELECTED: EventName = 'Industry Selected';
const COMPANY_SIZE_SELECTED: EventName = 'Company Size Selected';
const USE_CASE_SELECTED: EventName = 'Use Case Selected';
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

import { getMockedAxios } from '../../../../testUtils.node';
import { MemoryRouter } from 'react-router-dom';

const tFunction = generateMockTFunction('questionnaire');

const mockedAxios = getMockedAxios();

const QuestionnaireWizard = (props) => (
  <Questionnaire
    variant={QuestionnaireVariant.WIZARD}
    t={tFunction}
    tReady={true}
    {...props}
  />
);

const clickOnTile = async (label: string) => {
  await waitFor(
    () => screen.queryByTestId(`questionnaire-tile-${label}`) !== null
  );

  await act(async () => {
    fireEvent.click(screen.getByTestId(`questionnaire-tile-${label}`));
  });
};

const selections = {
  'Design Variant': 'Wizard',
  role: 'Safety Director',
  industry: 'Construction',
  teamSize: '1 - 20',
  purpose: 'Digitalize my Safety Management Program',
};

describe('QuestionnaireWizard', () => {
  beforeEach(() => {
    MockedAnalytics.mockClear();
    mockTrackWithCategory.mockClear();
    mockTimeEvent.mockClear();
    mockIdentify.mockClear();
  });

  test('it should render', () => {
    render(<QuestionnaireWizard form={{}} setForm={(x) => x} />);

    expect(
      screen.getByText('What is your current job title?')
    ).toBeInTheDocument();
  });

  test('it tracks all selections', async () => {
    mockedAxios.post.mockResolvedValue({});
    render(
      <MemoryRouter>
        <QuestionnaireWizard form={{}} setForm={(x) => x} />
      </MemoryRouter>
    );

    await clickOnTile(selections.role);
    await clickOnTile(selections.industry);
    await clickOnTile(selections.teamSize);
    await clickOnTile(selections.purpose);

    expect(mockTrackWithCategory).toHaveBeenCalledTimes(4);
    expect(mockTrackWithCategory.mock.calls).toEqual([
      [
        QUESTIONNAIRE,
        JOB_ROLE_SELECTED,
        {
          value: selections.role,
          'Design Variant': QuestionnaireVariant.WIZARD,
        },
      ],
      [
        QUESTIONNAIRE,
        INDUSTRY_SELECTED,
        {
          value: selections.industry,
          'Design Variant': QuestionnaireVariant.WIZARD,
        },
      ],
      [
        QUESTIONNAIRE,
        COMPANY_SIZE_SELECTED,
        {
          value: selections.teamSize,
          'Design Variant': QuestionnaireVariant.WIZARD,
        },
      ],
      [
        QUESTIONNAIRE,
        USE_CASE_SELECTED,
        {
          value: selections.purpose,
          'Design Variant': QuestionnaireVariant.WIZARD,
        },
      ],
    ]);
  });

  test('it calls onSubmit and tracks Free trial initiated event on button click', async () => {
    mockedAxios.post.mockResolvedValue({});

    render(
      <MemoryRouter>
        <QuestionnaireWizard
          form={{
            email: 'a.b@email.com',
          }}
          setForm={(x) => x}
        />
      </MemoryRouter>
    );

    await clickOnTile(selections.role);
    await clickOnTile(selections.industry);
    await clickOnTile(selections.teamSize);
    await clickOnTile(selections.purpose);

    expect(mockedAxios.post).toHaveBeenCalled();
    expect(mockedAxios.post.mock.calls[0][0]).toBe('/api/startFreeTrial');
    expect(mockTrackWithCategory).toHaveBeenCalledTimes(5);
    expect(mockTrackWithCategory.mock.calls[4]).toEqual([
      QUESTIONNAIRE,
      FREE_TRIAL_INITIATED,
      selections,
    ]);
  });
});
