import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import { MemberDetails } from '../../types';
import {
  Button,
  Input,
  Modal,
  OutlinedIcon,
  RegularIcon,
  Select,
  StyleVariables,
  Text,
} from '@alcumus/components';
import AddUserModal from '../AddUserModal';
import EditUserModal from '../EditUserModal';
import MemberApplications from '../MemberApplications';
import { useOrganizationMembers } from '../../hooks/useOrganizationMembers';
import OrganizationMemberContextMenu from './OrganizationMemberContextMenu';
import InviteUserModal from '../InviteUserModal';
import { TFunction } from 'i18next';
import StatusDisplay from '../StatusDisplay';
import { MemberStatus } from '../../constants';
import { Grid, IconButton, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const useStyles = makeStyles(() => ({
  greeting: {
    fontWeight: StyleVariables.fonts.weight.medium,
    fontSize: StyleVariables.fonts.size.h4,
    lineHeight: StyleVariables.fonts.lineHeight.h4,
    '& > *': {
      display: 'inline',
    },
  },
  heading: {
    borderRight: `2px solid ${StyleVariables.colors.border.default}`,
    marginRight: '12px',
    paddingRight: '12px',
  },
  buttonContainer: {
    float: 'right',
  },
  tableText: {
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.regular,
    lineHeight: StyleVariables.fonts.lineHeight.h5,
  },

  inviteUserButton: {
    marginRight: 16,
  },
  notAvailable: {
    color: StyleVariables.colors.text.subdued,
  },
  filtersContainer: {
    float: 'left',
  },
  resultsCount: {
    fontWeight: StyleVariables.fonts.weight.medium,
  },
  searchIcon: {
    float: 'left',
  },
}));

interface OrganizationUsersProps {
  organizationId?: number;
  t: TFunction;
}

export interface FilterProps {
  id: string;
  name: string;
}

export default function OrganizationUsers({
  organizationId,
  t,
}: OrganizationUsersProps) {
  const HEADERS = ['', 'name', 'contact', 'role', 'status', ''];
  const [showMemberApplicationsPanel, setShowMemberApplicationsPanel] =
    useState<boolean>(false);
  const [selectedMember, setSelectedMember] = useState<MemberDetails | null>(
    null
  );

  const classes = useStyles();

  const {
    data: members,
    mutate: reload,
    isValidating: isFetching,
    error: fetchError,
  } = useOrganizationMembers(organizationId);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isInviteUserModalOpen, setIsInviteUserModalOpen] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState<MemberDetails | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [memberContextMenu, setMemberContextMenu] =
    useState<null | MemberDetails>(null);
  const [filteredMembers, setFilteredMembers] = useState<MemberDetails[]>([]);

  const closeAddUserModal = () => {
    setIsAddUserModalOpen(false);
  };

  const closeInviteUserModal = () => {
    setIsInviteUserModalOpen(false);
  };

  const closeEditUserModalAndReload = () => {
    setMemberToEdit(null);
    reload();
    if (selectedMember) {
      const selectedMemberRef = selectedMember;
      setSelectedMember(null);
      setSelectedMember(selectedMemberRef);
    }
  };

  const showUserApps = (member: MemberDetails) => {
    setSelectedMember(member);
    setShowMemberApplicationsPanel(!showMemberApplicationsPanel);
  };

  const closeShowUserApps = () => {
    setSelectedMember(null);
    setShowMemberApplicationsPanel(false);
  };

  const showContextMenu = (
    member: MemberDetails,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setMemberContextMenu(member);
    setAnchorEl(e.currentTarget);
  };

  const memberStatusFilterItems: FilterProps[] = Object.keys(MemberStatus)
    .sort()
    .map((value) => ({
      id: value,
      name: t(value, { ns: 'statusDisplay' }),
    }))
    .filter((option) => option.id !== MemberStatus.DELETED);

  const selectAllOption: FilterProps = {
    id: 'all',
    name: t('all'),
  };

  const [memberStatusFilter, setMemberStatusFilter] = useState<string>(
    selectAllOption.id
  );

  const filterByMemberStatus = (member: MemberDetails) => {
    if (memberStatusFilter === selectAllOption.id) return true;
    return member.memberStatus === memberStatusFilter;
  };

  useEffect(() => {
    if (members) {
      const filteredResult = members.filter(filterByMemberStatus);
      setFilteredMembers(
        filteredResult.filter((member) => member.memberStatus !== 'DELETED')
      );
    }
  }, [members, memberStatusFilter]);

  return (
    <>
      <div data-testid="greeting" className={classes.greeting}>
        <Text as="h4" className={classes.heading}>
          {t('userManagement')}
        </Text>
        <Text as="h6" className={classes.resultsCount}>
          {isFetching
            ? t('loadingResults')
            : t('results', { count: filteredMembers.length })}
        </Text>
        <div className={classes.buttonContainer}>
          <Button
            variant="outlined"
            rounded
            className={classes.inviteUserButton}
            onClick={() => setIsInviteUserModalOpen(true)}
          >
            <span className="material-icons">send</span> &nbsp;{' '}
            {t('inviteUsers')}
          </Button>
          <Button
            variant="outlined"
            rounded
            onClick={() => setIsAddUserModalOpen(true)}
          >
            <span className="material-icons">person_add</span> &nbsp;{' '}
            {t('addUser')}
          </Button>
        </div>
      </div>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={4}>
          <Input
            label={t('labels.search')}
            placeholder={t('searchByNameEmail')}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Select
            items={[selectAllOption]}
            value={selectAllOption.id}
            label={t('labels.permissionLevel')}
            disabled
          />
        </Grid>
        <Grid item xs={12} sm={2}>
          <Select
            items={[selectAllOption, ...memberStatusFilterItems]}
            value={memberStatusFilter}
            data-testid="memberStatusFilter"
            onChange={(event) =>
              setMemberStatusFilter(event.target.value as string)
            }
            label={t('labels.status')}
          />
        </Grid>
      </Grid>

      <Modal
        open={isAddUserModalOpen}
        size="sm"
        onClose={() => setIsAddUserModalOpen(false)}
      >
        <AddUserModal onClose={closeAddUserModal} onUserAdded={reload} />
      </Modal>

      <Modal
        open={isInviteUserModalOpen}
        size="md"
        onClose={() => setIsInviteUserModalOpen(false)}
      >
        <InviteUserModal
          onClose={closeInviteUserModal}
          onInviteCompleted={reload}
        />
      </Modal>

      {memberToEdit && (
        <Modal
          open={!!memberToEdit}
          size="sm"
          onClose={() => setMemberToEdit(null)}
          dataTestId="edit-user-modal"
        >
          <EditUserModal
            onClose={() => setMemberToEdit(null)}
            onUserUpdated={closeEditUserModalAndReload}
            member={memberToEdit}
          />
        </Modal>
      )}

      {selectedMember && organizationId && (
        <MemberApplications
          open={showMemberApplicationsPanel}
          onClose={closeShowUserApps}
          onEdit={() => {
            setMemberToEdit(selectedMember);
          }}
          member={selectedMember}
          organizationId={organizationId}
        />
      )}

      {memberContextMenu && (
        <OrganizationMemberContextMenu
          memberToEdit={memberContextMenu}
          anchorEl={anchorEl}
          onClose={() => setAnchorEl(null)}
          reload={reload}
        />
      )}

      <br />
      {fetchError ? (
        <Text variant="h5">{t('fetchOrganizationMembersError')}</Text>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {HEADERS.map((header, i) => {
                  return (
                    <TableCell key={i}>
                      {header === t(`headers.${header}`).toLowerCase()
                        ? t(`headers.${header}`)
                        : header}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMembers.map((member) => {
                return (
                  <TableRow key={member.userId}>
                    <TableCell />
                    <TableCell className={classes.tableText}>
                      {member.firstName || member.lastName ? (
                        <Text
                          onClick={() => showUserApps(member)}
                          data-testid={`${HEADERS[2]}_${member.userId}`}
                        >
                          <Link>
                            {t('memberName', {
                              firstName: member.firstName,
                              lastName: member.lastName,
                            })}
                          </Link>
                        </Text>
                      ) : (
                        <Text
                          onClick={() => showUserApps(member)}
                          data-testid={`${HEADERS[2]}_${member.userId}`}
                        >
                          <Link className={classes.notAvailable}>
                            {t('notAvailable')}
                          </Link>
                        </Text>
                      )}
                    </TableCell>
                    <TableCell
                      className={classes.tableText}
                      data-testid={`${HEADERS[3]}_${member.userId}`}
                    >
                      {member.emailAddress}
                    </TableCell>
                    <TableCell
                      className={classes.tableText}
                      data-testid={`${HEADERS[4]}_${member.userId}`}
                    >
                      {member.roleName}
                    </TableCell>
                    <TableCell data-testid={`${HEADERS[5]}_${member.userId}`}>
                      <StatusDisplay
                        data-testid={`${HEADERS[5]}_${member.userId}_status`}
                        status={member.memberStatus}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        onClick={() => setMemberToEdit(member)}
                        data-testid={`edit_${member.userId}`}
                        disabled={
                          member.emailAddress === null ||
                          member.emailAddress.trim() === ''
                        }
                      >
                        <OutlinedIcon icon="edit" />
                      </IconButton>
                      <IconButton
                        onClick={(e) => showContextMenu(member, e)}
                        data-testid={`more_${member.userId}`}
                      >
                        <RegularIcon icon="more_vert" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
