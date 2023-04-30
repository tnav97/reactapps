import request from 'supertest';
import express from 'express';
import login from '../routes/api/redirects/login';
import { getECMSWebUrl } from '../../lib/utils/ecmsEnvURLs';

jest.mock('../../lib/utils/ecmsEnvURLs');
const mockedGetECMSWebUrl = getECMSWebUrl as jest.MockedFunction<
  typeof getECMSWebUrl
>;

describe('/api/redirects/login tests', () => {
  const app = express();
  beforeAll(() => {
    login(app);
  });
  test('it redirects', async () => {
    const response = await request(app).get('/').send();
    expect(response.status).toBe(302);
  });

  test('it calls getECMSWebUrl', async () => {
    await request(app).get('/').send();
    expect(mockedGetECMSWebUrl).toBeCalledTimes(1);
  });
});
