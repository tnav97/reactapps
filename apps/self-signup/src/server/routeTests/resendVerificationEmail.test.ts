import request from 'supertest';
import express, { Application } from 'express';
import resendVerificationEmail from '../models/resendVerificationEmail';
import resendVerificationEmailRoute from '../routes/api/resendVerificationEmail';

jest.mock('../models/resendVerificationEmail');

const mockResendVerificationEmail =
  resendVerificationEmail as jest.MockedFunction<
    typeof resendVerificationEmail
  >;

describe('/api/startFreeTrial', () => {
  let app: Application;
  beforeAll(() => {
    app = express();
    app.use(express.json());
    resendVerificationEmailRoute(app);
  });

  it('passes request body', async () => {
    mockResendVerificationEmail.mockResolvedValue(true);

    const res = await request(app).post('/').send({ data: 'data' });
    expect(res.statusCode).toBe(200);
    expect(mockResendVerificationEmail).toBeCalledWith({ data: 'data' });

    expect(res.body).toMatchObject({ success: true });
  });
});
