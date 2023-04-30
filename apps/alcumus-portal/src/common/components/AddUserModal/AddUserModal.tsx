import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  Alert,
  Button,
  Input,
  Modal,
  Select,
  StyleVariables,
  Text,
} from '@alcumus/components';
import {
  Checkbox,
  FormControlLabel,
  Grid,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Role, RoleAndPermissions } from '../../types';
import { useStateFromInput } from '@alcumus/hooks';
import {
  postCreateUser,
  PostCreateUserValidationError,
} from './postCreateUser';
import { SuccessModal } from '../SuccessModal/SuccessModal';
import { Trans } from 'react-i18next';
import { TFunction } from 'i18next';
import { getRoleItems } from '../../utilities';
import { ToastContext } from '../../context/ToastContext';
import isEmail from 'validator/lib/isEmail';
import { DEFAULT_ROLE_LOOKUP_KEY } from '../../constants';
import { useSubscriptions } from '../../hooks/useSubscriptions';
import { useOrganizationProfile } from '../../hooks/useOrganizationProfile';
import isPhoneNumber from '../../../lib/utils/isPhoneNumber';

export interface AddUserModalProps {
  t: TFunction;
  organizationId?: number;
  loggedInUserRole?: RoleAndPermissions;
  roles: Array<Role>;
  onClose: () => void;
  onUserAdded: () => void;
}

const useStyles = makeStyles({
  subtitle: {
    color: StyleVariables.colors.text.subdued,
  },
  formGrid: {
    marginTop: '2rem',
  },
  modalActions: {
    justifyContent: 'flex-start',
  },
  cancelActionWrapper: {
    flexGrow: 1,
  },
  infoAlertList: {
    margin: 0,
    paddingInlineStart: '24px',
    fontSize: StyleVariables.fonts.size.small,
  },
});

export function AddUserModal({
  t,
  roles,
  organizationId,
  loggedInUserRole,
  onClose,
  onUserAdded,
}: AddUserModalProps) {
  const getDefaultRoleID = (roles: Role[]) => {
    const defaultRole = roles.find(
      (role) => role.roleLookupKey === DEFAULT_ROLE_LOOKUP_KEY
    );
    if (defaultRole) {
      return defaultRole.roleId;
    }
  };

  const classes = useStyles();
  const userRoleLookupKey = loggedInUserRole?.roleLookupKey;

  const { data: organizationProfile } = useOrganizationProfile(organizationId);

  const currentOrganizationEmailDomain =
    organizationProfile?.organizationEmailDomain;

  const { data: subscriptions } = useSubscriptions(organizationId);

  const roleItems = getRoleItems(roles, userRoleLookupKey);

  useEffect(() => {
    setSelectedRoleItem(getDefaultRoleID(roles));
  }, [roles]);

  const applicationItems = useMemo(
    () =>
      (subscriptions || []).map((subscription) => ({
        id: subscription.application.applicationId,
        name: subscription.application.applicationName,
        application: subscription.application,
        disabled: subscription.application?.userApplicationAccessCount?.count
          ? subscription.subscriptionSeats -
              subscription.application.userApplicationAccessCount.count <=
            0
          : false,
      })),
    [subscriptions]
  );

  const [firstName, handleFirstNameChange, setFirstName] =
    useStateFromInput('');
  const [lastName, handleLastNameChange, setLastName] = useStateFromInput('');
  const [accountTypeHint, setAccountTypeHint] = useState<string>(
    t('emailHint')
  );
  const [email, setEmail] = useState('');

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { value } = target;
    setEmail(value);
    if (value) {
      setErrors({
        ...errors,
        emailAddress: !isEmail(value) ? t('invalidEmail') : undefined,
      });
    } else {
      setErrors({
        ...errors,
        emailAddress: undefined,
      });
    }

    if (!isEmail(value)) {
      setAccountTypeHint(t('emailHint'));
      return;
    }

    // todo ARC-464: temporary validation check. Until we can implement signup with invitation link, we have to
    // rely on currentOrganizationEmailDomain to decide if a user sets a password.
    if (
      currentOrganizationEmailDomain &&
      value.endsWith(`@${currentOrganizationEmailDomain}`)
    ) {
      setAccountTypeHint(t('emailHintOrganization'));
    } else {
      setAccountTypeHint(t('emailHintIndividual'));
    }
  };

  const [phoneNumber, setPhoneNumber] = useState('');

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

  const [selectedRoleItem, setSelectedRoleItem] = useState<number>();
  const [selectedApps, setSelectedApps] = useState([]);
  const [sendInviteWhenSaving, setSendInviteWhenSaving] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [addedUsers, setAddedUsers] = useState<Array<string>>([]);

  const [errors, setErrors] = useState<PostCreateUserValidationError['errors']>(
    {}
  );

  function checkErrors(
    errors: PostCreateUserValidationError['errors']
  ): boolean {
    return (
      !errors.emailAddress &&
      !errors.phoneNumber &&
      !errors.firstName &&
      !errors.lastName
    );
  }

  const [isCreating, setIsCreating] = useState(false);

  const reset = () => {
    setErrors({});
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhoneNumber('');
    setSelectedRoleItem(getDefaultRoleID(roles));
    setSelectedApps([]);
    setAccountTypeHint(t('emailHint'));
  };

  const { setToast } = useContext(ToastContext);

  const createUser = async (showSuccessAfter: boolean) => {
    setIsCreating(true);
    try {
      await postCreateUser({
        firstName: firstName.trim().length ? firstName : null,
        lastName: lastName.trim().length ? lastName : null,
        emailAddress: email.trim(),
        phoneNumber: phoneNumber.length > 0 ? phoneNumber : null,
        role: selectedRoleItem,
        applicationIds: selectedApps,
        sendInvite: sendInviteWhenSaving,
      });
      setAddedUsers([...addedUsers, email ?? `${firstName} ${lastName}`]);
      if (showSuccessAfter) {
        setShowSuccessModal(true);
      } else {
        reset();
      }
      onUserAdded();
    } catch (e: any) {
      if (e instanceof PostCreateUserValidationError) {
        const validationError = e as PostCreateUserValidationError;
        setErrors(validationError.errors);
        if (validationError.showMessage) {
          setToast({
            message:
              validationError.message !== 'PostCreateUserValidationError'
                ? validationError.message
                : t('genericError', { ns: 'translation' }),
            severity: 'error',
          });
        }
      } else {
        if (setToast) {
          setToast({
            message: t('genericError', { ns: 'translation' }),
            severity: 'error',
          });
        }
        throw e;
      }
    } finally {
      setIsCreating(false);
    }
  };

  return showSuccessModal ? (
    <SuccessModal onClose={onClose} addedUsers={addedUsers} t={t} />
  ) : (
    <React.Fragment>
      <Modal.Header onClose={onClose}>
        <Text as="h4" data-testid="add-user-modal-title">
          {t('title')}
        </Text>
      </Modal.Header>
      <Modal.Body>
        <Grid container spacing={1} className={classes.formGrid}>
          <Grid item md={6}>
            <Input
              label={t('labels.firstName')}
              value={firstName}
              data-testid="firstName"
              onChange={handleFirstNameChange}
              disabled={isCreating}
              state={errors.firstName ? 'error' : 'default'}
              hint={errors.firstName}
            />
          </Grid>
          <Grid item md={6}>
            <Input
              label={t('labels.lastName')}
              value={lastName}
              data-testid="lastName"
              onChange={handleLastNameChange}
              disabled={isCreating}
              state={errors.lastName ? 'error' : 'default'}
              hint={errors.lastName}
            />
          </Grid>
          <Grid item md={6}>
            <Input
              label={t('labels.email')}
              type="email"
              autoComplete="email"
              data-testid="email"
              value={email}
              onChange={handleEmailChange}
              disabled={isCreating}
              state={errors.emailAddress ? 'error' : 'default'}
              hint={errors.emailAddress || accountTypeHint}
              required
            />
          </Grid>
          <Grid item md={6}>
            <Input
              type="text"
              label={t('labels.phoneNumber')}
              placeholder="+1 2223334444"
              data-testid="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              disabled={isCreating}
              state={errors.phoneNumber ? 'error' : 'default'}
              hint={errors.phoneNumber}
            />
          </Grid>
          <Grid item md={12}>
            <Select
              items={roleItems}
              value={selectedRoleItem}
              onChange={(event) =>
                setSelectedRoleItem(event.target.value as any)
              }
              label={t('labels.role')}
              required
              disabled={isCreating}
            />
          </Grid>
          <Grid item md={12}>
            <Select
              items={applicationItems}
              value={selectedApps}
              data-testid="applicationAccess"
              onChange={(event) => setSelectedApps(event.target.value as any)}
              label={t('labels.applicationAccess')}
              multiple={true}
              customSelectText={t('application')}
              disabled={isCreating}
            />
            <FormControlLabel
              label={t('labels.sendInviteWhenSaving')}
              control={
                <Checkbox
                  color="primary"
                  disableRipple
                  disableFocusRipple
                  data-testid="sendInvite"
                  checked={sendInviteWhenSaving}
                  onChange={(e) => setSendInviteWhenSaving(e.target.checked)}
                />
              }
            />
            <Alert severity="primary" hideIcon dataTestId="add-user-modal-hint">
              <ul className={classes.infoAlertList}>
                <li>
                  <Trans t={t} i18nKey="hints.0">
                    A user must login to activate their account.
                  </Trans>
                </li>
                <li>
                  <Trans t={t} i18nKey="hints.1">
                    Users who are sent an invitation will be marked as
                    <b> invited.</b>
                  </Trans>
                </li>
                <li>
                  <Trans t={t} i18nKey="hints.2">
                    Users who are created, but not invited, will be marked as
                    <b> Pending invite.</b>
                  </Trans>
                </li>
              </ul>
            </Alert>
          </Grid>
        </Grid>
      </Modal.Body>
      <Modal.Actions className={classes.modalActions}>
        <div className={classes.cancelActionWrapper}>
          <Button
            variant="outlined"
            rounded
            onClick={onClose}
            dataTestId="add-user-cancel-button"
          >
            {t('cancel')}
          </Button>
        </div>
        <Button
          rounded
          onClick={() => createUser(false)}
          dataTestId="add-user-and-new-save-button"
          disabled={!isEmail(email) || !checkErrors(errors)}
        >
          {t('saveAndAddNew')}
        </Button>
        <Button
          rounded
          onClick={() => createUser(true)}
          dataTestId="add-user-save-button"
          disabled={!isEmail(email) || !checkErrors(errors)}
        >
          {t('save')}
        </Button>
      </Modal.Actions>
    </React.Fragment>
  );
}
