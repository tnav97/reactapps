import { TFunction } from 'i18next';
import React from 'react';
import { PrimaryButton } from '../Button/PrimaryButton';
import { EmptyStateBasePage } from './EmptyStateBasePage';
interface Props {
  showCreateButton: boolean;
  t: TFunction;
}

export default function EmptyLookState({ showCreateButton = false, t }: Props) {
  const body = t('emptyLookText', { ns: 'EmptyState' });

  return (
    <EmptyStateBasePage body={body} imgSrc="/images/empty-state-look.svg">
      {showCreateButton && (
        <PrimaryButton
          text={t('createLookButton', { ns: 'translation' })}
          ariaLabel={t('createLookButton', { ns: 'translation' })}
          id="createButton"
        />
      )}
    </EmptyStateBasePage>
  );
}
