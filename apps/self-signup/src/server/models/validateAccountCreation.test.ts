import { AxiosError, AxiosResponse } from 'axios';
import { getMockedAxios } from '../../testUtils.node';
import validateAccountCreation from './validateAccountCreation';

const mockedAxios = getMockedAxios();
jest.mock('@alcumus/web-app');

describe('validateAccountCreation', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('December 1, 2020'));
  });
  afterAll(() => {
    jest.setSystemTime(jest.getRealSystemTime());
  });

  it('can process successful response', async () => {
    mockedAxios.post.mockResolvedValue({
      status: 200,
      data: {},
    } as AxiosResponse);

    const res = await validateAccountCreation({
      firstName: 'Test',
      lastName: 'Test',
      email: 'email@email.com',
      companyName: 'Company Name',
      password: 'test-password',
    });

    expect(res).toMatchObject({ isValid: true });

    expect(mockedAxios.post.mock.calls[0][0]).toBe(
      'https://api.ecms/accounts/validate'
    );

    expect(mockedAxios.post.mock.calls[0][1]).toMatchObject({
      emailAddress: 'email@email.com',
      enrollmentDate: '12/01/2020',
      firstName: 'Test',
      lastName: 'Test',
      notes: 'Self serve sign-up',
      organization: { organizationName: 'Company Name' },
      password: 'test-password',
      phoneNumber: '000-000-0000',
    });
  });

  it('can process error response', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 400,
        data: {
          modelState: {
            'addAccountRequestDto.Organization.OrganizationName': [
              'Organization name invalid',
            ],
            'addAccountRequestDto.EmailAddress': ['Email invalid'],
            'addAccountRequestDto.FirstName': ['First name invalid'],
            'addAccountRequestDto.LastName': ['Last name invalid'],
            'addAccountRequestDto.Password': ['Password invalid'],
          },
        },
      },
    } as AxiosError);

    const res = await validateAccountCreation({
      firstName: 'Test',
      lastName: 'Test',
      email: 'email@email.com',
      companyName: 'Company Name',
      password: 'test-password',
    });

    expect(res).toMatchObject({
      isValid: false,
      companyName: 'Organization name invalid',
      email: 'Email invalid',
      password: 'Password invalid',
      firstName: 'First name invalid',
      lastName: 'Last name invalid',
    });
  });
});
