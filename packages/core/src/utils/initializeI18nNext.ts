import i18next, { i18n } from 'i18next';
import { Utilities } from '../index';
import { universalLanguageDetect } from '@unly/universal-language-detector';
import { GetTFunction, SimplifiedRequest } from '../lib/i18nNext';

export interface InitializeI18NextParams {
  fallbackLanguage?: string;
  supportedLanguages?: string[];
  projectPath: string;
}

declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}

/**
 * Detect language from the request
 */
type LanguageDetector = (req: SimplifiedRequest) => string;

export interface InitializeI18NextReturnValue {
  i18next: i18n;

  languageDetector: LanguageDetector;

  /**
   * Given the request, return an i18next translate function that is set to the
   * language set in the request and the given namespace.
   *
   * Usage:
   *
   * getTranslate(req, 'myNamespace')('myKey')
   *
   * @param req
   * @param namespace
   */
  getTranslate: GetTFunction;
}

/**
 * Detect available namespaces by traversing the en translation files
 * @param projectPath
 */
function detectNamespaces(projectPath: string): string[] {
  return ['ServerErrors'];
  // return fs
  //   .readdirSync(path.join(projectPath, '/i18n/en'))
  //   .filter((file: string) => path.extname(file) === '.yaml')
  //   .map((filename: string) => filename.replace('.yaml', ''));
}

export function initializeI18Next({
  fallbackLanguage = 'en',
  supportedLanguages = [],
  projectPath,
}: InitializeI18NextParams): InitializeI18NextReturnValue {
  const debug = Utilities.ProcessEnv.isEnabled('DEBUG_I18NEXT');

  const instance = i18next.createInstance({
    // https://www.i18next.com/overview/configuration-options#initimmediate
    // TL;DR: initImmediate needs to be false for sync translation loading
    initImmediate: false,
    debug,
    fallbackLng: fallbackLanguage,
    returnEmptyString: true,
    returnNull: false,
    supportedLngs: ['en', ...supportedLanguages],
    ns: detectNamespaces(projectPath),
    interpolation: {
      escapeValue: false,
    },
    // todo support backend for i18nnext on server-side react apps.
    // backend: {
    //   loadPath: path.join(projectPath, '/locales/{{lng}}/{{ns}}.yaml'),
    //   addPath: debug
    //     ? path.join(projectPath, '/locales/{{lng}}/{{ns}}.missing.yaml')
    //     : undefined,
    // },
  });

  /**
   * Note: the Promise from init is intentional not awaited - because
   * we force initImmediate = false, which leads to synchronous loading of
   * all translation files, although the Typescript interface does not reflect
   * that
   */
  // noinspection JSIgnoredPromiseFromCall
  // instance.use(FilesystemBackend).init((err: Error) => {
  //   if (err) {
  //     console.error('i18next initialization error:', err);
  //     throw err;
  //   }
  // });

  const languageDetector: LanguageDetector = (req) =>
    universalLanguageDetect({
      fallbackLanguage,
      supportedLanguages,
      acceptLanguageHeader: req.headers?.['accept-language'],
    });

  const getTranslate: InitializeI18NextReturnValue['getTranslate'] = (
    req,
    namespace: string
  ) => {
    return instance.getFixedT(languageDetector(req), namespace);
  };

  return {
    i18next: instance,
    languageDetector,
    getTranslate,
  };
}
