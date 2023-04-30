import React from 'react';
import {
  Box,
  IconButton,
  SwipeableDrawer,
  Theme,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { MemberDetails } from '../../types';
import { OutlinedIcon, StyleVariables, Text } from '@alcumus/components';
import {
  DisplayEmail,
  DisplayPhoneNumber,
  DisplayUserName,
} from './DisplayMemberInfo';
import { DisplayApplication } from './DisplayApplication';
import { TFunction } from 'i18next';
import useSWR from 'swr';
import StatusDisplay from '../StatusDisplay';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: '1.5rem',
    color: StyleVariables.colors.text.default,
    minWidth: '400px',
    [theme.breakpoints.down('xs')]: {
      minWidth: '100vw',
    },
  },
  toolBar: {
    justifyContent: 'space-between',
    display: 'flex',
  },
  iconButton: {
    width: '1.5rem',
    height: '1.5rem',
    marginLeft: '1.875rem',
  },
  hr: {
    color: StyleVariables.colors.border.default,
    margin: '1.5rem 0',
  },
  appSubscriptions: {
    fontWeight: StyleVariables.fonts.weight.medium,
    marginBottom: '1.5rem',
  },
  userInfoContainer: {
    marginTop: '1.5rem',
  },
  displayRow: {
    marginTop: '0.75rem',
  },
  application: {
    marginBottom: '0.75rem',
  },
  memberName: {
    fontWeight: StyleVariables.fonts.weight.medium,
  },
  notAvailable: {
    color: StyleVariables.colors.text.subdued,
  },
}));

interface UserApplicationsProps {
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  organizationId: number;
  member: MemberDetails;
  t: TFunction;
}

export function MemberApplications({
  open,
  onClose,
  member,
  organizationId,
  onEdit,
  t,
}: UserApplicationsProps) {
  const classes = useStyles();

  const { data: applications } = useSWR(
    `/api/users/${member.userId}/applications`
  );

  return (
    <SwipeableDrawer
      BackdropProps={{ invisible: true }}
      open={open}
      anchor="right"
      onClose={onClose}
      onOpen={() => null}
      data-testid="drawer"
    >
      <div className={classes.container}>
        <Box className={classes.toolBar}>
          <div>
            {member.firstName || member.lastName ? (
              <Text
                as="h6"
                className={classes.memberName}
                data-testid="memberName"
              >{`${member.firstName} ${member.lastName}`}</Text>
            ) : (
              <Text
                as="h6"
                className={classes.notAvailable}
                data-testid="memberName"
              >
                {t('notAvailable')}
              </Text>
            )}
            <Text data-testid="memberRole">{`${member.roleName}`}</Text>
            <StatusDisplay
              data-testid={`membersPanel_${member.userId}_status`}
              status={member.memberStatus}
            />
          </div>
          <div>
            <IconButton
              className={classes.iconButton}
              data-testid="editButton"
              onClick={onEdit}
              disabled={
                member.emailAddress === null ||
                member.emailAddress.trim() === ''
              }
            >
              <OutlinedIcon icon="edit" />
            </IconButton>
            <IconButton className={classes.iconButton} data-testid="moreButton">
              <OutlinedIcon icon="more_vert" />
            </IconButton>
            <IconButton
              onClick={onClose}
              className={classes.iconButton}
              data-testid="closeButton"
            >
              <OutlinedIcon icon="close" />
            </IconButton>
          </div>
        </Box>
        <div className={classes.userInfoContainer}>
          <DisplayUserName member={member} className={classes.displayRow} />
          <DisplayEmail member={member} className={classes.displayRow} />
          <DisplayPhoneNumber member={member} className={classes.displayRow} />
        </div>
        <hr className={classes.hr} />
        {applications && (
          <>
            <Text as="h6" className={classes.appSubscriptions}>
              {`${t('appSubscriptions')} (${applications.length})`}
            </Text>
            {applications.map((application) => (
              <DisplayApplication
                key={application.applicationId}
                appName={application.applicationName}
                className={classes.application}
              />
            ))}
          </>
        )}
      </div>
    </SwipeableDrawer>
  );
}
