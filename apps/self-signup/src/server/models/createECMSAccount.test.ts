import { AxiosResponse } from 'axios';
import { getMockedAxios } from '../../testUtils.node';
import createECMSAccount from './createECMSAccount';

const mockedAxios = getMockedAxios();

describe('createECMSAccount', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern');
    jest.setSystemTime(new Date('December 1, 2020'));
  });
  afterAll(() => {
    jest.setSystemTime(jest.getRealSystemTime());
  });

  it('transforms fields properly', async () => {
    mockedAxios.post.mockResolvedValue({
      status: 200,
      data: {
        wasSuccessful: true,
      },
    } as AxiosResponse);

    const res = await createECMSAccount({
      firstName: 'Test',
      lastName: 'Test',
      email: 'email@email.com',
      companyName: 'Company Name',
      password: 'test-password',
    });

    expect(res.wasSuccessful).toBe(true);

    expect(mockedAxios.post.mock.calls[0][0]).toBe('https://api.ecms/accounts');
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
});
