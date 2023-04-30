import {
  Button,
  Image,
  Modal,
  Text,
  StyleVariables,
} from '@alcumus/components';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { TFunction } from 'i18next';

export interface SuccessModalProps {
  t: TFunction;
  onClose: () => void;
  addedUsers: string[];
}

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '& > *:not(:last-child)': {
      marginBottom: StyleVariables.spacing(4.5),
    },
    '& > *:last-child': {
      marginTop: StyleVariables.spacing(4.5),
    },
  },
  addedUser: { marginBottom: StyleVariables.spacing(2), textAlign: 'center' },
});

export function SuccessModal({ t, onClose, addedUsers }: SuccessModalProps) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Modal.Header onClose={onClose}> </Modal.Header>
      <Modal.Body>
        <div className={classes.content}>
          <Image
            alt={t('successModal.imageAlt')}
            width="280px"
            src={'/images/check-email-for-activation.svg'}
          />
          <div>
            {addedUsers.length > 1 ? (
              <Text as="h4" className={classes.addedUser}>
                {t('successModal.heading', { count: addedUsers.length })}
              </Text>
            ) : (
              <Text as="h4" className={classes.addedUser}>
                {t('successModal.heading_one', { email: addedUsers[0] })}
              </Text>
            )}
          </div>
          <Text as="p">{t('successModal.subheading')}</Text>
          <Button onClick={() => onClose()} rounded>
            {t('successModal.close')}
          </Button>
        </div>
      </Modal.Body>
    </React.Fragment>
  );
}
