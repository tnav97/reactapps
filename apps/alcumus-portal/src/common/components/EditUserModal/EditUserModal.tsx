import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  Button,
  Input,
  Modal,
  Select,
  StyleVariables,
  Text,
} from '@alcumus/components';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  Role,
  RoleAndPermissions,
  UpdateUserRequest,
  MemberDetails,
} from '../../types';
import { useStateFromInput } from '@alcumus/hooks';
import { updateUser, UpdateUserValidationError } from './updateUser';
import { TFunction } from 'i18next';
import { getRoleItems } from '../../utilities';
import useSWR from 'swr';
import { ToastContext } from '../../context/ToastContext';
import { LoginAccountTypeV2, MemberStatus } from '../../constants';
import isEmail from 'validator/lib/isEmail';
import isPhoneNumber from '../../../lib/utils/isPhoneNumber';

export interface EditUserModalProps {
  t: TFunction;
  roles: Array<Role>;
  onClose: () => void;
  onUserUpdated: () => void;
  member: MemberDetails;
  loggedInUserRole?: RoleAndPermissions;
}

const useStyles = makeStyles({
  subtitle: {
    color: StyleVariables.colors.text.subdued,
  },
  formGrid: {
    marginTop: '2rem',
  },
  modalActions: {
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginRight: '1rem',
  },
});

export function EditUserModal({
  t,
  roles,
  onClose,
  loggedInUserRole,
  onUserUpdated,
  member,
}: EditUserModalProps) {
  const classes = useStyles();
  const userRoleLookupKey = loggedInUserRole?.roleLookupKey;
  const roleItems = getRoleItems(roles, userRoleLookupKey);

  const { data: subscriptions } = useSWR(`/api/organizations/subscriptions`);

  const { data: subscribedApplications } = useSWR(
    `/api/users/${member.userId}/applications`
  );

  useEffect(() => {
    setSelectedRoleItem(member.roleId);
  }, []);

  const applicationItems = useMemo(
    () =>
      (subscriptions || []).map((subscription) => ({
        id: subscription.application.applicationId,
        name: subscription.application.applicationName,
        application: subscription.application,
        disabled:
          subscribedApplications &&
          !subscribedApplications.find(
            (subscribedApplication) =>
              subscribedApplication.applicationId ===
              subscription.application.applicationId
          ) &&
          subscription.subscriptionSeats -
            subscription.application?.userApplicationAccessCount?.count <=
            0,
      })),
    [subscriptions, subscribedApplications]
  );

  const [firstName, handleFirstNameChange] = useStateFromInput(
    member.firstName || ''
  );
  const [lastName, handleLastNameChange] = useStateFromInput(
    member.lastName || ''
  );
  const [email, setEmail] = useState(member.emailAddress);

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { value } = target;
    setEmail(value);
    if (value) {
      setErrors({
        ...errors,
        email: !isEmail(value) ? t('invalidEmail') : undefined,
      });
    } else {
      setErrors({
        ...errors,
        email: undefined,
      });
    }
  };

  const [phoneNumber, setPhoneNumber] = useState(member.phoneNumber || '');

  const handlePhoneNumberChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { value } = target;

    setPhoneNumber(value);
    if (value) {
      setErrors({
        ...errors,
        phoneNumber: isPhoneNumber(value) ? t('invalidPhoneNumber') : undefined,
      });
    } else {
      setErrors({
        ...errors,
        phoneNumber: undefined,
      });
    }
  };

  const [selectedRoleItem, setSelectedRoleItem] = useState<number>(
    member.roleId
  );
  const [selectedApps, setSelectedApps] = useState([]);

  const [errors, setErrors] = useState<UpdateUserValidationError['errors']>({});

  function checkErrors(errors: UpdateUserValidationError['errors']): boolean {
    return (
      !errors.email &&
      !errors.phoneNumber &&
      !errors.firstName &&
      !errors.lastName
    );
  }

  const [isUpdating, setIsUpdating] = useState(false);

  const { setToast } = useContext(ToastContext);

  useEffect(() => {
    if (subscribedApplications) {
      setSelectedApps(subscribedApplications.map((app) => app.applicationId));
    }
  }, [subscribedApplications]);

  const updateUserHandler = async () => {
    setIsUpdating(true);
    const updateUserParam: UpdateUserRequest = {
      userId: member.userId,
      firstName: firstName.trim().length ? firstName : null,
      lastName: lastName.trim().length ? lastName : null,
      email: email === null ? null : email.trim(),
      roleId: selectedRoleItem,
      applicationIds: selectedApps,
      phoneNumber: phoneNumber.trim().length ? phoneNumber : null,
      organizationMemberId: member.organizationMemberId,
    };

    try {
      await updateUser(updateUserParam);
      setIsUpdating(false);
      onUserUpdated();
    } catch (e: any) {
      setIsUpdating(false);
      if (e instanceof UpdateUserValidationError) {
        setErrors(e.errors);
      } else {
        if (setToast) {
          setToast({
            message: t('genericError', { ns: 'translation' }),
            severity: 'error',
          });
        }
        throw e;
      }
    }
  };

  return (
    <React.Fragment>
      <Modal.Header onClose={onClose}>
        <Text as="h4">{t('title')}</Text>
      </Modal.Header>
      <Modal.Body>
        <Grid container spacing={1} className={classes.formGrid}>
          <Grid item md={6}>
            <Input
              label={t('labels.firstName')}
              value={firstName}
              onChange={handleFirstNameChange}
              disabled={
                isUpdating ||
                member.loginAccountType === LoginAccountTypeV2.INDIVIDUAL
              }
              state={errors.firstName ? 'error' : 'default'}
              hint={errors.firstName}
              data-testid="firstNameInput"
            />
          </Grid>
          <Grid item md={6}>
            <Input
              label={t('labels.lastName')}
              value={lastName}
              onChange={handleLastNameChange}
              disabled={
                isUpdating ||
                member.loginAccountType === LoginAccountTypeV2.INDIVIDUAL
              }
              state={errors.lastName ? 'error' : 'default'}
              hint={errors.lastName}
              data-testid="lastNameInput"
            />
          </Grid>
          <Grid item md={6}>
            <Input
              label={t('labels.email')}
              type="email"
              autoComplete="email"
              value={email}
              onChange={handleEmailChange}
              disabled={
                member?.emailAddress === null ||
                isUpdating ||
                member.memberStatus === MemberStatus.PENDING_ACCEPTANCE ||
                (member.loginAccountType === LoginAccountTypeV2.INDIVIDUAL &&
                  member.memberStatus === MemberStatus.ACTIVE)
              }
              state={errors.email ? 'error' : 'default'}
              hint={errors.email}
              required
              data-testid="emailInput"
            />
          </Grid>
          <Grid item md={6}>
            <Input
              type="text"
              label={t('labels.phoneNumber')}
              placeholder="+1 2223334444"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              disabled={
                isUpdating ||
                member.loginAccountType === LoginAccountTypeV2.INDIVIDUAL
              }
              state={errors.phoneNumber ? 'error' : 'default'}
              hint={errors.phoneNumber}
              data-testid="phoneNumberInput"
            />
          </Grid>
          <Grid item md={12}>
            <Select
              items={roleItems}
              value={selectedRoleItem}
              onChange={({ target }) =>
                setSelectedRoleItem(target.value as any)
              }
              label={t('labels.role')}
              required
              data-testid="rolesSelect"
              helperText={t('rolehelperText')}
            />
          </Grid>
          <Grid item md={12}>
            <Select
              items={applicationItems}
              value={selectedApps}
              data-testid="applicationAccessSelect"
              onChange={(event) => setSelectedApps(event.target.value as any)}
              label="Application Access"
              multiple={true}
              disabled={!member.isEnabled}
              customSelectText={t('application')}
            />
          </Grid>
        </Grid>
      </Modal.Body>
      <Modal.Actions className={classes.modalActions}>
        <Button
          variant="outlined"
          rounded
          onClick={onClose}
          className={classes.actionButton}
          data-testid="cancelButton"
        >
          {t('cancel')}
        </Button>
        <Button
          disabled={isUpdating || !isEmail(email) || !checkErrors(errors)}
          rounded
          onClick={() => updateUserHandler()}
          data-testid="updateButton"
        >
          {isUpdating ? t('updating') : t('save')}
        </Button>
      </Modal.Actions>
    </React.Fragment>
  );
}
