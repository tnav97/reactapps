import React from 'react';
import {
  Button,
  Modal,
  OutlinedIcon,
  StyleVariables,
  Text,
} from '@alcumus/components';
import { TFunction } from 'i18next';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface ConfirmSendRequestDemoEmailModalProps {
  onCancel: () => void;
  onSubmit: () => void;
  t: TFunction;
  headerText: string;
  isOpen: boolean;
  bodyText: string;
}

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: StyleVariables.fonts.weight.medium,
    color: StyleVariables.colors.text.default,
  },
  message: {
    color: StyleVariables.colors.text.default,
    marginLeft: StyleVariables.spacing(1),
  },
  icon: {
    marginRight: '1.5rem',
    fontSize: '2rem',
    color: StyleVariables.colors.icon.info,
  },
  cancelButton: {
    marginRight: '1rem',
  },
});

export default function ConfirmSendRequestDemoEmailModal({
  onCancel,
  t,
  onSubmit,
  isOpen,
  headerText,
  bodyText,
}: ConfirmSendRequestDemoEmailModalProps) {
  const classes = useStyles();
  return (
    <Modal open={isOpen} size="sm">
      <Modal.Header onClose={onCancel}>
        <div className={classes.header}>
          <OutlinedIcon
            icon="info"
            className={classes.icon}
            data-testid="header-icon"
          />

          <Text
            as="h4"
            data-testid="header-text"
            className={classes.headerText}
          >
            {headerText}
          </Text>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10}>
            <Text data-testid="message" className={classes.message}>
              {bodyText}
            </Text>
          </Grid>
          <Grid item xs={1} />
        </Grid>
      </Modal.Body>
      <Modal.Actions>
        <Button
          variant="outlined"
          rounded
          onClick={onCancel}
          data-testid="cancel-button"
        >
          {t('cancel')}
        </Button>
        <Button
          variant={'contained'}
          rounded
          onClick={onSubmit}
          data-testid="confirm-button"
        >
          {t('send')}
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
