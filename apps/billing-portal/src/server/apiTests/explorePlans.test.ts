import request from 'supertest';
import express, { Application } from 'express';

import explorePlans from '../routes/api/explorePlans';
import { UpgradeTrialAccountRequestDto } from '../../types/upgradeTrialAccountRequestDto';

describe('when making request to plans endpoint', () => {
  let app: Application;
  beforeAll(() => {
    app = express();
    app.use(express.json());
    explorePlans(app);
  });
  it('should call explorePlans', async () => {
    const requestDto: UpgradeTrialAccountRequestDto = {
      accountHolderEmail: '',
      accountHolderName: '',
      seats: 0,
      successUrl: '/ecms/account',
      cancelUrl: '/ecms',
      billingAccountToken: '/ecms',
    };

    const response = await request(app)
      .post('/')
      .send(requestDto)
      .query('product=eCompliance');
    expect(response.statusCode).toBe(200);

    expect(response.body).toBe('/plans?product=eCompliance');
  });
});
