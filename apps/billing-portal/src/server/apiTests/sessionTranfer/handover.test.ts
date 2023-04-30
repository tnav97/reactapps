import express, { Application } from 'express';
import { PromisifiedRedis } from '../../../lib/utils/promisifiedRedis';
import { SESSION_TRANSFER_REDIS_KEY_PREFIX } from '../../../common/constants/sessionTransfer';
import request from 'supertest';
import handover from '../../routes/api/sessionTransfer/handover';
import { getRedisSingleton } from '../../../lib/utils/redisSingleton';
import { Utilities } from '@alcumus/core';

describe('Session Transfer Endpoints: hydrate', () => {
  let redis: PromisifiedRedis;
  let app: Application;

  let mockedSession: any = {};

  beforeAll(() => {
    Utilities.ProcessEnv.overrideEnv({
      REDIS_HOST: '127.0.0.1',
      REDIS_PORT: '6379',
    });
    redis = getRedisSingleton();
  });

  afterAll(() => {
    redis.close();
    Utilities.ProcessEnv.clearOverrides();
  });

  beforeEach(() => {
    mockedSession = {};
    app = express();
    app.use(express.json());
    app.use((req, res, next) => {
      // @ts-ignore
      req.session = mockedSession;
      next();
    });
    handover(app);
  });

  test('if session ID is valid, user session is hydrated, redis is cleared', async () => {
    const redisKey = `${SESSION_TRANSFER_REDIS_KEY_PREFIX}_session-id-123`;

    await redis.set(redisKey, 2000, '{"seats":10}');

    const response = await request(app)
      .get('/')
      .query({ sessionId: 'session-id-123' });

    expect(response.status).toBe(302);

    expect(mockedSession.transferredSession?.seats).toBeDefined();
    expect(mockedSession.transferredSession?.seats).toBe(10);

    expect(await redis.get(redisKey)).toBe(null);
  });

  test('if session ID is invalid, do not hydrate session', async () => {
    const redisKey = `${SESSION_TRANSFER_REDIS_KEY_PREFIX}_session-id-123`;

    await redis.set(redisKey, 2000, '{"test":"test"}');

    const response = await request(app)
      .get('/')
      .query({ sessionId: 'session-id-456' });

    expect(response.status).toBe(401);

    expect(mockedSession.transferredSession).toBeUndefined();
  });
});
