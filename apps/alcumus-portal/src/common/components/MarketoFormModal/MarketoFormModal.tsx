import React from 'react';
import { Modal, Text } from '@alcumus/components';
import { MarketoCallback } from '@alcumus/hooks';
import { MarketoForm } from './MarketoForm';
import { Grid } from '@mui/material';

export interface MarketoFormModalProps<T> {
  formId: number;
  onClose: () => void;
  callback: MarketoCallback<T>;
  title: string;
}

export default function MarketoFormModal<T>({
  title,
  formId,
  onClose,
  callback,
}: MarketoFormModalProps<T>) {
  return (
    <React.Fragment>
      <Modal.Header onClose={onClose}>
        <Text as="h4" data-testid="marketo-form-modal-title">
          {title}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <MarketoForm formId={formId} callback={callback} />
          </Grid>
        </Grid>
      </Modal.Body>
    </React.Fragment>
  );
}
