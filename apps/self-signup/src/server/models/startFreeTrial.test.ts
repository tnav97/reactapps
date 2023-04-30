import { AxiosResponse } from 'axios';
import { getMockedAxios } from '../../testUtils.node';
import startFreeTrial from './startFreeTrial';

const mockedAxios = getMockedAxios();

describe('startFreeTrial', () => {
  it('transforms fields properly', async () => {
    mockedAxios.post.mockResolvedValue({
      status: 200,
      data: {},
    } as AxiosResponse);

    const res = await startFreeTrial({
      firstName: 'Test',
      lastName: 'Test',
      email: 'email@email.com',
      companyName: 'Company Name',
      password: 'test-password',
      employeeProfileId: 'profileId',
      organizationId: 'orgId',
      industry: 'Safety',
      purpose: 'Reduce accidents',
      role: 'Director',
      teamSize: '0 - 20',
    });

    expect(res).toBe(true);

    expect(mockedAxios.post.mock.calls[0][0]).toBe(
      'https://api.ecms/accounts/startFreeTrial'
    );
    expect(mockedAxios.post.mock.calls[0][1]).toMatchObject({
      employeeProfileId: 'profileId',
      organizationId: 'orgId',
      purpose: 'Reduce accidents',
      industry: 'Safety',
      teamSize: '0 - 20',
      role: 'Director',
    });
  });
});
