import React, { useState } from 'react';
import { matchPath, useLocation, useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import {
  Box,
  IconButton,
  TableCell,
  TableRow,
  Table as MuiTable,
  TableContainer,
  TableHead,
  TableBody,
} from '@mui/material';
import {
  Button,
  OutlinedIcon,
  StyleVariables,
  Text,
  Modal,
} from '@alcumus/components';
import { RoleAndPermissions, SubscriptionWithSeats } from '../../types';
import useSWR from 'swr';
import { TFunction } from 'i18next';
import { createAxiosInstanceWithAccessToken } from '../../axiosInstance';
import { Tabs } from './Tabs';
import ManageSubscriptionModal from './ManageSubscriptionModal';
import SubscriptionStatusDisplay from '../SubscriptionStatusDisplay';

const useStyles = makeStyles({
  header: { marginBottom: '1rem' },
  subscriptionSeats: {
    backgroundColor: StyleVariables.colors.background.default,
    height: '104px',
    borderRadius: '8px',
    padding: '24px 40px',
  },
  subscriptionSeatsTitle: { marginBottom: '1rem' },
  icon: { marginRight: '1rem', color: StyleVariables.colors.icon.default },
  artifactName: { fontWeight: StyleVariables.fonts.weight.semiBold },
  backIcon: { color: StyleVariables.colors.icon.default },
  verticalLine: {
    width: '1px',
    height: '56px',
    backgroundColor: StyleVariables.colors.border.default,
    margin: '0 1.5rem',
  },
  manageLicensesButtonText: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
  },
  tableText: {
    fontWeight: StyleVariables.fonts.weight.regular,
    fontSize: StyleVariables.fonts.size.regular,
    lineHeight: StyleVariables.fonts.lineHeight.h5,
  },
  tabContents: {
    marginTop: StyleVariables.spacing(4),
  },
});

export function SubscriptionDetails({
  t,
  loggedInUserRole,
}: {
  t: TFunction;
  loggedInUserRole?: RoleAndPermissions;
}) {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  const canManageLicenses = (loggedInUserRole?.roleLookupKey || 'Client.Admin')
    .toLowerCase()
    .startsWith('alcumus');

  const classes = useStyles();
  const match = matchPath<{ id }>(useLocation().pathname, {
    path: '/settings/subscriptions/:id',
  });
  const [openManageSubscription, setOpenManageSubscription] = useState(false);

  const { data: subscriptionWithSeats, mutate: reload } = useSWR<
    SubscriptionWithSeats,
    Error
  >(`/api/subscriptions/${match?.params.id}`, (url: string) =>
    createAxiosInstanceWithAccessToken()
      .get(url)
      .then((response) => response.data)
  );

  return subscriptionWithSeats ? (
    <div>
      <Box
        display={'flex'}
        justifyContent="space-between"
        className={classes.header}
      >
        <Box display="flex" alignItems="center">
          <IconButton
            className={classes.backIcon}
            onClick={goBack}
            data-testid="backButton"
          >
            <OutlinedIcon icon="arrow_back" />
          </IconButton>
          <Text as="h5" className={classes.artifactName}>
            {subscriptionWithSeats.subscription.applicationName || ''}
          </Text>
        </Box>
        <Box display="flex" alignItems="center">
          <OutlinedIcon icon="more_vert" className={classes.icon} />
          {canManageLicenses && (
            <Button
              variant="outlined"
              rounded
              data-testid="manageLicenses"
              onClick={() => setOpenManageSubscription(true)}
            >
              <Box display="flex" alignItems="center">
                <OutlinedIcon icon="settings" className={classes.icon} />
                <Text className={classes.manageLicensesButtonText}>
                  {t('manageLicenses')}
                </Text>
              </Box>
            </Button>
          )}
        </Box>
      </Box>

      <Modal
        open={openManageSubscription}
        onClose={() => setOpenManageSubscription(false)}
        size="md"
      >
        <ManageSubscriptionModal
          onClose={() => {
            setOpenManageSubscription(false);
            reload();
          }}
          subscriptionId={match?.params.id}
        />
      </Modal>

      <Box className={classes.subscriptionSeats} display="flex">
        <div>
          <div className={classes.subscriptionSeatsTitle}>
            <Text as="small">{t('totalLicenses')}</Text>
          </div>
          <Text as="h6" data-testid="totalLicenses">
            {subscriptionWithSeats.seats.totalSeats}
          </Text>
        </div>
        <div className={classes.verticalLine}></div>
        <div>
          <div className={classes.subscriptionSeatsTitle}>
            <Text as="small" className={classes.subscriptionSeatsTitle}>
              {t('availableLicenses')}
            </Text>
          </div>
          <Text as="h6" data-testid="availableLicenses">
            {subscriptionWithSeats.seats.availableSeats}
          </Text>
        </div>
      </Box>
      <Tabs labels={[t('users')]}>
        <div className={classes.tabContents}>
          <TableContainer>
            <MuiTable>
              <TableHead>
                <TableRow>
                  {[
                    '',
                    t('name'),
                    t('contact'),
                    t('role'),
                    t('userStatus'),
                    '',
                  ].map((header, index) => (
                    <TableCell key={header || index}>{header}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {subscriptionWithSeats.subscription.users.map((user) => (
                  <TableRow key={user.userId} data-testid={user.userId}>
                    <TableCell />
                    <TableCell
                      className={classes.tableText}
                      data-testid={`${user.name}_${user.userId}`}
                    >
                      {user.name}
                    </TableCell>
                    <TableCell
                      className={classes.tableText}
                      data-testid={`${user.contact}_${user.userId}`}
                    >
                      {user.contact}
                    </TableCell>
                    <TableCell
                      className={classes.tableText}
                      data-testid={`${user.role}_${user.userId}`}
                    >
                      {user.role}
                    </TableCell>
                    <TableCell
                      data-testid={`${user.userStatus}_${user.userId}`}
                    >
                      <SubscriptionStatusDisplay
                        status={user.userStatus ? 'active' : 'disabled'}
                      />
                    </TableCell>
                    <TableCell
                      data-testid={`more_${user.userId}`}
                      align="right"
                    >
                      <IconButton disabled={true}>
                        <OutlinedIcon icon="more_vert" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </MuiTable>
          </TableContainer>
        </div>
      </Tabs>
    </div>
  ) : (
    <></>
  );
}
