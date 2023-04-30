import React, { useCallback, useState } from 'react';
import { Button, Input, Modal, Select } from '@alcumus/components';
import { TFunction } from 'i18next';
import { CountryCode, MyOrganizationAddress } from '../../../types';
import { Grid } from '@mui/material';
import { useStateFromInput } from '@alcumus/hooks';
interface OrganizationLocationModalProps {
  onCancel?: () => void;
  t: TFunction;
  organizationAddress?: MyOrganizationAddress;
  isUpdating: boolean;
  onUpdate: (newOrganizationAddress: MyOrganizationAddress) => void;
}

export default function OrganizationLocationModal({
  onCancel,
  t,
  organizationAddress,
  isUpdating,
  onUpdate,
}: OrganizationLocationModalProps) {
  const [addressLine1, handleAddressLine1Change] = useStateFromInput(
    (organizationAddress?.addressLine1 as string) || ''
  );
  const [city, handleCityChange] = useStateFromInput(
    (organizationAddress?.city as string) || ''
  );
  const [provinceState, handleProvinceStateChange] = useStateFromInput(
    (organizationAddress?.provinceState as string) || ''
  );
  const [countryCode, setCountry] = useState<CountryCode>(
    organizationAddress?.countryCode ?? CountryCode.CA
  );
  const [postalZipCode, handlePostalZipCodeChange] = useStateFromInput(
    organizationAddress?.postalZipCode as string
  );

  const updateOrganizationAddress = useCallback(() => {
    onUpdate({
      addressLine1,
      city,
      provinceState,
      countryCode: countryCode as CountryCode,
      postalZipCode,
      organizationId: organizationAddress?.organizationId as number,
      mailingAddressId: organizationAddress?.mailingAddressId as number,
    });
  }, [addressLine1, city, provinceState, countryCode, postalZipCode]);

  return (
    <>
      <Modal.Body>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Input
              label={t('addressLine1')}
              value={addressLine1?.trim() || ''}
              onChange={handleAddressLine1Change}
              disabled={isUpdating}
              placeholder={t('notEntered')}
              data-testid="addressLineInput"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label={t('city')}
              value={city?.trim() || ''}
              onChange={handleCityChange}
              disabled={isUpdating}
              placeholder={t('notEntered')}
              data-testid="cityInput"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label={t('stateProvince')}
              value={provinceState?.trim() || ''}
              onChange={handleProvinceStateChange}
              disabled={isUpdating}
              placeholder={t('notEntered')}
              data-testid="stateProvinceInput"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              label={t('zipPostalCode')}
              value={postalZipCode?.trim() || ''}
              onChange={handlePostalZipCodeChange}
              disabled={isUpdating}
              placeholder={t('notEntered')}
              data-testid="zipPostalCodeInput"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              label={t('country')}
              value={countryCode}
              items={Object.keys(CountryCode).map((countryCode) => ({
                id: countryCode,
                name: t(CountryCode[countryCode], { ns: 'CountryCode' }),
              }))}
              onChange={(e) => setCountry(e.target?.value as CountryCode)}
              disabled={isUpdating}
              data-testid="countryInput"
            />
          </Grid>
        </Grid>
      </Modal.Body>
      <Modal.Actions>
        <Button
          variant="outlined"
          rounded
          onClick={onCancel}
          disabled={isUpdating}
          data-testid="cancelButton"
        >
          {t('cancel')}
        </Button>
        <Button
          variant="contained"
          color="primary"
          rounded
          onClick={updateOrganizationAddress}
          disabled={
            isUpdating ||
            !addressLine1?.trim() ||
            !city?.trim() ||
            !provinceState?.trim() ||
            !postalZipCode?.trim()
          }
          data-testid="saveButton"
        >
          {isUpdating ? t('updating') : t('save')}
        </Button>
      </Modal.Actions>
    </>
  );
}
