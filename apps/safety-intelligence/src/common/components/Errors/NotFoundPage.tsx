import React from 'react';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import { ErrorPage } from './ErrorPage';

interface Props {
  t: TFunction;
  tReady: boolean;
}

function NotFoundPage({ t, tReady }: Props) {
  return (
    <ErrorPage
      headerText={t('notFoundHeader')}
      buttonText={t('notFoundButton')}
      t={t}
      tReady={tReady}
    />
  );
}

export { NotFoundPage };
export default withTranslation('ErrorPage')(NotFoundPage);
