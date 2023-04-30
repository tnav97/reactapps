import express, { Application } from 'express';
import request from 'supertest';
import initiate from '../../routes/api/sessionTransfer/initiate';
import { getRedisSingleton } from '../../../lib/utils/redisSingleton';
import { Constants, Utilities } from '@alcumus/core';

describe('Session Transfer Endpoints: handover', () => {
  const BILLING_PORTAL_SESSION_TRANSFER_SECRET = 'secret_api_key';

  let app: Application;

  beforeAll(() => {
    Utilities.ProcessEnv.overrideEnv({
      BILLING_PORTAL_SESSION_TRANSFER_SECRET,
      REDIS_HOST: '127.0.0.1',
      REDIS_PORT: '6379',
    });
    app = express();
    app.use(express.json());
    initiate(app);
  });

  afterAll(() => {
    getRedisSingleton().close();
    Utilities.ProcessEnv.clearOverrides();
  });

  test('if api key is provided, a new session is tracked in redis', async () => {
    const response = await request(app)
      .post('/')
      .set(
        Constants.RequestHeaders.ApiKey,
        BILLING_PORTAL_SESSION_TRANSFER_SECRET
      )
      .send({
        someSecretValueFromApp: 'test 123 123',
      });

    expect(response.status).toBe(201);
    expect(response.body).toMatchObject({
      sessionId: expect.stringMatching(/[a-zA-Z0-9-]*/),
    });
  });

  test('if api key is wrong, return 401', async () => {
    const response = await request(app)
      .post('/')
      .set(Constants.RequestHeaders.ApiKey, 'wrong')
      .send({
        someSecretValueFromApp: 'test 123 123',
      });

    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({
      errorId: 'createSession.invalidApiKey',
    });
  });
});
