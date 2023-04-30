import { NextFunction, Response, RequestHandler } from 'express';
import { Request } from '@alcumus/core/src/types';
import universalLanguageDetect from '@unly/universal-language-detector';
import { Translations } from './types';

export default function getTranslationMiddleware(
  translations: Translations
): RequestHandler {
  function translationMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const supportedLanguages = Object.keys(translations);
    const detectedLanguage = universalLanguageDetect({
      supportedLanguages,
      fallbackLanguage: 'en',
      serverCookies: req.cookies,
      acceptLanguageHeader: req.headers['accept-language'],
      errorHandler: (e) => {
        console.error(e);
      },
    });

    req.translations = translations[detectedLanguage];
    req.detectedLanguage = detectedLanguage;
    next();
  }

  return translationMiddleware;
}
