import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { StyleVariables, Text } from '@alcumus/components';
import { useStateFromInput } from '@alcumus/hooks';
import { Button, Grid, Paper, TextField, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  userProfileSection: {
    padding: '2rem',
    margin: '2rem 0',
  },
  error: {
    color: StyleVariables.colors.text.critical,
  },
  [theme.breakpoints.up('sm')]: {
    mdSpaceRight: {
      paddingRight: '0.5rem',
    },
    mdSpaceLeft: {
      paddingLeft: '0.5rem',
    },
  },
  [theme.breakpoints.only('xs')]: {
    mdSpaceRight: {
      marginBottom: '1rem',
    },
    mdSpaceLeft: {
      marginBottom: '1rem',
    },
  },
}));

interface UserProfileSectionProps {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  isSavingProfile?: boolean;
  errorSavingProfile?: string;
  profileUpdated?: boolean;
  updateProfile: (
    firstName?: string,
    lastName?: string,
    phoneNumber?: string
  ) => void;
  fetchUserProfile: () => void;
  resetProfileUpdateStatus: () => void;
}

interface FormErrors {
  firstName?: boolean;
  lastName?: boolean;
}

export default function UserProfileSection({
  firstName = '',
  lastName = '',
  isSavingProfile = false,
  errorSavingProfile = undefined,
  profileUpdated = false,
  updateProfile,
  fetchUserProfile,
  resetProfileUpdateStatus,
}: UserProfileSectionProps) {
  const classes = useStyles();
  const [first, setFirstName] = useStateFromInput(firstName);
  const [last, setLastName] = useStateFromInput(lastName);
  const [, setFormErrors] = useState<FormErrors>({
    firstName: false,
    lastName: false,
  });

  useEffect(() => {
    if (firstName?.length) {
      setFirstName({
        target: { value: firstName },
      } as ChangeEvent<HTMLInputElement>);
    }
  }, [firstName]);

  useEffect(() => {
    if (lastName?.length) {
      setLastName({
        target: { value: lastName },
      } as ChangeEvent<HTMLInputElement>);
    }
  }, [lastName]);

  useEffect(() => {
    if (!isSavingProfile && !errorSavingProfile && profileUpdated) {
      fetchUserProfile();
    }
  }, [isSavingProfile, errorSavingProfile, profileUpdated, fetchUserProfile]);

  const handleFirstNameChange = useCallback(
    (e) => {
      setFirstName(e);
      resetProfileUpdateStatus();
    },
    [resetProfileUpdateStatus]
  );

  const handleLastNameChange = useCallback(
    (e) => {
      setLastName(e);
      resetProfileUpdateStatus();
    },
    [resetProfileUpdateStatus]
  );

  const handleUpdateProfile = useCallback(() => {
    const errors: FormErrors = {
      firstName: !first?.length,
      lastName: !last?.length,
    };
    if (Object.values(errors).filter(Boolean).length) {
      setFormErrors(errors);
    } else {
      setFormErrors({});
      updateProfile(first, last);
    }
  }, [first, last]);

  return (
    <Paper elevation={1} className={classes.userProfileSection}>
      <Text as="h4">User Profile</Text>
      <br />
      <br />
      <Grid container>
        <Grid item xs={12} sm={6} md={6} className={classes.mdSpaceRight}>
          <TextField
            fullWidth
            label="First Name"
            variant="outlined"
            value={first}
            onChange={handleFirstNameChange}
            required
            inputProps={{
              'data-testid': 'firstNameInput',
              maxLength: 20,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} className={classes.mdSpaceLeft}>
          <TextField
            fullWidth
            label="Last Name"
            variant="outlined"
            value={last}
            onChange={handleLastNameChange}
            required
            inputProps={{
              'data-testid': 'lastNameInput',
              maxLength: 20,
            }}
          />
        </Grid>
      </Grid>
      <br />
      <br />
      {!!errorSavingProfile && (
        <React.Fragment>
          <Text as="small" variant="subtitle2" className={classes.error}>
            {errorSavingProfile}
          </Text>
          <br />
        </React.Fragment>
      )}
      <Button
        variant="contained"
        color="primary"
        type="button"
        data-testid="saveProfileButton"
        disabled={profileUpdated || !(first?.length || last?.length)}
        onClick={handleUpdateProfile}
      >
        {isSavingProfile ? 'Saving...' : 'Save Profile'}
      </Button>
    </Paper>
  );
}
