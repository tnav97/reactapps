import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import Analytics from '@alcumus/analytics-package';
import { act } from 'react-dom/test-utils';
import { MemoryRouter } from 'react-router';
import { EventName, Category } from '../../../lib/clients/eventsAnalytics';
import RegisterForm from './RegisterForm';
import { RegisterFormVariant } from '../../types/registerForm';

const COMPANY_NAME_ENTERED: EventName = 'Company Name Entered';
const CREATE_ACCOUNT_SUBMITTED: EventName = 'Create Account Submitted';
const EMAIL_ID_ENTERED: EventName = 'Email Id Entered';
const SIGNUP_FORM: Category = 'Signup Form';
const SIGNUP_INITIATED: EventName = 'Signup Initiated';

const zxcvbn = jest.fn();
jest.mock('zxcvbn', () => zxcvbn);
jest.mock('@alcumus/analytics-package');

const mockedAxios = axios as jest.Mocked<typeof axios>;
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
function inputEvent(text: string) {
  return { target: { value: text } };
}

async function renderDesignB(setForm = () => {}) {
  await act(async () => {
    render(
      <MemoryRouter>
        <RegisterForm
          form={{}}
          setForm={setForm}
          tReady={true}
          variant={RegisterFormVariant.MULTIPLE_PAGES}
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

async function moveToStep1() {
  act(() => {
    fireEvent.click(screen.getByTestId('previous'));
  });

  await waitFor(() => expect(screen.queryByTestId('firstName')).not.toBeNull());
}

async function moveToStep2() {
  await waitFor(() => expect(screen.getByTestId('next')).not.toBeDisabled());

  act(() => {
    fireEvent.click(screen.getByTestId('next'));
  });

  await waitFor(() => expect(screen.queryByTestId('email')).not.toBeNull());
}

describe('Register Form Design B', () => {
  beforeAll(() => {
    mockedAxios.post.mockResolvedValue({ data: {} });
    zxcvbn.mockReturnValue({ score: 4 });
  });

  beforeEach(() => {
    MockedAnalytics.mockClear();
    mockTrackWithCategory.mockClear();
    mockTimeEvent.mockClear();
    mockIdentify.mockClear();
  });

  test('it should render', async () => {
    await renderDesignB();

    expect(screen.getByText('heading')).toBeInTheDocument();
    expect(screen.getByText('labels.firstName')).toBeInTheDocument();
    expect(screen.getByText('labels.lastName')).toBeInTheDocument();
    expect(screen.getByText('labels.companyName')).toBeInTheDocument();
    expect(screen.queryByText('labels.email')).not.toBeInTheDocument();
    expect(screen.queryByText('labels.password')).not.toBeInTheDocument();
  });

  test('it should not proceed without name', async () => {
    await renderDesignB();

    act(() => {
      fillForm({
        companyName: 'Company 11',
      });
    });

    expect(screen.getByTestId('next')).toBeDisabled();

    act(() => {
      fillForm({
        firstName: 'Emily',
        lastName: 'Smith',
      });
    });

    await waitFor(() => expect(screen.getByTestId('next')).not.toBeDisabled());
  });

  test('it should not proceed with empty password', async () => {
    await renderDesignB();

    act(() => {
      fillForm({
        firstName: 'Emily',
        lastName: 'Smith',
        companyName: 'Company 11',
      });
    });

    await moveToStep2();

    act(() => {
      fillForm({
        email: 'test@test.com',
        password: 'password',
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
    zxcvbn.mockReturnValue({
      score: 4,
      feedback: {},
    });

    await renderDesignB(setForm);

    act(() => {
      fillForm({
        firstName: 'Emily',
        lastName: 'Smith',
        companyName: 'ecompliance',
      });
    });

    await moveToStep2();

    await moveToStep1();

    await moveToStep2();

    act(() => {
      fillForm({
        email: 'emily@ecompliance.com',
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

    expect(setForm).toBeCalledTimes(1);
    expect(setForm).toBeCalledWith({
      firstName: 'Emily',
      lastName: 'Smith',
      email: 'emily@ecompliance.com',
      companyName: 'ecompliance',
      password: 'jauuhsnxkmdjwbhzjajjkks',
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

    await renderDesignB();

    act(() => {
      fillForm({
        firstName: 'Emily',
        lastName: 'Smith',
        companyName: 'ecompliance',
      });
    });

    await moveToStep2();

    act(() => {
      fillForm({
        email: 'emily@ecompliance.com',
        password: 'password',
      });
      fireEvent.click(screen.getByTestId('terms'));
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
    await renderDesignB();

    expect(mockTrackWithCategory).toBeCalledTimes(1);
    expect(mockTrackWithCategory).toBeCalledWith(
      SIGNUP_FORM,
      SIGNUP_INITIATED,
      { 'Design Variant': RegisterFormVariant.MULTIPLE_PAGES }
    );

    expect(mockTimeEvent).toBeCalledTimes(1);
    expect(mockTimeEvent).toBeCalledWith(CREATE_ACCOUNT_SUBMITTED);
  });

  test('it trackWithCategory on entering email and company', async () => {
    await renderDesignB();

    act(() => fillForm({ companyName: 'Company Name' }));
    fireEvent.blur(screen.getByTestId('companyName'));

    act(() => fillForm({ firstName: 'Emily', lastName: 'Smith' }));
    await moveToStep2();

    act(() => fillForm({ email: 'a.b@email.com' }));
    fireEvent.blur(screen.getByTestId('email'));

    expect(mockTrackWithCategory).toBeCalledTimes(3);
    const [, secondMockCall, thirdMockCall] = mockTrackWithCategory.mock.calls;
    expect(secondMockCall).toEqual([
      SIGNUP_FORM,
      COMPANY_NAME_ENTERED,
      {
        value: 'Company Name',
        'Design Variant': RegisterFormVariant.MULTIPLE_PAGES,
      },
    ]);
    expect(thirdMockCall).toEqual([
      SIGNUP_FORM,
      EMAIL_ID_ENTERED,
      {
        value: 'a.b@email.com',
        'Design Variant': RegisterFormVariant.MULTIPLE_PAGES,
      },
    ]);
  });
});
