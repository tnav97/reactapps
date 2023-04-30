import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import RegisterForm from './RegisterForm';
import { MemoryRouter } from 'react-router-dom';
import environmentVariables from '../../environmentVariables';
import { act } from 'react-dom/test-utils';
import Analytics from '@alcumus/analytics-package';
import axios from 'axios';

const zxcvbn = jest.fn();
jest.mock('zxcvbn', () => zxcvbn);
jest.mock('@alcumus/analytics-package');

const mockedAxios = axios as jest.Mocked<typeof axios>;

const MockedAnalytics = Analytics as jest.MockedClass<typeof Analytics>;
MockedAnalytics.getInstance = jest.fn().mockImplementation(() => {
  return {
    trackWithCategory: jest.fn(),
    timeEvent: jest.fn(),
    identify: jest.fn(),
  };
});

function fillForm(fields: any) {
  for (const field in fields) {
    fireEvent.input(screen.getByTestId(field), {
      target: { value: fields[field] },
    });
  }
}

const mockRecaptchaExecuteAsync = jest.fn();

async function renderDesignA(setForm = () => {}) {
  await act(async () => {
    render(
      <MemoryRouter>
        <RegisterForm
          form={{}}
          setForm={setForm}
          tReady={true}
          t={(x: string) => (x === 'tooltips.password.tips' ? [] : x)}
        />
      </MemoryRouter>
    );
  });
}

jest.mock(
  'react-google-recaptcha',
  () =>
    class MockedReCAPTCHA extends React.Component<{
      sitekey: string;
      size: string;
    }> {
      private executeAsync: Function = mockRecaptchaExecuteAsync;

      render() {
        return (
          <div data-testid="mocked-recaptcha">
            <div data-testid="mocked-recaptcha-sitekey">
              {this.props.sitekey}
            </div>
            <div data-testid="mocked-recaptcha-size">{this.props.size}</div>
          </div>
        );
      }
    }
);

describe('RegisterForm renders ReCAPTCHA', () => {
  it('does not renders ReCAPTCHA if feature toggle is off', async () => {
    environmentVariables.SELF_SIGNUP_USE_RECAPTCHA_TOGGLE = 'false';

    await renderDesignA();

    expect(screen.queryByTestId('mocked-recaptcha')).not.toBeInTheDocument();
  });

  it('renders ReCAPTCHA if feature toggle is on', async () => {
    environmentVariables.SELF_SIGNUP_USE_RECAPTCHA_TOGGLE = 'true';
    environmentVariables.SELF_SIGNUP_RECAPTCHA_SITE_KEY = 'recaptcha-site-key';

    await renderDesignA();

    expect(screen.queryByTestId('mocked-recaptcha')).toBeInTheDocument();
    const siteKey = screen.getByTestId('mocked-recaptcha-sitekey');
    const size = screen.getByTestId('mocked-recaptcha-size');
    expect(siteKey).toBeInTheDocument();
    expect(siteKey).toHaveTextContent('recaptcha-site-key');
    expect(size).toBeInTheDocument();
    expect(size).toHaveTextContent('invisible');
  });

  it('ReCAPTCHA token is generated on submit, if feature toggle is on', async () => {
    environmentVariables.SELF_SIGNUP_USE_RECAPTCHA_TOGGLE = 'true';
    environmentVariables.SELF_SIGNUP_RECAPTCHA_SITE_KEY = 'recaptcha-site-key';

    zxcvbn.mockReturnValue({ score: 4 });

    await renderDesignA();

    expect(screen.queryByTestId('mocked-recaptcha')).toBeInTheDocument();

    await act(async () => {
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

    mockRecaptchaExecuteAsync.mockResolvedValue('recaptcha-token');
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

    expect(mockRecaptchaExecuteAsync).toBeCalled();
    expect(mockedAxios.post).toBeCalledWith(
      '/api/submitForm',
      expect.objectContaining({ firstName: 'Emily' }),
      {
        headers: {
          'x-recaptcha-token': 'recaptcha-token',
        },
      }
    );
  });
});
