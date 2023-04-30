import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import Analytics from '@alcumus/analytics-package';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router';
import { EventName, Category } from '../../../lib/clients/eventsAnalytics';
import RegisterForm from './RegisterForm';

jest.mock('use-debounce', () => ({
  useDebouncedCallback: (x) => x,
}));

const zxcvbn = jest.fn();
jest.mock('zxcvbn', () => zxcvbn);
jest.mock('@alcumus/analytics-package');

const COMPANY_NAME_ENTERED: EventName = 'Company Name Entered';
const CREATE_ACCOUNT_SUBMITTED: EventName = 'Create Account Submitted';
const EMAIL_ID_ENTERED: EventName = 'Email Id Entered';
const SIGNUP_FORM: Category = 'Signup Form';
const SIGNUP_INITIATED: EventName = 'Signup Initiated';
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

const mockedAxios = axios as jest.Mocked<typeof axios>;

function inputEvent(text: string) {
  return { target: { value: text } };
}

async function renderDesignA(setForm = () => {}) {
  await act(async () => {
    render(
      <MemoryRouter>
        <RegisterForm
          form={{}}
          setForm={setForm}
          tReady={true}
          t={(x) => (x === 'tooltips.password.tips' ? [] : x)}
        />
      </MemoryRouter>
    );
  });
}

function fillForm(fields) {
  for (const field in fields) {
    fireEvent.input(screen.getByTestId(field), inputEvent(fields[field]));
  }
}

describe('Register Form Design A', () => {
  beforeAll(() => {
    mockedAxios.post.mockResolvedValue({ data: {} });
    zxcvbn.mockReturnValue({
      score: 4,
      feedback: {},
    });
  });

  beforeEach(() => {
    MockedAnalytics.mockClear();
    mockTrackWithCategory.mockClear();
    mockTimeEvent.mockClear();
    mockIdentify.mockClear();
  });

  test('it should render', async () => {
    await renderDesignA();
    expect(screen.getByText('heading')).toBeInTheDocument();
    expect(screen.getByText('labels.firstName')).toBeInTheDocument();
    expect(screen.getByText('labels.lastName')).toBeInTheDocument();
    expect(screen.getByText('labels.email')).toBeInTheDocument();
    expect(screen.getByText('labels.companyName')).toBeInTheDocument();
    expect(screen.getByText('labels.password')).toBeInTheDocument();
  });

  test('it should not proceed without name', async () => {
    await renderDesignA();

    act(() => {
      fillForm({
        email: 'emily@ecompliance.com',
        companyName: 'ecompliance',
        password: 'jauuhsnxkmdjwbhzjajjkks',
      });
      fireEvent.click(screen.getByTestId('terms'));
    });

    expect(screen.getByTestId('createAccount')).toBeDisabled();

    act(() => {
      fillForm({
        firstName: 'Emily',
        lastName: 'Smith',
      });
    });

    await waitFor(() =>
      expect(screen.getByTestId('createAccount')).not.toBeDisabled()
    );
  });

  test('it should not proceed with empty password', async () => {
    await renderDesignA();

    act(() => {
      fillForm({
        firstName: 'Emily',
        lastName: 'Smith',
        email: 'emily@ecompliance.com',
        companyName: 'ecompliance',
        password: 'jauuhsnxkmdjwbhzjajjkks',
      });
      fireEvent.click(screen.getByTestId('terms'));
    });

    await waitFor(() =>
      expect(screen.getByTestId('createAccount')).not.toBeDisabled()
    );

    act(() => fillForm({ password: '' }));

    await waitFor(() =>
      expect(screen.getByTestId('createAccount')).toBeDisabled()
    );
  });

  test('it should send data to setForm', async () => {
    const setForm = jest.fn();
    zxcvbn.mockReturnValue({ score: 4 });

    await renderDesignA(setForm);

    act(() => {
      fillForm({
        firstName: 'Emily',
        lastName: 'Smith',
        email: 'emily@ecompliance.com',
        companyName: 'ecompliance',
        password: 'jauuhsnxkmdjwbhzjajjkks',
      });
      fireEvent.click(screen.getByTestId('terms'));
    });

    await waitFor(() =>
      expect(screen.getByTestId('createAccount')).not.toBeDisabled()
    );

    mockedAxios.post.mockResolvedValueOnce({
      data: {
        data: {
          employeeProfileId: 'employee-id',
          organizationId: 'org-id',
        },
      },
    });

    await act(async () => {
      fireEvent.click(screen.getByTestId('createAccount'));
    });

    expect(setForm).toBeCalled();
    expect(setForm).toBeCalledWith({
      firstName: 'Emily',
      lastName: 'Smith',
      email: 'emily@ecompliance.com',
      companyName: 'ecompliance',
      password: 'jauuhsnxkmdjwbhzjajjkks',
      passwordScore: 4,
      termsCheck: true,
      employeeProfileId: 'employee-id',
      organizationId: 'org-id',
    });
  });

  test('it should validate password using zxcvbn', async () => {
    zxcvbn.mockReturnValue({
      score: 2,
      feedback: {
        warning: 'use better password',
      },
    });

    await renderDesignA();

    act(() => {
      fillForm({
        firstName: 'Emily',
        lastName: 'Smith',
        email: 'emily@ecompliance.com',
        companyName: 'ecompliance',
        password: 'password',
      });
    });

    await waitFor(() => expect(zxcvbn).toBeCalled());
    expect(zxcvbn).toBeCalledWith('password', [
      'Emily',
      'Smith',
      'ecompliance',
      'emily@ecompliance.com',
    ]);
    expect(zxcvbn.mock.results[0].value.feedback.warning).toBe(
      'use better password'
    );
  });

  test('it calls trackWithCategory and timeEvent on render', async () => {
    await renderDesignA();

    expect(mockTrackWithCategory).toBeCalledTimes(1);
    expect(mockTrackWithCategory).toBeCalledWith(
      SIGNUP_FORM,
      SIGNUP_INITIATED,
      { 'Design Variant': 'Single page' }
    );

    expect(mockTimeEvent).toBeCalledTimes(1);
    expect(mockTimeEvent).toBeCalledWith(CREATE_ACCOUNT_SUBMITTED);
  });

  test('it trackWithCategory on entering email and company', async () => {
    await renderDesignA();

    const email = screen.getByTestId('email');
    const companyName = screen.getByTestId('companyName');

    await act(async () => {
      fillForm({
        email: 'a.b@email.com',
        companyName: 'Company Name',
      });
    });
    fireEvent.blur(companyName);
    fireEvent.blur(email);

    expect(mockTrackWithCategory).toBeCalledTimes(3);
    const [, secondMockCall, thirdMockCall] = mockTrackWithCategory.mock.calls;
    expect(secondMockCall).toEqual([
      SIGNUP_FORM,
      COMPANY_NAME_ENTERED,
      { value: 'Company Name', 'Design Variant': 'Single page' },
    ]);
    expect(thirdMockCall).toEqual([
      SIGNUP_FORM,
      EMAIL_ID_ENTERED,
      { value: 'a.b@email.com', 'Design Variant': 'Single page' },
    ]);
  });
});
