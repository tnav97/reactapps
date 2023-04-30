import { AxiosError } from 'axios';
import { getMockedAxios } from '../../testUtils.node';
import activateAccount from './activateAccount';

const mockedAxios = getMockedAxios();
jest.mock('@alcumus/web-app');

describe('activateAccount', () => {
  it('works with a valid code', async () => {
    mockedAxios.post.mockResolvedValue({
      data: { data: 'http://redirect.url' },
    });

    const res = await activateAccount('valid-invitation-code');

    expect(res.redirectUrl).toBe('http://redirect.url');
  });

  it('works with an invalid code', async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        status: 400,
        data: {
          wasSuccessful: false,
        },
      },
    } as AxiosError);

    const res = await activateAccount('invalid-invitation-code');

    expect(res.redirectUrl).toBe('https://web.ecms/Login');
  });
});
