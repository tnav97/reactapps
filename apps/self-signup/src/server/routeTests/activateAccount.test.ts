import request from 'supertest';
import express, { Application } from 'express';
import activateAccount from '../models/activateAccount';
import activateAccountRoute from '../routes/api/activateAccount';

jest.mock('../models/activateAccount');

const mockActivateAccount = activateAccount as jest.MockedFunction<
  typeof activateAccount
>;

describe('/api/activateAccount', () => {
  let app: Application;
  beforeAll(() => {
    app = express();
    app.use(express.json());
    activateAccountRoute(app);
  });

  it('throws 422 when invitation code absent', async () => {
    const res = await request(app).post('/').send({ data: 'data' });
    expect(res.statusCode).toBe(422);
    expect(mockActivateAccount).not.toBeCalled();
  });

  it('passes invitation code', async () => {
    mockActivateAccount.mockResolvedValue({ redirectUrl: 'test' });

    const res = await request(app).post('/').send({ invitationCode: 'code' });
    expect(res.statusCode).toBe(200);
    expect(mockActivateAccount).toBeCalledWith('code');

    expect(res.body).toMatchObject({
      redirectUrl: 'test',
    });
  });
});
