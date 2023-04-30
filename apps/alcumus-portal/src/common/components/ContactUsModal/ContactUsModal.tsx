import React from 'react';
import { MarketoCallback } from '@alcumus/hooks';
import MarketoFormModal from '../MarketoFormModal';

interface ContactUsFields {
  FirstName?: string;
  LastName?: string;
  Email?: string;
  Phone?: string;
  Company?: string;
  companySize?: string;
}

export interface ContactUsModalProps {
  title: string;
  onSuccess: () => void;
  onClose: () => void;
}

export default function ContactUsModal({
  title,
  onSuccess,
  onClose,
}: ContactUsModalProps) {
  const callback: MarketoCallback<ContactUsFields> = (form) => {
    form.onSuccess(() => {
      onSuccess();
      return false;
    });
  };
  return (
    <React.Fragment>
      <MarketoFormModal
        title={title}
        formId={3636}
        onClose={onClose}
        callback={callback}
      />
    </React.Fragment>
  );
}
