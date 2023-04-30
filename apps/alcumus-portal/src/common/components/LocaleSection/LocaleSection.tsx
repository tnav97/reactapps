import React, { useState } from 'react';
import MyAccountSection from '../MyAccountSection';
import { TFunction } from 'i18next';
import { Modal, Text } from '@alcumus/components';
import { makeStyles } from '@mui/styles';
import EditLocaleModal from './EditLocaleModal';
import {
  getLanguageNameFromCode,
  getRegionNameFromCode,
} from '../../../lib/utils/localeUtils';

const useStyles = makeStyles({
  setting: {
    marginTop: '28px',
    '& > *': {
      marginTop: '8px',
    },
  },
});

export interface LocaleSectionProps {
  t: TFunction;
  className?: string;
  location?: string;
  locale?: string;
  timezone?: string;
}

export function LocaleSection({
  t,
  locale,
  location,
  timezone,
  className,
}: LocaleSectionProps) {
  const classes = useStyles();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <MyAccountSection
      className={className}
      header={t('localeSection.header')}
      subHeader={t('localeSection.subtitle')}
      editable
      onEdit={() => setIsEditModalOpen(true)}
      data-testid="editLocaleButton"
    >
      <div className={classes.setting}>
        <Text as="small">{t('localeSection.country')}</Text>
        <Text as="h6" data-testid="country">
          {(location && getRegionNameFromCode(location)) || 'N/A'}
        </Text>
      </div>
      <div className={classes.setting}>
        <Text as="small">{t('localeSection.language')}</Text>
        <Text as="h6" data-testid="language">
          {(locale && getLanguageNameFromCode(locale)) || 'N/A'}
        </Text>
      </div>
      <div className={classes.setting}>
        <Text as="small">{t('localeSection.timezone')}</Text>
        <Text as="h6" data-testid="timezone">
          {timezone || 'N/A'}
        </Text>
      </div>

      <Modal
        open={isEditModalOpen}
        title={t('localeSection.editModalTitle')}
        onClose={() => setIsEditModalOpen(false)}
        size="sm"
      >
        <EditLocaleModal onClose={() => setIsEditModalOpen(false)} />
      </Modal>
    </MyAccountSection>
  );
}
