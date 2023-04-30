import { get } from 'lodash';

const generateMockTFunction = (namespace: string, lng = 'en') => {
  const translations = require(`../static/locales/${lng}/${namespace}.json`);

  return (key) => {
    return get(translations, key);
  };
};

export { generateMockTFunction };
