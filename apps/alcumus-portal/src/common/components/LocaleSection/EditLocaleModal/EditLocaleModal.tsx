import { Button, Modal, Select } from '@alcumus/components';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
import { TFunction } from 'i18next';
import { UserProfile } from '../../../types';
import { loadTimezones } from './loadTimezones';
import {
  getLanguageNameFromCode,
  getRegionNameFromCode,
} from '../../../../lib/utils/localeUtils';

export interface EditLocaleModalProps {
  t: TFunction;
  location?: string;
  locale?: string;
  timezone?: string;
  isUpdatingProfile?: boolean;
  updateProfile: (profile: Partial<UserProfile>) => void;
  profileUpdated?: boolean;
  resetProfileUpdateStatus: () => void;
  onClose: () => void;
}

function offsetToHours(offsetInMinutes: number) {
  const hours = Math.round(offsetInMinutes / 60).toString();
  const minutes = Math.abs(Math.round(offsetInMinutes % 60))
    .toString()
    .padStart(2, '0');
  return `${hours}:${minutes}`;
}

const useStyles = makeStyles({
  body: {
    '& > *': {
      marginTop: '24px',
    },
  },
});

export function EditLocaleModal({
  t,
  locale,
  location,
  timezone,
  isUpdatingProfile,
  updateProfile,
  profileUpdated,
  resetProfileUpdateStatus,
  onClose,
}: EditLocaleModalProps) {
  const classes = useStyles();
  const [selectedCountry, setSelectedCountry] = useState(location);
  const [selectedLocale, setSelectedLocale] = useState(locale);
  const [selectedTimezone, setSelectedTimezone] = useState(timezone);
  const [timezoneOptions, setTimezoneOptions] = useState<
    { id: string; name: string }[]
  >([]);

  useEffect(() => {
    if (profileUpdated) {
      resetProfileUpdateStatus();
      onClose();
    }
  }, [profileUpdated]);

  useEffect(() => {
    loadTimezones().then((timezones) => {
      setTimezoneOptions(
        timezones
          .map((timezone) => ({
            id: timezone.name,
            name: `${timezone.alternativeName} - ${
              timezone.name
            } - (${offsetToHours(timezone.currentTimeOffsetInMinutes)})`,
          }))
          .sort((a, b) => a.name.localeCompare(b.name))
      );
    });
  }, []);

  const handleSave = () => {
    updateProfile({
      location: selectedCountry,
      locale: selectedLocale,
      timezone: selectedTimezone,
    });
  };

  const countryOptions = ['GB', 'US', 'CA', 'NZ'].map((code) => ({
    id: code,
    name: getRegionNameFromCode(code),
  }));

  const localeOptions = ['en'].map((code) => ({
    id: code,
    name: getLanguageNameFromCode(code),
  }));

  return (
    <React.Fragment>
      <Modal.Body className={classes.body}>
        <Select
          label={t('localeSection.country')}
          items={countryOptions}
          value={selectedCountry}
          onChange={(event) => setSelectedCountry(event.target.value as string)}
          data-testid="preferredCountry"
        />
        <Select
          label={t('localeSection.language')}
          items={localeOptions}
          value={selectedLocale}
          onChange={(event) => setSelectedLocale(event.target.value as string)}
          data-testid="preferredLanguage"
        />

        <Select
          label={t('localeSection.timezone')}
          items={timezoneOptions}
          value={selectedTimezone}
          onChange={(event) =>
            setSelectedTimezone(event.target.value as string)
          }
          data-testid="preferredTimezone"
        />
      </Modal.Body>
      <Modal.Actions>
        <Button
          variant="outlined"
          rounded
          onClick={onClose}
          data-testid="cancelEditLocaleButton"
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          rounded
          onClick={handleSave}
          disabled={isUpdatingProfile}
          data-testid="updateLocaleButton"
        >
          {isUpdatingProfile ? 'Updating...' : 'Update'}
        </Button>
      </Modal.Actions>
    </React.Fragment>
  );
}
