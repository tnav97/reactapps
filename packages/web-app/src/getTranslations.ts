import fs from 'fs';
import path from 'path';

import { Translations } from './types';

export const getTranslations = (localesDirectory: string) => {
  const namespaceExtension = '.json';
  const translations: Translations = {};

  for (const locale of fs.readdirSync(localesDirectory)) {
    const localeDir = path.join(localesDirectory, locale);
    if (fs.lstatSync(localeDir).isDirectory()) {
      const namespaces = fs.readdirSync(localeDir);
      for (const namespace of namespaces) {
        if (path.extname(namespace) === namespaceExtension) {
          if (!translations[locale]) translations[locale] = {};
          translations[locale][
            path.basename(namespace, namespaceExtension)
          ] = require(path.join(localeDir, namespace));
        }
      }
    }
  }

  return translations;
};
