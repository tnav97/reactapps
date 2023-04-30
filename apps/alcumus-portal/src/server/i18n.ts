import { Utilities } from '@alcumus/core';
import * as path from 'path';

export const { i18next, languageDetector, getTranslate } =
  Utilities.initializeI18Next({
    supportedLanguages: ['en'],
    fallbackLanguage: 'en',
    projectPath: path.join(__dirname, '../../static'),
  });

export const ServerErrorNamespace = 'ServerErrors';
