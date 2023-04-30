import { Grid } from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import React, { useCallback, useContext, useState } from 'react';
import { TFunction } from 'i18next';
import { Button, Modal, StyleVariables, Text } from '@alcumus/components';
import {
  EditableOrganizationDetails,
  MyOrganizationDetails,
} from '../../../types';
import TextSection from '../TextSection';
import OrganizationDetailsModal from '../Modals/OrganizationDetailsModal';
import { updateMyOrganizationDetails } from '../endpoints';
import { ToastContext } from '../../../context/ToastContext';
import { useSWRConfig } from 'swr';
import { CURRENT_ORGANIZATION_PROFILE_URL } from '../index';

export interface OrganizationDetailsSectionProps {
  t: TFunction;
  organizationDetails?: MyOrganizationDetails;
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

export default function OrganizationDetailsSection({
  t,
  organizationDetails,
  organizationId,
}: OrganizationDetailsSectionProps) {
  const classes = useStyles();
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<
    Record<string, { key: string; message: string }> | undefined
  >(undefined);

  const handleCancelEdit = useCallback(() => {
    setErrorState(undefined);
    setShowEditModal(false);
  }, []);

  const { mutate } = useSWRConfig();

  const { setToast } = useContext(ToastContext);

  const handleUpdate = async (
    newOrganizationDetails: EditableOrganizationDetails
  ) => {
    setIsUpdating(true);
    try {
      await updateMyOrganizationDetails(organizationId, newOrganizationDetails);
      mutate(CURRENT_ORGANIZATION_PROFILE_URL);
      setShowEditModal(false);
      setToast({
        message: t('organizationDetailUpdateSuccessMessage'),
        severity: 'success',
      });
    } catch (e) {
      setToast({
        message: t('organizationDetailUpdateErrorMessage'),
        severity: 'error',
      });
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Grid
      container
      direction="column"
      spacing={3}
      data-testid="organizationDetailsSection"
    >
      <StyledGridHeader item>
        <Text as="h4" data-testid="organizationDetailsHeader">
          {t('organizationDetails')}
        </Text>
        <Button
          rounded
          variant="outlined"
          onClick={() => setShowEditModal(true)}
        >
          {t('edit')}
        </Button>
      </StyledGridHeader>
      <Grid item>
        <Text as="span" data-testid="organizationDetailsName">
          {t('organizationName')}
        </Text>
        <TextSection
          textValue={organizationDetails?.tenantName}
          t={t}
          dataTestId="OrganizationNameValue"
        />
      </Grid>
      <Grid item>
        <Text as="span" data-testid="organizationDetailsIndustry">
          {t('industryType')}
        </Text>
        <TextSection
          textValue={organizationDetails?.organizationIndustryType}
          t={t}
          dataTestId="OrganizationIndustryTypeValue"
        />
      </Grid>
      <Grid item>
        <Text as="span" data-testid="organizationDetailsSize">
          {t('organizationSize')}
        </Text>
        <TextSection
          textValue={t(
            organizationDetails?.organizationSizeDesignation as string
          )}
          t={t}
          dataTestId="OrganizationDetailsSizeValue"
        />
      </Grid>
      <Grid item>
        <Text as="span" data-testid="organizationDetailWebsite">
          {t('website')}
        </Text>
        <TextSection
          textValue={organizationDetails?.organizationWebsite}
          t={t}
          dataTestId="OrganizationDetailsWebsiteValue"
        />
      </Grid>
      <Grid item>
        <Text as="span" data-testid="organizationDetailsLanguage">
          {t('language')}
        </Text>
        <TextSection
          textValue={t(organizationDetails?.defaultLanguageCode as string, {
            ns: 'LanguageCode',
          })}
          t={t}
          dataTestId="OrganizationDetailsLanguageValue"
        />
      </Grid>
      <Modal
        open={showEditModal}
        title={t('editOrganizationDetails')}
        onClose={handleCancelEdit}
        size="sm"
        className={classes.modal}
        data-testid="organizationDetailsModal"
      >
        <OrganizationDetailsModal
          onCancel={handleCancelEdit}
          organizationDetails={organizationDetails}
          onUpdate={handleUpdate}
          isUpdating={isUpdating}
          t={t}
          error={undefined}
        />
      </Modal>
    </Grid>
  );
}
