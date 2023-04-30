import request from 'supertest';
import express, { Application } from 'express';
import startFreeTrial from '../models/startFreeTrial';
import startFreeTrialRoute from '../routes/api/startFreeTrial';

jest.mock('../models/startFreeTrial');

const mockStartFreeTrial = startFreeTrial as jest.MockedFunction<
  typeof startFreeTrial
>;

describe('/api/startFreeTrial', () => {
  let app: Application;
  beforeAll(() => {
    app = express();
    app.use(express.json());
    startFreeTrialRoute(app);
  });

  it('passes request body', async () => {
    mockStartFreeTrial.mockResolvedValue(true);

    const res = await request(app).post('/').send({ data: 'data' });
    expect(res.statusCode).toBe(200);
    expect(mockStartFreeTrial).toBeCalledWith({ data: 'data' });

    expect(res.body).toMatchObject({ success: true });
  });
});
