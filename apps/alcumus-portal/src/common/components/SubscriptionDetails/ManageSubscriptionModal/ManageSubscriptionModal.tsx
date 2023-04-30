import React, { useContext, useState } from 'react';
import {
  Button,
  Input,
  Modal,
  Text,
  StyleVariables,
  AlertSnackbar,
} from '@alcumus/components';
import { Divider, Grid } from '@mui/material';
import { useStateFromInput } from '@alcumus/hooks';
import { makeStyles } from '@mui/styles';
import { format } from 'date-fns';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { ToggleButton, ToggleButtonGroup } from '@mui/lab';
import { updateSubscriptionLicenses } from './updateSubscriptionLicenses';
import { ToastContext } from '../../../context/ToastContext';

interface ManageSubscriptionProps {
  onClose: () => void;
  subscriptionId: number;
}

const useStyles = makeStyles({
  toggleText: {
    fontSize: StyleVariables.fonts.size.small,
    textTransform: 'capitalize',
    height: 32,
    fontWeight: 600,
    color: StyleVariables.colors.black,
    '&:focus': {
      color: StyleVariables.colors.white,
      backgroundColor: StyleVariables.colors.action.primary.default,
    },
    '&:active': {
      color: StyleVariables.colors.white,
      backgroundColor: StyleVariables.colors.action.primary.default,
    },
    '&$selected': {
      color: StyleVariables.colors.white,
      backgroundColor: StyleVariables.colors.action.primary.default,
      '&:hover': {
        color: StyleVariables.colors.white,
        backgroundColor: StyleVariables.colors.action.primary.default,
      },
    },
  },
  selected: {},
  buttonGroup: {
    height: '42px',
    '& > button:first-child': {
      borderTopLeftRadius: '8px',
      borderBottomLeftRadius: '8px',
      borderColor: `${StyleVariables.colors.border.default}`,
    },
    '& > button:last-child': {
      borderTopRightRadius: '8px',
      borderBottomRightRadius: '8px',
      borderColor: `${StyleVariables.colors.border.default}`,
    },
  },
  modalActions: {
    marginTop: '6rem',
  },
  cancelActionWrapper: {},
  snackBar: {
    bottom: '6rem',
    width: '95%',
    '& > div:first-child': {
      width: '100%',
    },
    '& > div > div:first-child': {
      display: 'none',
    },
    '& > div > div:nth-child(2)': {
      border: 'none',
      borderRadius: '6px',
    },
  },
});

export default function ManageSubscriptionModal({
  onClose,
  subscriptionId,
}: ManageSubscriptionProps) {
  const classes = useStyles();
  const [toggle, setToggle] = useState('add');
  const [license, handleLicenseChange] = useStateFromInput('0');
  const [isUpdating, setIsUpdating] = useState(false);
  const { t } = useTranslation(['ManageLicenses']);

  const subscriptionResponse = useSWR(
    subscriptionId ? `/api/subscriptions/${subscriptionId}` : null
  );

  const { setToast } = useContext(ToastContext);
  const subscription = subscriptionResponse.data;
  const startDate = format(
    new Date(subscription.subscription.startDate),
    'MMMM dd, yyyy'
  );
  const endDate = format(
    new Date(subscription.subscription.endDate),
    'MMMM dd, yyyy'
  );

  const handleToggle = (event, newView) => {
    if (newView !== null) {
      setToggle(newView);
    }
  };

  const updateSubscriptionSeats = async () => {
    setIsUpdating(true);
    const seats =
      toggle === 'add'
        ? subscription.seats.totalSeats + Number(license)
        : subscription.seats.totalSeats - Number(license);
    const updateSubscriptionSeatsParam = {
      seats,
    };

    try {
      await updateSubscriptionLicenses(
        updateSubscriptionSeatsParam,
        subscriptionId
      );
      setIsUpdating(false);
      setToast({
        message: t('manageSubscriptionSeatsSuccessToastMessage'),
        severity: 'success',
      });
      onClose();
    } catch (e: any) {
      console.error(e);
      setIsUpdating(false);
      setToast({
        message: t('manageSubscriptionSeatsErrorToastMessage'),
        severity: 'error',
      });
    }
  };

  return (
    <React.Fragment>
      <Modal.Header onClose={onClose}>
        <Text as="h4">{t('manageSubscription')}</Text>
      </Modal.Header>
      <Modal.Body>
        <Grid container spacing={1}>
          <Grid item md={4}>
            <div>
              {t('subscriptionPeriod')}
              <br />
              {startDate} - {endDate}
            </div>
          </Grid>
          <Grid item md={2}>
            <div>
              {t('totalLicenses')}
              <br />
              {subscription.seats.totalSeats}
            </div>
          </Grid>
          <Grid item md={2}>
            <div>
              {t('usedLicenses')}
              <br />
              {subscription.seats.totalSeats -
                subscription.seats.availableSeats}
            </div>
          </Grid>
          <Grid item md={2}>
            <div>
              {t('availableLicenses')}
              <br />
              {subscription.seats.availableSeats}
            </div>
          </Grid>
        </Grid>
        <br />
        <Divider />
        <br />
        <ToggleButtonGroup
          value={toggle}
          exclusive
          onChange={handleToggle}
          aria-label={t('licenses')}
          className={classes.buttonGroup}
        >
          <ToggleButton
            classes={{
              root: `${classes.toggleText}`,
              selected: classes.selected,
            }}
            value={'add'}
            aria-label={t('addLicenses')}
            data-testid="addLicensesToggle"
          >
            <div>{t('addLicenses')}</div>
          </ToggleButton>
          <ToggleButton
            classes={{
              root: `${classes.toggleText}`,
              selected: classes.selected,
            }}
            value={'remove'}
            aria-label={t('removeLicenses')}
            data-testid="removeLicensesToggle"
          >
            <div>{t('removeLicenses')}</div>
          </ToggleButton>
        </ToggleButtonGroup>
        <br />
        <br />
        <Grid container spacing={1}>
          <Grid item md={3}>
            <Input
              label={t('licenses')}
              required
              value={Number(license) >= 0 ? license : '0'}
              type="number"
              onChange={handleLicenseChange}
              min={0}
              data-testid="licenses"
            />
          </Grid>
          <Grid container spacing={1}>
            <Grid item md={12}>
              {Number(license) > 0 && toggle === 'add' && (
                <AlertSnackbar
                  className={classes.snackBar}
                  message={t('addLicenseAlert', { license: Number(license) })}
                  severity="success"
                  open
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                />
              )}

              {Number(license) > 0 &&
                toggle === 'remove' &&
                Number(license) > subscription.seats.availableSeats && (
                  <AlertSnackbar
                    className={classes.snackBar}
                    message={t('removeLicenseAlert', {
                      license:
                        Number(license) - subscription.seats.availableSeats,
                    })}
                    severity="error"
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                  />
                )}
            </Grid>
          </Grid>
        </Grid>
      </Modal.Body>
      <Modal.Actions className={classes.modalActions}>
        <div className={classes.cancelActionWrapper}>
          <Button
            variant="outlined"
            rounded
            onClick={onClose}
            data-testid="cancel"
          >
            {t('cancel')}
          </Button>
        </div>
        <Button
          disabled={
            (toggle === 'remove' &&
              Number(license) > subscription.seats.availableSeats) ||
            Number(license) <= 0
          }
          rounded
          data-testid="saveSubscription"
          onClick={() => updateSubscriptionSeats()}
        >
          {isUpdating ? t('updating') : t('save')}
        </Button>
      </Modal.Actions>
    </React.Fragment>
  );
}
