export function getLanguageNameFromCode(
  languageCode: string,
  currentLocale = 'en'
) {
  return new Intl.DisplayNames([currentLocale], { type: 'language' }).of(
    languageCode
  );
}

export function getRegionNameFromCode(
  languageCode: string,
  currentLocale = 'en'
): string {
  return (
    new Intl.DisplayNames([currentLocale], { type: 'region' }).of(
      languageCode
    ) || ''
  );
}
