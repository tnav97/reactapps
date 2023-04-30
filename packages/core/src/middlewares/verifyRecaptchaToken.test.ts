import verifyRecaptchaToken from './verifyRecaptchaToken';
import { Request } from '../types';
import { Response } from 'express';
import axios from 'axios';

const SECRET = 'recaptcha-secret';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('verifyRecaptchaToken Middleware', () => {
  const mockResStatus = jest.fn();
  const mockResJson = jest.fn();
  const mockNext = jest.fn();

  const req = {
    headers: {
      'x-recaptcha-token': 'recaptcha-token',
    },
  } as unknown as Request;

  const res = {
    status: mockResStatus,
    json: mockResJson,
  } as unknown as Response;

  beforeEach(() => {
    mockResStatus.mockReturnThis();
  });

  afterEach(() => {
    mockedAxios.post.mockReset();
    mockResStatus.mockReset();
    mockResJson.mockReset();
    mockNext.mockReset();
  });

  it('calls reCAPTCHA API with token and secret', async () => {
    mockedAxios.post.mockResolvedValue({
      status: 200,
      data: { success: true },
    });

    await verifyRecaptchaToken(SECRET)(req, res, mockNext);

    expect(mockedAxios.post).toBeCalledWith(
      'https://www.google.com/recaptcha/api/siteverify',
      'secret=recaptcha-secret&response=recaptcha-token',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    expect(mockNext).toBeCalledTimes(1);
  });

  it('if reCAPTCHA fails, 403 is returned', async () => {
    mockedAxios.post.mockResolvedValue({
      status: 200,
      data: { success: false },
    });

    await verifyRecaptchaToken(SECRET)(req, res, mockNext);

    expect(mockNext).not.toBeCalled();
    expect(mockResStatus).toBeCalledWith(403);
    expect(mockResJson).toBeCalledWith({
      error: 'recaptcha.invalid',
    });
  });
});
