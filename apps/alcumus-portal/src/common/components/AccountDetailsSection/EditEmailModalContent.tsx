import React, { useCallback, useState } from 'react';
import validator from 'validator';
import {
  Alert,
  Button,
  Input,
  Modal,
  StyleVariables,
  Text,
} from '@alcumus/components';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  error: {
    color: StyleVariables.colors.text.critical,
  },
  button: {
    marginLeft: '0.5rem',
  },
}));

interface EditEmailModalContentProps {
  onUpdate: (newEmail) => void;
  onCancel: () => void;
  isUpdatingEmail?: boolean;
  error?: string;
}

export default function EditEmailModalContent({
  onUpdate,
  onCancel,
  isUpdatingEmail = false,
  error,
}: EditEmailModalContentProps) {
  const [newEmail, setNewEmail] = useState<string>();
  const classes = useStyles();

  const handleNewEmailChanged = useCallback(({ target }) => {
    setNewEmail(target?.value);
  }, []);

  const handleUpdate = useCallback(() => {
    onUpdate(newEmail);
  }, [onUpdate, newEmail]);

  return (
    <React.Fragment>
      <Modal.Body>
        <Alert
          severity="info"
          message="You will be logged out after the email you log in with changes"
          dataTestId="edit-email-info"
        />
        <br />
        <br />
        <Text as="p">New email</Text>
        <Input type="email" onChange={handleNewEmailChanged} />
        <br />
        {!!error?.length && <Text color="error">{error}</Text>}
      </Modal.Body>
      <Modal.Actions>
        <Button
          variant="outlined"
          rounded
          className={classes.button}
          onClick={onCancel}
          data-testid="edit-email-cancel-button"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          rounded
          onClick={handleUpdate}
          disabled={!newEmail?.length || !validator.isEmail(newEmail)}
          data-testid="edit-email-update-button"
        >
          {isUpdatingEmail ? 'Updating...' : 'Update'}
        </Button>
      </Modal.Actions>
    </React.Fragment>
  );
}
