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
import clsx from 'clsx';

export interface FormSubmitSuccessModalProps {
  t: TFunction;
  onClose: () => void;
}

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: { marginBottom: StyleVariables.spacing(2.5) },
  success: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
    marginBottom: StyleVariables.spacing(1.5),
  },
  body: {
    color: StyleVariables.colors.text.subdued,
  },
  body2: {
    marginBottom: StyleVariables.spacing(4),
  },
});

export function FormSubmitSuccessModal({
  t,
  onClose,
}: FormSubmitSuccessModalProps) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Modal.Header onClose={onClose}> </Modal.Header>
      <Modal.Body>
        <div className={classes.content}>
          <Image
            alt={t('imageAlt')}
            width="280px"
            src={'/images/form-success.png'}
            className={classes.image}
          />
          <Text as="h4" className={classes.success}>
            {t('success')}
          </Text>

          <Text as="p" className={classes.body}>
            {t('body1')}
          </Text>
          <Text as="p" className={clsx(classes.body, classes.body2)}>
            {t('body2')}
          </Text>

          <Button onClick={() => onClose()} rounded>
            {t('close')}
          </Button>
        </div>
      </Modal.Body>
    </React.Fragment>
  );
}
