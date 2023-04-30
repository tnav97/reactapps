import React, { useState } from 'react';
import { Button, Input, Modal, Select, Text } from '@alcumus/components';
import { Grid } from '@mui/material';
import { Application, MyOrganizationDetails } from '../../../types';
import { TFunction } from 'i18next';
import { useStateFromInput } from '@alcumus/hooks';
import { makeStyles } from '@mui/styles';
import { createSubscription } from './createSubscription';
import { addDays, addYears, formatISO, parseISO } from 'date-fns';
import useSWR from 'swr';
import Analytics from '@alcumus/analytics-package';
import { CURRENT_ORGANIZATION_PROFILE_URL } from '../../MyOrganization';

interface AddSubscriptionProps {
  t: TFunction;
  onClose: () => void;
  organizationId?: number;
}

const useStyles = makeStyles({
  modalActions: {},
  cancelActionWrapper: {},
});

export default function AddSubscription({
  t,
  onClose,
  organizationId,
}: AddSubscriptionProps) {
  const classes = useStyles();

  const [selectedApplication, setSelectedApplication] = useState<number>();
  const [seats, handleSeatsChange] = useStateFromInput('0');
  const [startDate, handleStartDateChange] = useStateFromInput(
    formatISO(new Date(), { representation: 'date' })
  );
  const [endDate, handleEndDateChange] = useStateFromInput(
    formatISO(addYears(new Date(), 1), { representation: 'date' })
  );
  const [isSubscribing, setIsSubscribing] = useState(false);

  const { data: applications, isValidating: isLoading } = useSWR<Application[]>(
    `/api/organizations/${organizationId}/applications/available`
  );
  const { data: myOrganizationDetails } = useSWR<MyOrganizationDetails>(
    CURRENT_ORGANIZATION_PROFILE_URL
  );

  const subscribe = async () => {
    if (myOrganizationDetails) {
      Analytics.getInstance().track('Product Subscription Added', {
        organization: myOrganizationDetails.tenantName,
      });
    }
    if (selectedApplication) {
      setIsSubscribing(true);
      try {
        await createSubscription({
          applicationId: selectedApplication,
          seats: parseInt(seats),
          startDate,
          endDate,
        });
        setIsSubscribing(false);
        onClose();
      } catch (e) {
        setIsSubscribing(false);
      }
    }
  };

  const handleApplicationChange = (event) => {
    setSelectedApplication(event.target.value);
  };

  return (
    <React.Fragment>
      <Modal.Header onClose={onClose}>
        <Text as="h4">{t('addSubscription')}</Text>
      </Modal.Header>
      <Modal.Body>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Select
              label={t('product')}
              required
              fullWidth
              value={selectedApplication}
              onChange={handleApplicationChange}
              disabled={isLoading}
              items={(applications || []).map((application) => ({
                id: application.applicationId,
                name: application.applicationName,
              }))}
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              label={t('licenses')}
              required
              value={seats}
              type="number"
              onChange={handleSeatsChange}
              min={0}
              data-testid="licenses"
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label={t('startDate')}
              required
              value={startDate}
              type="date"
              onChange={handleStartDateChange}
              data-testid="startDate"
              min={formatISO(new Date(), { representation: 'date' })}
              max={formatISO(parseISO(endDate), { representation: 'date' })}
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              label={t('endDate')}
              required
              value={endDate}
              type="date"
              onChange={handleEndDateChange}
              data-testid="endDate"
              min={formatISO(addDays(parseISO(startDate), 1), {
                representation: 'date',
              })}
            />
          </Grid>
        </Grid>
      </Modal.Body>
      <Modal.Actions className={classes.modalActions}>
        <div className={classes.cancelActionWrapper}>
          <Button
            variant="outlined"
            rounded
            disabled={isSubscribing}
            onClick={onClose}
            data-testid="cancel"
          >
            {t('cancel')}
          </Button>
        </div>
        <Button
          rounded
          disabled={
            isSubscribing || Number(seats) === 0 || !selectedApplication
          }
          onClick={() => subscribe()}
          data-testid="addSubscription"
        >
          {isSubscribing ? t('addingSubscription') : t('addSubscription')}
        </Button>
      </Modal.Actions>
    </React.Fragment>
  );
}
