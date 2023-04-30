import React from 'react';
import { MarketoCallback } from '@alcumus/hooks';
import MarketoFormModal from '../MarketoFormModal';

interface RequestDemoFields {
  FirstName?: string;
  LastName?: string;
  Email?: string;
  Phone?: string;
  Company?: string;
  companySize?: string;
}

export interface RequestDemoModalProps {
  title: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function RequestDemoModal({
  title,
  onClose,
  onSuccess,
}: RequestDemoModalProps) {
  const callback: MarketoCallback<RequestDemoFields> = (form) => {
    form.onSuccess(() => {
      onSuccess();
      return false;
    });
  };
  return (
    <React.Fragment>
      <MarketoFormModal
        title={title}
        formId={3635}
        onClose={onClose}
        callback={callback}
      />
    </React.Fragment>
  );
}
