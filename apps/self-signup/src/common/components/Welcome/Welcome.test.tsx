import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Analytics from '@alcumus/analytics-package';
import Welcome from './Welcome';
import { EventName, Category } from '../../../lib/clients/eventsAnalytics';

jest.mock('@alcumus/analytics-package');
const mockTrackWithCategory = jest.fn();
const mockTimeEvent = jest.fn();
const MockedAnalytics = Analytics as jest.MockedClass<typeof Analytics>;
const QUESTIONNAIRE: Category = 'Questionnaire';
const QUESTIONNAIRE_PROCEEDED: EventName = 'Questionnaire Proceeded';
const QUESTIONNAIRE_INITIATED: EventName = 'Questionnaire Initiated';
const FREE_TRIAL_INITIATED: EventName = 'Free Trial Initiated';

MockedAnalytics.getInstance = jest.fn().mockImplementation(() => {
  const item = new Analytics();
  return {
    trackWithCategory: mockTrackWithCategory,
    timeEvent: mockTimeEvent,
  };
});

const WelcomeWithProps = () => (
  <Welcome firstName="" lastName="" t={(x) => x} tReady={true} />
);

describe('Welcome Component', () => {
  beforeEach(() => {
    MockedAnalytics.mockClear();
    mockTimeEvent.mockClear();
    mockTrackWithCategory.mockClear();
  });

  test('it should render', () => {
    render(<WelcomeWithProps />);
    expect(screen.getByTestId('alcumusLogo')).toBeInTheDocument();
  });

  test('it calls getInstance when rendered', () => {
    render(<WelcomeWithProps />);
    expect(MockedAnalytics.getInstance).toHaveBeenCalledTimes(1);
  });

  test('it calls trackWithCategory and timeEvent when it renders', () => {
    render(<WelcomeWithProps />);
    expect(MockedAnalytics.mock.instances[0]).toBeTruthy();
    expect(mockTrackWithCategory).toBeCalledTimes(1);
    expect(mockTrackWithCategory).toBeCalledWith(
      QUESTIONNAIRE,
      QUESTIONNAIRE_INITIATED
    );
    expect(mockTimeEvent).toBeCalledTimes(1);
    expect(mockTimeEvent).toBeCalledWith(FREE_TRIAL_INITIATED);
  });

  test('it calls trackWithCategory on button click', () => {
    render(
      <MemoryRouter>
        <WelcomeWithProps />
      </MemoryRouter>
    );
    const button = screen.getByTestId('soundsGreat');

    fireEvent.click(button);

    expect(mockTrackWithCategory).toBeCalledTimes(2);
    expect(mockTrackWithCategory).toBeCalledWith(
      QUESTIONNAIRE,
      QUESTIONNAIRE_PROCEEDED
    );
  });
});
