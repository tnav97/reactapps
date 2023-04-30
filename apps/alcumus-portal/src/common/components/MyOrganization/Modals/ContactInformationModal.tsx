import React, { ChangeEventHandler, useCallback, useState } from 'react';
import { Button, Input, Modal, Text } from '@alcumus/components';
import { TFunction } from 'i18next';
import { MyOrganizationContact } from '../../../types';
import { Grid } from '@mui/material';
import validator from 'validator';
import isPhoneNumber from '../../../../lib/utils/isPhoneNumber';

interface ContactInformationModalProps {
  onCancel?: () => void;
  t: TFunction;
  organizationContact?: MyOrganizationContact;
  onUpdate: (newOrganizationContact: MyOrganizationContact) => void;
  isUpdating: boolean;
  error?: string;
}

interface OrganizationContactEmailAddress {
  emailAddress: string;
  error?: string;
}

interface OrganizationContactPhoneNumber {
  phoneNumber: string;
  error?: string;
}

interface OrganizationContactFaxNumber {
  faxNumber: string;
  error?: string;
}

export default function ContactInformationModal({
  onCancel,
  t,
  organizationContact,
  onUpdate,
  isUpdating,
  error,
}: ContactInformationModalProps) {
  const [emailAddress, setEmailAddress] =
    useState<OrganizationContactEmailAddress>({
      emailAddress: (organizationContact?.contactEmailAddress as string) || '',
    });
  const [phoneNumber, setPhoneNumber] =
    useState<OrganizationContactPhoneNumber>({
      phoneNumber: (organizationContact?.contactPhoneNumber as string) || '',
    });

  const [faxNumber, setFaxNumber] = useState<OrganizationContactFaxNumber>({
    faxNumber: (organizationContact?.contactFaxNumber as string) || '',
  });

  const intialContactInformationIsEmpty =
    emailAddress.emailAddress === '' &&
    faxNumber.faxNumber === '' &&
    phoneNumber.phoneNumber === '';

  const updateContactInformation = useCallback(() => {
    onUpdate({
      contactEmailAddress: emailAddress.emailAddress || '',
      contactPhoneNumber: phoneNumber.phoneNumber || '',
      contactFaxNumber: faxNumber.faxNumber || '',
      organizationContactId:
        organizationContact?.organizationContactId as number,
      organizationId: organizationContact?.organizationId as number,
    });
  }, [emailAddress.emailAddress, phoneNumber.phoneNumber, faxNumber.faxNumber]);

  const handleEmailAddressChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { value } = target;
    setEmailAddress({
      emailAddress: value.trim(),
      error:
        value.trim().length > 0 && !validator.isEmail(value)
          ? t('invalidEmail')
          : undefined,
    });
  };

  const handlePhoneNumberChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { value } = target;

    setPhoneNumber({
      phoneNumber: value,
      error: isPhoneNumber(value) ? t('invalidPhoneNumber') : undefined,
    });
  };

  const handleFaxNumberChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { value } = target;
    setFaxNumber({
      faxNumber: value,
      error: isPhoneNumber(value) ? t('invalidFaxNumber') : undefined,
    });
  };

  return (
    <>
      <Modal.Body>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Input
              label={t('emailAddress')}
              value={emailAddress.emailAddress}
              onChange={handleEmailAddressChange}
              disabled={isUpdating}
              placeholder={t('notEntered')}
              state={emailAddress?.error ? 'error' : 'default'}
              hint={emailAddress?.error}
              data-testid="emailAddressInput"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label={t('phoneNumber')}
              value={phoneNumber.phoneNumber}
              onChange={handlePhoneNumberChange}
              disabled={isUpdating}
              placeholder={'+1 2223334444'}
              state={phoneNumber?.error ? 'error' : 'default'}
              hint={phoneNumber?.error}
              data-testid="phoneNumberInput"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label={t('faxNumber')}
              value={faxNumber.faxNumber}
              onChange={handleFaxNumberChange}
              // todo ARC-743 reenable when fax numbers are supported
              disabled
              placeholder={'+1 2223334444'}
              state={faxNumber?.error ? 'error' : 'default'}
              hint={faxNumber?.error}
              data-testid="faxNumberInput"
            />
          </Grid>
          {!!error?.length && <Text color="error">{error}</Text>}
        </Grid>
      </Modal.Body>
      <Modal.Actions>
        <Button
          variant="outlined"
          rounded
          onClick={onCancel}
          data-testid="cancelButton"
        >
          {t('cancel')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          rounded
          disabled={
            isUpdating ||
            !!emailAddress?.error ||
            !!phoneNumber?.error ||
            !!faxNumber?.error ||
            !!intialContactInformationIsEmpty ||
            emailAddress.emailAddress.trim().length === 0 ||
            phoneNumber.phoneNumber.trim().length === 0
          }
          onClick={updateContactInformation}
          data-testid="saveButton"
        >
          {isUpdating ? t('updating') : t('save')}
        </Button>
      </Modal.Actions>
    </>
  );
}
