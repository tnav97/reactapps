import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import { RegisterFormData } from '../../../client/redux/reducers/register-reducer';
import VerifyAccountPageComponent from './VerifyAccountPage';
import { EventName, Category } from '../../../lib/clients/eventsAnalytics';
import Analytics from '@alcumus/analytics-package';
const EMAIL_VERIFICATION: Category = 'Email Verification';
const EMAIL_VERIFICATION_RETRY: EventName = 'Email Verification Retry';

jest.mock('axios');
jest.mock('@alcumus/analytics-package');

const mockTrackWithCategory = jest.fn();
const mockTimeEvent = jest.fn();
const MockedAnalytics = Analytics as jest.MockedClass<typeof Analytics>;

const VerifyAccountPage = (props) => (
  <VerifyAccountPageComponent tReady={true} t={(x) => x} {...props} />
);
const mockedAxios = axios as jest.Mocked<typeof axios>;
MockedAnalytics.getInstance = jest.fn().mockImplementation(() => {
  const item = new Analytics();
  return {
    trackWithCategory: mockTrackWithCategory,
    timeEvent: mockTimeEvent,
  };
});

const form: RegisterFormData = {
  email: 'test@test.com',
  employeeProfileId: 'profile-id',
  organizationId: 'org-id',
};

describe('Verify Account Page', () => {
  beforeAll(() => {
    mockedAxios.post.mockResolvedValue({ data: {} });
  });

  beforeEach(() => {
    MockedAnalytics.mockClear();
    mockTrackWithCategory.mockClear();
    mockTimeEvent.mockClear();
  });

  test('it should render', () => {
    render(<VerifyAccountPage form={form} />);
    expect(screen.getByText('test@test.com')).toBeInTheDocument();

    expect(window.document.title).toBe('header');
  });

  test('it should capture invitation code from query params', async () => {
    render(<VerifyAccountPage form={form} />);

    const button = screen.getByTestId('resendEmailButton');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);

    await waitFor(() => expect(mockedAxios.post).toHaveBeenCalled());

    expect(screen.getByText('alertMessage')).toBeInTheDocument();
  });

  test('it tracks email verification retry event', async () => {
    render(<VerifyAccountPage form={{}} />);
    fireEvent.click(screen.getByTestId('resendEmailButton'));
    await waitFor(() =>
      expect(mockTrackWithCategory).toHaveBeenLastCalledWith(
        EMAIL_VERIFICATION,
        EMAIL_VERIFICATION_RETRY
      )
    );
  });
});
