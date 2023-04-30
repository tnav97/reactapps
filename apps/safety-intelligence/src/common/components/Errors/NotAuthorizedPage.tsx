import React from 'react';
import { ErrorPage } from './ErrorPage';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';

interface Props {
  t: TFunction;
  tReady: boolean;
}

function NotAuthorizedPage({ t, tReady }: Props) {
  return (
    <ErrorPage
      headerText={t('notAuthorizedHeader')}
      buttonText={t('notAuthorizedButton')}
      tReady={tReady}
      t={t}
    />
  );
}

export { NotAuthorizedPage };
export default withTranslation('ErrorPage')(NotAuthorizedPage);
