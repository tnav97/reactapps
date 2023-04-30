import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Input,
  Modal,
  OutlinedIcon,
  Select,
  StyleVariables,
  Text,
} from '@alcumus/components';
import { Grid, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  MemberWithUsername,
  Role,
  RoleAndPermissions,
  UpdateSeatsOperation,
  InviteUserRequest,
} from '../../types';
import { SuccessModal } from '../SuccessModal/SuccessModal';
import { TFunction } from 'i18next';
import { getRoleItems } from '../../utilities';
import { ToastContext } from '../../context/ToastContext';
import { useSubscriptions } from '../../hooks/useSubscriptions';
import { DEFAULT_ROLE_LOOKUP_KEY } from '../../constants';
import { isEmail } from 'validator';
import { difference } from 'lodash';
import clsx from 'clsx';
import { getMembers } from './getUsernames';
import ConfirmCancelModal from './ConfirmCancelModal';
import { postInviteUsers } from './inviteUsers';

export interface InviteUserModalProps {
  t: TFunction;
  organizationId?: number;
  loggedInUserRole?: RoleAndPermissions;
  roles: Array<Role>;
  onClose: () => void;
  onInviteCompleted: () => void;
}

interface ApplicationSeats {
  name: string;
  id: number;
  availableSeats: number;
}

interface ApplicationItem {
  name: string;
  id: number;
  disabled?: boolean;
}

interface InvitationRow {
  error?: string;
  roleId?: number;
  selectedApplications: Array<number>;
  username?: string;
  applicationItems: Array<ApplicationItem>;
}

const MaxInvitations = 5;

const useStyles = makeStyles({
  deleteButtonContainer: {
    display: 'flex',
    color: StyleVariables.colors.icon.default,
  },
  deleteButton: { marginTop: `${StyleVariables.spacing(3)}` },
  subtitle: {
    color: StyleVariables.colors.text.subdued,
    lineHeight: StyleVariables.fonts.lineHeight.h5,
  },
  formGrid: {
    marginTop: '2rem',
  },
  modalActions: {
    justifyContent: 'flex-end',
  },
  infoAlertList: {
    margin: 0,
    paddingInlineStart: '24px',
    fontSize: StyleVariables.fonts.size.small,
  },
  title: {
    lineHeight: StyleVariables.fonts.lineHeight.h4,
    fontWeight: StyleVariables.fonts.weight.medium,
    paddingBottom: 12,
  },
  addUserContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: StyleVariables.spacing(1),
  },
  addUserIcon: { marginRight: StyleVariables.spacing(1) },
  addUserButton: { border: `1px solid ${StyleVariables.colors.base.white}` },
  horizontalLine: {
    flexGrow: 1,
    height: '1px',
    color: StyleVariables.colors.border.default,
    border: '1px solid',
  },
  applicationsList: { marginRight: StyleVariables.spacing(1), flexGrow: 1 },
  wrapper: { overflowY: 'scroll', maxHeight: '60vh', overflowX: 'hidden' },
  firstRow: { marginBottom: StyleVariables.spacing(1) },
  accountHint: { marginTop: StyleVariables.spacing(-0.5) },
});

export function InviteUserModal({
  t,
  roles,
  organizationId,
  loggedInUserRole,
  onClose,
  onInviteCompleted,
}: InviteUserModalProps) {
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [isInviting, setIsInviting] = useState(false);
  const [applicationAvailableSeats, setApplicationAvailableSeats] = useState<
    Array<ApplicationSeats>
  >([]);
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [inviteRows, setInviteRows] = useState<Array<InvitationRow>>([
    {
      roleId: getDefaultRoleID(roles),
      selectedApplications: [],
      applicationItems: [],
    },
  ]);
  const { setToast } = useContext(ToastContext);
  const { data: subscriptions } = useSubscriptions(organizationId);
  const roleItems = getRoleItems(roles, userRoleLookupKey);

  useEffect(() => {
    setApplicationAvailableSeats(
      subscriptions?.map((subscription) => ({
        availableSeats:
          subscription.subscriptionSeats -
          (subscription.application.userApplicationAccessCount?.count || 0),
        name: subscription.application.applicationName,
        id: subscription.application.applicationId,
      })) || []
    );
  }, [subscriptions]);

  useEffect(() => {
    setInviteRows([
      ...inviteRows.map((row) => ({
        ...row,
        applicationItems: applicationAvailableSeats.map(
          ({ id, name, availableSeats }) => ({
            id,
            name:
              availableSeats === 0 && !isInSelectedApplications(row, id)
                ? `${name} (0 ${t('licensesAvailable')})`
                : `${name}`,
            disabled:
              availableSeats === 0 && !isInSelectedApplications(row, id),
          })
        ),
      })),
    ]);

    function isInSelectedApplications(row: InvitationRow, id: number): boolean {
      return row.selectedApplications.includes(id);
    }
  }, [applicationAvailableSeats, inviteRows.length]);

  function applicationsAreSelectedForNoUser(
    applications: Array<number>,
    username?: string
  ): boolean {
    return !!applications.length && !username;
  }

  function handleApplicationsChange(
    {
      target,
    }: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    index: number
  ) {
    const newSelectedApplicationIds = target.value as Array<number>;
    if (
      applicationsAreSelectedForNoUser(
        newSelectedApplicationIds,
        inviteRows[index].username
      )
    ) {
      inviteRows[index].error = t('emailIsRequired');
    }
    updateAvailableSeats(
      inviteRows[index].selectedApplications,
      newSelectedApplicationIds
    );

    inviteRows[index].selectedApplications = newSelectedApplicationIds;

    setInviteRows([...inviteRows]);
  }

  function handleEmailChange(
    { target }: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const { value } = target;
    inviteRows[index].username = value;
    inviteRows[index].error = '';

    if (
      applicationsAreSelectedForNoUser(
        inviteRows[index].selectedApplications,
        inviteRows[index].username
      )
    ) {
      inviteRows[index].error = t('emailIsRequired');
    }

    if (!value.length) {
      setInviteRows([...inviteRows]);
      return;
    }

    if (!isEmail(value)) {
      inviteRows[index].error = t('notValidEmail');
      setInviteRows([...inviteRows]);
      return;
    }
    return setInviteRows([...inviteRows]);
  }

  function handleRoleChange(
    {
      target,
    }: React.ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
    index: number
  ) {
    const { value } = target;

    inviteRows[index].roleId = Number(value);
    setInviteRows([...inviteRows]);
  }

  function updateAvailableSeats(
    selectedApplications: Array<number>,
    newSelections: Array<number>
  ): void {
    let differentAppIds: Array<number>;
    if (selectedApplications.length > newSelections.length) {
      differentAppIds = difference<number>(selectedApplications, newSelections);
      updateSeatsIntermediateState(differentAppIds);
    } else {
      differentAppIds = difference(newSelections, selectedApplications);
      updateSeatsIntermediateState(differentAppIds, 'decrement');
    }
    setApplicationAvailableSeats([...applicationAvailableSeats]);
  }

  function updateSeatsIntermediateState(
    applicationIds: Array<number>,
    operation: UpdateSeatsOperation = 'increment'
  ): void {
    if (operation === 'increment') {
      applicationIds.forEach(
        (appId) => getAvailableSeatsByApplicationId(appId).availableSeats++
      );
      return;
    }
    applicationIds.forEach(
      (appId) => getAvailableSeatsByApplicationId(appId).availableSeats--
    );

    function getAvailableSeatsByApplicationId(appId: number) {
      const application = applicationAvailableSeats.find(
        ({ id }) => id === appId
      );
      if (!application) {
        throw new Error('Application not found');
      }
      return application;
    }
  }

  function handleDelete(rowIndex: number) {
    if (inviteRows[rowIndex].selectedApplications.length) {
      updateSeatsIntermediateState(inviteRows[rowIndex].selectedApplications);
      setApplicationAvailableSeats([...applicationAvailableSeats]);
    }
    setInviteRows([...inviteRows.filter((item, index) => index !== rowIndex)]);
  }

  function handleAddRow(e: React.MouseEvent<HTMLButtonElement>) {
    inviteRows.push({
      roleId: getDefaultRoleID(roles),
      selectedApplications: [],
      applicationItems: [],
    });
    setInviteRows([...inviteRows]);
    e.currentTarget.blur();
  }

  function hasErros(): boolean {
    return inviteRows.some((row) => row.error);
  }

  function hasMissingUsername(): boolean {
    return inviteRows.some((row) => !row.username);
  }

  async function onBlur(e: React.FocusEvent<HTMLInputElement>): Promise<void> {
    const { value } = e.target;
    if (isEmail(value)) {
      const members = await getMembers([e.target.value]);
      if (members.length) {
        setErrors(members);
      }
    }
  }

  function onCancel(): void {
    if (!hasChanges()) {
      onClose();
      return;
    }
    setShowConfirm(true);
  }

  function hasChanges(): boolean {
    return (
      inviteRows.length > 1 ||
      inviteRows.some(
        (inviteRow) =>
          inviteRow.error ||
          inviteRow.selectedApplications.length ||
          inviteRow.username?.length
      )
    );
  }

  function setErrors(members: MemberWithUsername[]): void {
    inviteRows.forEach((row, index) => {
      if (members.filter((member) => member.username === row.username).length) {
        inviteRows[index].error = t('emailExists');
      }
    });
    setInviteRows([...inviteRows]);
  }

  const inviteUser = async () => {
    const members = await getMembers(getUsernamesFromInviteRows());
    if (members.length) {
      setErrors(members);
      return;
    }
    setIsInviting(true);
    try {
      await postInviteUsers(getPostInviteUsersParams());
      setShowSuccessModal(true);
      setIsInviting(false);
      onInviteCompleted();
    } catch (e: any) {
      if (setToast) {
        setToast({
          message: t('generalError'),
          severity: 'error',
        });
      }
      setIsInviting(false);
      onClose();
    }

    function getPostInviteUsersParams(): InviteUserRequest[] {
      return inviteRows.map((row) => {
        if (!row.username || !row.roleId) {
          throw new Error('username or role is not set');
        }
        return {
          emailAddress: row.username,
          roleId: row.roleId,
          applicationIds: row.selectedApplications,
          sendInvite: true,
        };
      });
    }

    function getUsernamesFromInviteRows(): String[] {
      return inviteRows.map((row) => {
        if (row.username) {
          return row.username;
        } else {
          throw new Error('undefined username');
        }
      });
    }
  };

  return showSuccessModal ? (
    <SuccessModal
      onClose={onClose}
      addedUsers={inviteRows.map((row) => (row.username ? row.username : ''))}
      t={t}
    />
  ) : (
    <React.Fragment>
      <Modal.Header onClose={onCancel}>
        <Text
          as="h4"
          className={classes.title}
          data-testid="invite-user-modal-title"
        >
          {t('title')}
        </Text>
      </Modal.Header>

      <Modal.Body>
        <div>
          <Text
            as="small"
            className={classes.subtitle}
            data-testid="invite-modal-subtitle"
          >
            {t('subtitle')}
          </Text>
          <Grid container spacing={1} className={classes.formGrid}>
            {inviteRows.map((row, index) => (
              <React.Fragment key={index}>
                <Grid
                  item
                  md={4}
                  xs={12}
                  className={clsx(!index && classes.firstRow)}
                >
                  <Input
                    label={!index ? t('labels.email') : undefined}
                    type="email"
                    autoComplete="email"
                    data-testid="email"
                    value={row.username}
                    onChange={(event) => handleEmailChange(event, index)}
                    disabled={isInviting}
                    state={row.error ? 'error' : 'default'}
                    hint={row.error}
                    onBlur={onBlur}
                    required
                  />
                </Grid>
                <Grid item md={2} xs={12}>
                  <Select
                    items={roleItems}
                    value={row.roleId}
                    onChange={(event: any) => handleRoleChange(event, index)}
                    label={!index ? t('labels.role') : ''}
                    disabled={isInviting}
                    data-testid="roles"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <div className={classes.deleteButtonContainer}>
                    <Select
                      items={row.applicationItems}
                      value={row.selectedApplications}
                      data-testid="application-access"
                      onChange={(event: any) =>
                        handleApplicationsChange(event, index)
                      }
                      label={!index ? t('labels.applicationAccess') : ''}
                      multiple={true}
                      className={classes.applicationsList}
                      disabled={isInviting}
                      customSelectText={t('application')}
                    />
                    {inviteRows.length > 1 && (
                      <IconButton
                        className={clsx(!index && classes.deleteButton)}
                        onClick={() => handleDelete(index)}
                        disabled={isInviting}
                        data-testid="delete-button"
                      >
                        <OutlinedIcon icon="delete" />
                      </IconButton>
                    )}
                  </div>
                </Grid>
              </React.Fragment>
            ))}
            <Grid xs={12} item>
              {inviteRows.length < MaxInvitations && (
                <div className={classes.addUserContainer}>
                  <Button
                    variant="text"
                    className={classes.addUserButton}
                    size={'small'}
                    onClick={handleAddRow}
                    disabled={isInviting}
                    data-testid="add-another-user-button"
                  >
                    <OutlinedIcon icon="add" className={classes.addUserIcon} />
                    {t('addAnotherUser')}
                  </Button>
                  <div className={classes.horizontalLine} />
                </div>
              )}
            </Grid>
          </Grid>
        </div>
      </Modal.Body>

      <Modal.Actions className={classes.modalActions}>
        <Button
          variant="outlined"
          rounded
          onClick={onCancel}
          data-testid="inviteModalCancelButton"
        >
          {t('cancel')}
        </Button>
        <Button
          rounded
          onClick={inviteUser}
          data-testid="sendInviteButton"
          disabled={isInviting || hasErros() || hasMissingUsername()}
        >
          {t('sendInvite')}
        </Button>
      </Modal.Actions>
      <ConfirmCancelModal
        isOpen={showConfirm}
        headerText={t('confirmCancelHeader')}
        bodyText={t('confirmCancelBody')}
        onCancel={() => setShowConfirm(false)}
        onDiscard={() => {
          setShowConfirm(false);
          onClose();
        }}
        t={t}
      />
    </React.Fragment>
  );
}
