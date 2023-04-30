import { Grid } from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import React, { useCallback, useContext, useState } from 'react';
import { TFunction } from 'i18next';
import { Button, Modal, StyleVariables, Text } from '@alcumus/components';
import { MyOrganizationContact } from '../../../types';
import TextSection from '../TextSection';
import ContactInformationModal from '../Modals/ContactInformationModal';
import { ToastContext } from '../../../context/ToastContext';
import {
  createMyOrganizationContact,
  updateMyOrganizationContact,
} from '../endpoints';
import { useSWRConfig } from 'swr';
import { CURRENT_ORGANIZATION_PROFILE_URL } from '../index';

export interface ContactInformationSectionProps {
  t: TFunction;
  organizationContact?: MyOrganizationContact;
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

export default function ContactInformationSection({
  t,
  organizationContact,
  organizationId,
}: ContactInformationSectionProps) {
  const classes = useStyles();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const handleCancelEdit = useCallback(() => {
    setShowEditModal(false);
  }, []);

  const { mutate } = useSWRConfig();

  const { setToast } = useContext(ToastContext);

  const handleUpdate = async (
    newOrganizationContact: MyOrganizationContact
  ) => {
    setIsUpdating(true);
    try {
      if (newOrganizationContact.organizationContactId) {
        await updateMyOrganizationContact({
          ...newOrganizationContact,
          organizationId,
        });
      } else {
        await createMyOrganizationContact({
          ...newOrganizationContact,
          organizationId,
          contactFirstName: '',
          contactLastName: '',
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
    <Grid container spacing={3} data-testid="contactInformationSection">
      <StyledGridHeader item xs={12}>
        <Text as="h4" data-testid="organizationContactInformationHeader">
          {t('contactInformation')}
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
        <Text as="span" data-testid="organizationContactInformationEmail">
          {t('emailAddress')}
        </Text>
        <TextSection
          textValue={organizationContact?.contactEmailAddress}
          t={t}
          dataTestId="organizationContactInformationEmailValue"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Text as="span" data-testid="organizationContactInformationPhoneNumber">
          {t('phoneNumber')}
        </Text>
        <TextSection
          textValue={organizationContact?.contactPhoneNumber}
          t={t}
          dataTestId="organizationContactInformationPhoneNumberValue"
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Text as="span" data-testid="organizationContactInformationFax">
          {t('faxNumber')}
        </Text>
        <TextSection
          textValue={organizationContact?.contactFaxNumber}
          t={t}
          dataTestId="organizationContactInformationFaxValue"
        />
      </Grid>
      <Modal
        open={showEditModal}
        title={t('editContactDetails')}
        onClose={handleCancelEdit}
        size="sm"
        className={classes.modal}
        data-testid="contactInformationModal"
      >
        <ContactInformationModal
          onCancel={handleCancelEdit}
          t={t}
          organizationContact={organizationContact}
          onUpdate={handleUpdate}
          isUpdating={isUpdating}
          error={undefined}
        />
      </Modal>
    </Grid>
  );
}
