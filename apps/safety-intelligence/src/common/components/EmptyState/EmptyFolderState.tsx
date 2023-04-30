import React from 'react';
import { TFunction } from 'i18next';
import { withTranslation } from 'react-i18next';
import CreateNewButton from '../Button/CreateNewButton';
import { EmptyStateBasePage } from './EmptyStateBasePage';

interface Props {
  showCreateButton: boolean;
  t: TFunction;
}

function EmptyFolderState({ showCreateButton = false, t }: Props) {
  return (
    <EmptyStateBasePage
      body={t('emptyStateDefaultBody')}
      imgSrc="/images/empty-state.svg"
    >
      {showCreateButton && <CreateNewButton buttonSize="med" />}
    </EmptyStateBasePage>
  );
}

export default withTranslation('EmptyState')(EmptyFolderState);
