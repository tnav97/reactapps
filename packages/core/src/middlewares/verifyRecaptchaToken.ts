import axios from 'axios';
import { NextFunction, Response } from 'express';
import { RequestHeaders } from '../constants';
import { Request } from '../types';

const RECAPTCHA_API = 'https://www.google.com/recaptcha/api/siteverify';

/**
 * This function generates a middleware that can verify recaptcha tokens
 * passed as headers using the given recaptcha secret
 * @param recaptchaSecret
 */
export default function verifyRecaptchaToken(recaptchaSecret: string) {
  return async function verifyRecaptchaTokenMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const token = req.headers[RequestHeaders.ReCAPTCHAToken];

    // This API only accepts application/x-www-form-urlencoded
    // https://groups.google.com/g/recaptcha/c/yEPN3d9ylT8/m/sisDSTBFDAAJ
    const result = await axios.post(
      RECAPTCHA_API,
      `secret=${recaptchaSecret}&response=${token}`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    if (result.status === 200 && result.data.success === true) {
      next();
    } else {
      res.status(403).json({
        error: 'recaptcha.invalid',
      });
    }
  };
}
