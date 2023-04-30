import { Grid } from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import React, { useCallback, useContext, useState } from 'react';
import { TFunction } from 'i18next';
import { Button, Modal, StyleVariables, Text } from '@alcumus/components';
import { MyOrganizationAddress } from '../../../types';
import TextSection from '../TextSection';
import OrganizationLocationModal from '../Modals/OrganizationLocationModal';
import { useSWRConfig } from 'swr';
import { ToastContext } from '../../../context/ToastContext';
import {
  createMyOrganizationAddress,
  updateMyOrganizationAddress,
} from '../endpoints';
import { CURRENT_ORGANIZATION_PROFILE_URL } from '../index';

export interface OrganizationLocationSectionProps {
  t: TFunction;
  organizationAddress?: MyOrganizationAddress;
  organizationId: number;
}

const StyledGridHeader = withStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    '& h4': {
      fontWeight: StyleVariables.fonts.weight.medium,
    },
  },
}))(Grid);

const useStyles = makeStyles(() => ({
  modal: {
    '& h4': {
      fontWeight: StyleVariables.fonts.weight.medium,
    },
  },
}));

export default function OrganizationLocationSection({
  t,
  organizationAddress,
  organizationId,
}: OrganizationLocationSectionProps) {
  const classes = useStyles();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [, setErrorState] = useState<
    Record<string, { key: string; message: string }> | undefined
  >(undefined);

  const handleCancelEdit = useCallback(() => {
    setErrorState(undefined);
    setShowEditModal(false);
  }, []);

  const { mutate } = useSWRConfig();

  const { setToast } = useContext(ToastContext);

  const handleUpdate = async (
    newOrganizationAddress: MyOrganizationAddress
  ) => {
    setIsUpdating(true);
    try {
      if (newOrganizationAddress.mailingAddressId) {
        await updateMyOrganizationAddress({
          ...newOrganizationAddress,
          organizationId,
        });
      } else {
        await createMyOrganizationAddress({
          ...newOrganizationAddress,
          organizationId,
        });
      }
      mutate(CURRENT_ORGANIZATION_PROFILE_URL);
      setShowEditModal(false);
      setToast({
        message: t('contactUpdateSuccessMessage'),
        severity: 'success',
      });
    } catch (e) {
      setToast({
        message: t('contactUpdateErrorMessage'),
        severity: 'error',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Grid container spacing={3} data-testid="organizationLocationSection">
      <StyledGridHeader item xs={12}>
        <Text as="h4" data-testid="organizationLocationHeader">
          {t('organizationLocation')}
        </Text>
        <Button
          rounded
          variant="outlined"
          onClick={() => setShowEditModal(true)}
        >
          {t('edit')}
        </Button>
      </StyledGridHeader>
      <Grid item xs={12}>
        <Text as="span" data-testid="organizationLocationAddressLine1">
          {t('addressLine1')}
        </Text>
        <TextSection
          textValue={organizationAddress?.addressLine1}
          t={t}
          dataTestId="organizationLocationAddressLine1Value"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Text as="span" data-testid="organizationLocationCity">
          {t('city')}
        </Text>
        <TextSection
          textValue={organizationAddress?.city}
          t={t}
          dataTestId="organizationLocationCityValue"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Text as="span" data-testid="organizationLocationState">
          {t('stateProvince')}
        </Text>
        <TextSection
          textValue={organizationAddress?.provinceState}
          t={t}
          dataTestId="organizationLocationStateValue"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Text as="span" data-testid="organizationLocationPostalCode">
          {t('zipPostalCode')}
        </Text>
        <TextSection
          textValue={organizationAddress?.postalZipCode}
          t={t}
          dataTestId="organizationLocationPostalCodeValue"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Text as="span" data-testid="organizationLocationCountry">
          {t('country')}
        </Text>
        <TextSection
          textValue={organizationAddress?.countryCode}
          t={t}
          dataTestId="organizationLocationCountryValue"
        />
      </Grid>
      <Modal
        open={showEditModal}
        title={t('editOrganizationLocation')}
        onClose={handleCancelEdit}
        size="sm"
        className={classes.modal}
        data-testid="organizationLocationModal"
      >
        <OrganizationLocationModal
          onCancel={handleCancelEdit}
          t={t}
          organizationAddress={organizationAddress}
          onUpdate={handleUpdate}
          isUpdating={isUpdating}
        />
      </Modal>
    </Grid>
  );
}
