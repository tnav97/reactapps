import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { LocalizableError, LocalizedError } from '../types';
import { GetTFunction } from '../lib/i18nNext';

export function getLocalizedErrorHandler(
  getTranslate: GetTFunction,
  namespace: string
): ErrorRequestHandler {
  return (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    if (!error) {
      next();
      return;
    }
    if (error instanceof LocalizedError) {
      const localizedError = error as LocalizedError;
      response.status(localizedError.status).json({
        message: localizedError.message,
      });
      return;
    } else if (error instanceof LocalizableError) {
      const localizableError = error as LocalizableError;
      const translate = getTranslate(request, namespace);
      const translatedMessage = translate(error.message);
      response.status(localizableError.status).json({
        message: translatedMessage,
      });
      return;
    }
    next();
  };
}
