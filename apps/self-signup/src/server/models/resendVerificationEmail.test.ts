import { getMockedAxios } from '../../testUtils.node';
import resendVerificationEmail from './resendVerificationEmail';

const mockedAxios = getMockedAxios();

describe('resendVerificationEmail', () => {
  it('passes profile and organization ID', async () => {
    const params = {
      organizationId: 'org-id',
      employeeProfileId: 'profile-id',
    };
    const res = await resendVerificationEmail(params);

    expect(mockedAxios.post.mock.calls[0][0]).toContain(
      'https://api.ecms/accounts/resendVerificationEmail'
    );
    expect(mockedAxios.post.mock.calls[0][1]).toMatchObject(params);
  });
});
