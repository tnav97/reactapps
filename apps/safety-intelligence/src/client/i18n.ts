import i18n, { InitOptions } from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const options: InitOptions = {
  fallbackLng: 'en',
  debug: !IS_PRODUCTION,
  returnEmptyString: true,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
  backend: {
    loadPath: `${window.document.baseURI}/locales/{{lng}}/{{ns}}.json`,
  },
};

i18n
  // we use the server to serve locale files (statically)
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(options);

export default i18n;
