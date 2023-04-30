import axios from 'axios';
import path from 'path';
import fs from 'fs';
import { flatten, unflatten } from 'flat';
import _ from 'lodash';
require('dotenv').config();

const key = process.env.DEEPL_KEY;

if (!key) {
  console.error(
    'DEEPL_KEY environment variable is required for this script to work'
  );
  process.exit(1);
}

const appName = process.argv[2];
const targetLocale = process.argv[3];
const localesDirRelative = process.argv[4] || 'static/locales';
const defaultLocale = process.argv[5] || 'en';

if (!appName || !targetLocale) {
  console.error('App name and target locale are required.');
  process.exit(1);
}

const localesDir = path.join(
  process.cwd(),
  'apps',
  appName,
  localesDirRelative
);

const defaultLocaleDir = path.join(localesDir, defaultLocale);

const replaceInterpolationsWithTags = (x: string) =>
  x.replace('{{', '<interpolate>').replace('}}', '</interpolate>');

const replaceTagsWithInterpolation = (x: string) =>
  x.replace('<interpolate>', '{{').replace('</interpolate>', '}}');

async function* fetchTranslations(
  fileContents: Object,
  targetLanguage: string
) {
  // API supports upto 50 translations per request
  const pairChunks = _.chunk<[string, string]>(_.toPairs(fileContents), 50);

  for (const pairs of pairChunks) {
    const values: string[] = pairs
      .map((p) => p[1])
      .map(replaceInterpolationsWithTags);

    const params = new URLSearchParams();
    params.append('auth_key', key || '');
    params.append('tag_handling', 'xml');
    params.append('ignore_tags', 'interpolate');
    params.append('target_lang', targetLanguage);
    values.map((value) => params.append('text', value));

    const res = await axios.post(
      'https://api-free.deepl.com/v2/translate',
      params,
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    const translations: { text: string }[] = res.data.translations;

    yield translations.map((t, index) => [
      pairs[index][0],
      replaceTagsWithInterpolation(t.text),
    ]);
  }
}

async function translate(files: string[], targetLanguage: string) {
  const outputDir = path.join(localesDir, targetLanguage);

  for (const file of files) {
    if (file.endsWith('.json')) {
      const fileContents: {} = flatten(
        JSON.parse(
          fs.readFileSync(path.join(defaultLocaleDir, file), {
            encoding: 'utf-8',
          })
        )
      );

      const pairs: string[][] = [];
      for await (const translations of fetchTranslations(
        fileContents,
        targetLanguage
      )) {
        pairs.push(...translations);
      }

      const translated = unflatten(_.fromPairs(pairs));

      if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);

      fs.writeFileSync(
        path.join(outputDir, file),
        JSON.stringify(translated, null, 2)
      );
    }
  }
}

const files = fs.readdirSync(defaultLocaleDir);

(async function () {
  console.info(
    `Translating ${appName} translation files from ${defaultLocale} to ${targetLocale}...`
  );
  await translate(files, targetLocale);
  console.info('Done!');
})();
