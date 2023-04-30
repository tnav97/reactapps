import React, { useCallback, useState } from 'react';
import { Input, Modal, Button, Text } from '@alcumus/components';
import { Grid, Box, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { TFunction } from 'i18next';

interface EditUserProfileProps {
  firstName: string;
  lastName: string;
  onUpdate: (firstName?: string, lastName?: string) => void;
  onCancel: () => void;
  isUpdatingProfile?: boolean;
  error?: string;
  t: TFunction;
}

const useStyles = makeStyles({
  avatarEditorContainer: { marginBottom: '24px' },
  avatar: { marginRight: '16px', width: '104px', height: '104px' },
});

export default function EditUserProfile({
  firstName,
  lastName,
  onUpdate,
  onCancel,
  isUpdatingProfile,
  error,
  t,
}: EditUserProfileProps) {
  const classes = useStyles();

  const [updatedLastName, setUpdatedLastName] = useState<string>(lastName);
  const [updatedFirstName, setUpdatedFirstName] = useState<string>(firstName);

  const handleFirstNameChange = useCallback(({ target }) => {
    setUpdatedFirstName(target?.value.trim());
  }, []);
  const handleLastNameChange = useCallback(({ target }) => {
    setUpdatedLastName(target?.value.trim());
  }, []);

  const handleUpdate = useCallback(() => {
    onUpdate(updatedFirstName, updatedLastName);
  }, [onUpdate, updatedFirstName, updatedLastName]);

  return (
    <React.Fragment>
      <Modal.Body>
        <Box
          className={classes.avatarEditorContainer}
          display="flex"
          alignItems="center"
        >
          <Avatar
            className={classes.avatar}
            src="/icons/Profile.svg"
            data-testid="avatar"
          />
          {/* TODO: Enable Button once the avatar updated functionality is ready */}
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Input
              label={t('firstName')}
              value={updatedFirstName}
              onChange={handleFirstNameChange}
              data-testid="firstNameInput"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              data-testid="lastNameInput"
              label={t('lastName')}
              value={updatedLastName}
              onChange={handleLastNameChange}
            />
          </Grid>
        </Grid>
        {!!error?.length && <Text color="error">{error}</Text>}
      </Modal.Body>
      <Modal.Actions>
        <Button
          variant="outlined"
          rounded
          onClick={onCancel}
          data-testid="cancelButton"
        >
          {t('cancel')}
        </Button>
        <Button
          data-testid="updateProfileButton"
          variant="contained"
          color="primary"
          rounded
          onClick={handleUpdate}
          disabled={
            !updatedFirstName ||
            !updatedLastName ||
            !updatedFirstName.trim().length ||
            !updatedLastName.trim().length
          }
        >
          {isUpdatingProfile ? t('updating') : t('updateProfile')}
        </Button>
      </Modal.Actions>
    </React.Fragment>
  );
}
