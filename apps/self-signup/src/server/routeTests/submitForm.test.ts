import request from 'supertest';
import express from 'express';
import createECMSAccount from '../models/createECMSAccount';
import submitForm from '../routes/api/submitForm';
import createBillingAccount from '../models/createBillingAccount';
import { RegisterFormData } from '../../client/redux/reducers/register-reducer';
import { Utilities } from '@alcumus/core';

jest.mock('../models/createECMSAccount');
jest.mock('../models/createBillingAccount');

const mockedCreateAccount = createECMSAccount as jest.MockedFunction<
  typeof createECMSAccount
>;

const mockedCreateBillingAccount = createBillingAccount as jest.MockedFunction<
  typeof createBillingAccount
>;

const formData: RegisterFormData = {
  firstName: 'first',
  lastName: 'last',
  email: 'first.last@example.com',
};

describe('/api/submitForm', () => {
  it('calls billing service and eC API', async () => {
    Utilities.ProcessEnv.overrideEnv({
      FEATURE_TOGGLE_CREATE_BILLING_ACCOUNT_ON_SIGNUP: 'true',
    });

    const app = express();
    app.use(express.json());

    await submitForm(app);

    mockedCreateBillingAccount.mockResolvedValue({
      accountHolderName: 'first last',
      accountHolderEmail: 'first.last@example.com',
      id: '321',
    });
    mockedCreateAccount.mockResolvedValue({ ...formData });

    const res = await request(app).post('/').send(formData);

    expect(res.statusCode).toBe(200);

    expect(mockedCreateBillingAccount).toBeCalledTimes(1);
    expect(mockedCreateBillingAccount).toBeCalledWith({
      accountHolderName: 'first last',
      accountHolderEmail: 'first.last@example.com',
    });

    expect(mockedCreateAccount).toBeCalledTimes(1);
    expect(mockedCreateAccount).toBeCalledWith(formData, '321');

    expect(res.body).toMatchObject(formData);
  });

  it('does not call services if toggle is off', async () => {
    Utilities.ProcessEnv.overrideEnv({
      FEATURE_TOGGLE_CREATE_BILLING_ACCOUNT_ON_SIGNUP: 'false',
    });

    const app = express();
    app.use(express.json());

    await submitForm(app);

    mockedCreateAccount.mockResolvedValue({ ...formData });

    const res = await request(app).post('/').send(formData);

    expect(res.statusCode).toBe(200);

    expect(mockedCreateBillingAccount).not.toBeCalled();

    expect(mockedCreateAccount).toBeCalledTimes(1);
    expect(mockedCreateAccount).toBeCalledWith(formData, undefined);

    expect(res.body).toMatchObject(formData);
  });
});
