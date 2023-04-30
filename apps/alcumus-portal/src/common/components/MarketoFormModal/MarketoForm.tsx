import React from 'react';
import { MarketoCallback, useMarketo, UseMarketoProps } from '@alcumus/hooks';

export interface ContactUsModalProps<T> {
  formId: number;
  callback: MarketoCallback<T>;
}

export function MarketoForm<T>({ formId, callback }: ContactUsModalProps<T>) {
  const useMarketoProps: UseMarketoProps<T> = {
    baseUrl: 'https://go.ecompliance.com',
    munchkinId: '066-RPY-433',
    formId,
    callback,
  };

  useMarketo<T>(useMarketoProps);

  return (
    <div data-testid="marketo-form">
      <form id={`mktoForm_${formId}`} />
    </div>
  );
}
