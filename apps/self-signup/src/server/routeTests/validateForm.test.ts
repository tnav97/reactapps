import request from 'supertest';
import express, { Application } from 'express';
import validateAccountCreation from '../models/validateAccountCreation';
import validateForm from '../routes/api/validateForm';

jest.mock('../models/validateAccountCreation');

const mockValidateAccountCreation =
  validateAccountCreation as jest.MockedFunction<
    typeof validateAccountCreation
  >;

describe('/api/startFreeTrial', () => {
  let app: Application;
  beforeAll(() => {
    app = express();
    app.use(express.json());
    validateForm(app);
  });

  it('passes request body', async () => {
    mockValidateAccountCreation.mockResolvedValue({
      isValid: true,
    });

    const res = await request(app).post('/').send({ data: 'data' });
    expect(res.statusCode).toBe(200);
    expect(mockValidateAccountCreation).toBeCalledWith({ data: 'data' });

    expect(res.body).toMatchObject({ isValid: true });
  });

  it('captures validation failure as 422', async () => {
    mockValidateAccountCreation.mockResolvedValue({
      isValid: false,
    });

    const res = await request(app).post('/').send({ data: 'data' });
    expect(res.statusCode).toBe(422);
    expect(mockValidateAccountCreation).toBeCalledWith({ data: 'data' });

    expect(res.body).toMatchObject({ isValid: false });
  });
});
