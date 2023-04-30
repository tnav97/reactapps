import axios from 'axios';
import { Constants } from '@alcumus/core';
import store from 'store';
import {
  postCreateUser,
  PostCreateUserValidationError,
} from './postCreateUser';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const accessToken = 'validAccessToken';

describe('postCreateUser', () => {
  test('if backend returns 400, errors are parsed properly', async () => {
    store.set(Constants.LocalStorageKeys.AccessToken, accessToken);

    mockedAxios.post.mockRejectedValueOnce({
      isAxiosError: true,
      response: {
        status: 400,
        data: {
          errors: {
            firstName: {
              key: 'firstName',
              message: 'Firstname is not good',
            },
          },
        },
      },
    });

    const requestBody = {
      firstName: 'John',
      lastName: 'doe',
      emailAddress: 'email@email.com',
      accountType: 'INDIVIDUAL',
    };

    await expect(postCreateUser(requestBody)).rejects.toThrowError(
      PostCreateUserValidationError
    );

    expect(mockedAxios.post).toBeCalledWith('/api/users', requestBody);
  });
});
