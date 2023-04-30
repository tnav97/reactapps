import React, { useState } from 'react';
import Link from '../Link';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Modal,
  OutlinedIcon,
  StyleVariables,
  Text,
} from '@alcumus/components';
import {
  Box,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link as MuiLink,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import AddSubscription from './AddSubscription';
import { Roles } from '../../constants';
import useSWR from 'swr';
import {
  MyOrganizationDetails,
  RoleAndPermissions,
  Subscription,
  SubscriptionStatus,
} from '../../types';
import SubscriptionStatusDisplay from '../SubscriptionStatusDisplay';
import SubscriptionContextMenu from './SubscriptionContextMenu';
import ConfirmCancelSubscriptionModal from './ConfirmCancelSubscriptionModal';
import { cancelSubscription } from './cancelSubscription';
import Analytics from '@alcumus/analytics-package';
import { CURRENT_ORGANIZATION_PROFILE_URL } from '../MyOrganization';

export interface OrganizationSubscriptionsProps {
  organizationId?: number;
  loggedInUserRole?: RoleAndPermissions;
}

const useStyles = makeStyles({
  addSubscriptionButton: {
    float: 'right',
  },
  activeLabel: {
    color: StyleVariables.colors.text.success,
    fontWeight: 500,
  },
  description: {
    marginTop: '24px',
  },
  resultCount: {
    marginTop: '32px',
    marginBottom: '32px',
    fontWeight: StyleVariables.fonts.weight.medium,
  },

  icon: { marginRight: '1rem' },
  subscriptionHeader: { marginLeft: '2.5rem' },

  manageButtonText: {
    fontWeight: StyleVariables.fonts.weight.semiBold,
  },
  subscriptions: { fontWeight: StyleVariables.fonts.weight.medium },
  manageLink: { '&:hover': { textDecoration: 'none' } },
});

const AlcumusAdminRoleLookupKey = 'Alcumus.Admin';
export default function OrganizationSubscriptions({
  organizationId,
  loggedInUserRole,
}: OrganizationSubscriptionsProps) {
  const { t } = useTranslation('settings');
  const classes = useStyles();
  const [openAddSubscription, setOpenAddSubscription] = useState(false);
  const [anchorElement, setAnchorEl] = useState<null | HTMLElement>(null);
  const [subscriptiontoPatch, setSubscriptiontoPatch] =
    useState<Subscription | null>(null);
  const [showConfirmCancelSubscription, setShowConfirmCancelSubscription] =
    useState(false);
  const {
    data: subscriptions,
    isValidating: isLoading,
    mutate,
  } = useSWR<Subscription[]>(
    `/api/organizations/${organizationId}/subscriptions`
  );

  const onContextMenuClose = () => setAnchorEl(null);
  const onCancelSubscription = () => {
    setShowConfirmCancelSubscription(true);
  };
  const showContextMenu = (
    subscription: Subscription,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(e.currentTarget);
    setSubscriptiontoPatch(subscription);
  };
  const { data: myOrganizationDetails } = useSWR<MyOrganizationDetails>(
    CURRENT_ORGANIZATION_PROFILE_URL
  );

  return (
    <div>
      {anchorElement && (
        <SubscriptionContextMenu
          anchorElement={anchorElement}
          onClose={onContextMenuClose}
          onCancelSubscription={onCancelSubscription}
        />
      )}
      {showConfirmCancelSubscription && (
        <ConfirmCancelSubscriptionModal
          onClose={() => {
            setSubscriptiontoPatch(null);
            setAnchorEl(null);
            setShowConfirmCancelSubscription(false);
          }}
          isOpen={showConfirmCancelSubscription}
          onSuccess={() => {
            setSubscriptiontoPatch(null);
            setShowConfirmCancelSubscription(false);
            setAnchorEl(null);
            mutate();
            Analytics.getInstance().track('Product Subscription Cancelled', {
              organization: myOrganizationDetails?.tenantName,
            });
          }}
          onConfirmCancelSubscription={async () => {
            if (subscriptiontoPatch) {
              await cancelSubscription(subscriptiontoPatch.subscriptionId);
            }
          }}
        />
      )}
      <Text
        as={'h4'}
        className={classes.subscriptions}
        data-testid="organizationSubscriptionHeader"
      >
        {t('organizationSubscriptions.header')}

        {loggedInUserRole?.roleLookupKey === Roles.ALCUMUS_ADMIN && (
          <Button
            variant="outlined"
            rounded
            onClick={() => setOpenAddSubscription(true)}
            className={classes.addSubscriptionButton}
            data-testid="addSubscription"
          >
            <Box display="flex" alignItems="center">
              <OutlinedIcon icon="add" className={classes.icon} />
              {t('addSubscription')}
            </Box>
          </Button>
        )}
      </Text>
      <Text as={'p'} className={classes.description}>
        {t('organizationSubscriptions.description')}
      </Text>

      <Text as={'h6'} className={classes.resultCount} data-testid="count">
        {isLoading
          ? t('organizationSubscriptions.loading')
          : t('organizationSubscriptions.resultCount', {
              count: subscriptions?.length,
            })}
      </Text>

      <Modal
        open={openAddSubscription}
        onClose={() => setOpenAddSubscription(false)}
        size="sm"
      >
        <AddSubscription
          organizationId={organizationId}
          onClose={() => {
            setOpenAddSubscription(false);
            mutate();
          }}
        />
      </Modal>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <div className={classes.subscriptionHeader}>
                  {t('organizationSubscriptions.subscription')}
                </div>
              </TableCell>
              <TableCell>
                {t('organizationSubscriptions.subscriptionStatus')}
              </TableCell>
              <TableCell>{t('organizationSubscriptions.users')}</TableCell>
              <TableCell>&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subscriptions?.map((subscription) => (
              <TableRow key={subscription.subscriptionId}>
                <TableCell component="th" scope="row">
                  <Box
                    display="flex"
                    alignItems="center"
                    data-testid={`${subscription.application?.applicationName}`}
                  >
                    <img
                      src="/images/alcumus-logo.svg"
                      className={classes.icon}
                    />
                    <Text>
                      <MuiLink
                        href={`/settings/subscriptions/${subscription.subscriptionId}`}
                      >
                        {subscription.application?.applicationName}
                      </MuiLink>
                    </Text>
                  </Box>
                </TableCell>
                <TableCell>
                  <SubscriptionStatusDisplay
                    data-testid={`${subscription.application?.applicationName}Status`}
                    status={'active'}
                  />
                </TableCell>
                <TableCell
                  data-testid={`${subscription.application?.applicationName}Users`}
                >
                  <Text>
                    {subscription.application?.userApplicationAccessCount
                      ?.count || 0}
                  </Text>
                </TableCell>
                <TableCell align="right">
                  <Link
                    to={`/settings/subscriptions/${subscription.subscriptionId}`}
                    className={classes.manageLink}
                  >
                    <Button rounded variant="outlined">
                      <Text as="small" className={classes.manageButtonText}>
                        {t('organizationSubscriptions.manage')}
                      </Text>
                    </Button>
                  </Link>

                  <IconButton
                    onClick={(e) => showContextMenu(subscription, e)}
                    disabled={
                      loggedInUserRole?.roleLookupKey !==
                        AlcumusAdminRoleLookupKey ||
                      subscription.subscriptionStatus ===
                        SubscriptionStatus.Cancelled
                    }
                  >
                    <OutlinedIcon icon="more_vert" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
