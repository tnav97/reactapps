import { getMockedAxios } from '../../testUtils.node';
import retrieveAuthToken from './retrieveAuthToken';

jest.unmock('./retrieveAuthToken');

const mockedAxios = getMockedAxios();

describe('retrieveAuthToken test', () => {
  test('it caches auth tokens', async () => {
    const tokenResponse = {
      access_token: 'token',
      token_type: 'token_type',
      expires_in: 'expires_in',
      issued: 'issued',
      expires: 'expires',
    };
    mockedAxios.post.mockResolvedValue({ data: tokenResponse });

    const res = await retrieveAuthToken();

    expect(res.accessToken).toBe('token');
    expect(res.tokenType).toBe('token_type');
    expect(res.expiresIn).toBe('expires_in');

    const res2 = await retrieveAuthToken();

    expect(res2.accessToken).toBe('token');
    expect(res2.tokenType).toBe('token_type');
    expect(res2.expiresIn).toBe('expires_in');

    // Although retrieveAuthToken was called twice, the axios call was only made once
    expect(mockedAxios.post).toBeCalledTimes(1);
  });
});
