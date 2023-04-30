import React from 'react';
import { TFunction } from 'i18next';
import ConfirmModal from '../../ConfirmModal';

export interface ConfirmCancelSubscriptionModalProps {
  t: TFunction;
  onClose: () => void;
  onConfirmCancelSubscription: () => Promise<any>;
  isOpen: boolean;
  onSuccess: () => void;
}
export function ConfirmCancelSubscriptionModal({
  onClose,
  t,
  isOpen,
  onConfirmCancelSubscription,
  onSuccess,
}: ConfirmCancelSubscriptionModalProps) {
  return (
    <ConfirmModal
      onClose={onClose}
      size="sm"
      isOpen={isOpen}
      confirmAction={onConfirmCancelSubscription}
      icon="error_outline"
      confirmButtonText={t('cancelSubscription')}
      onSuccess={onSuccess}
      isConfirmButtonCritical={true}
      messages={{
        successMessage: t('successMessage'),
        errorMessage: t('errorMessage'),
        confirmMessage: t('confirmMessage'),
        headerText: t('cancelSubscription'),
        bodyText: t('bodyText'),
      }}
    />
  );
}
