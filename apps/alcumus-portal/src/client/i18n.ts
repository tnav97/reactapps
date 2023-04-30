import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const options: InitOptions = {
  fallbackLng: 'en',
  // @ts-ignore
  lng: window.__DETECTED_LANGUAGE__,
  debug: !IS_PRODUCTION,
  returnEmptyString: true,
  returnNull: false,
  interpolation: {
    escapeValue: false,
  },
  react: {
    useSuspense: false,
  },
};

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

i18n
  // we use the server to serve locale files (statically)
  .use(initReactI18next)
  .init(options);

// @ts-ignore
window.i18n = i18n;

// @ts-ignore
const translations = window.__TRANSLATIONS__;
if (translations) {
  for (const language in translations) {
    for (const namespace in translations[language]) {
      i18n.addResourceBundle(
        language,
        namespace,
        translations[language][namespace],
        true,
        true
      );
    }
  }
}

export default i18n;
