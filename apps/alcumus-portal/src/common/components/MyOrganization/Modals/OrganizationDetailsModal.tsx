import React, { ChangeEventHandler, useCallback, useState } from 'react';
import { Button, Input, Modal, Select, Text } from '@alcumus/components';
import { TFunction } from 'i18next';
import {
  LanguageCode,
  MyOrganizationDetails,
  OrganizationSizeDesignation,
  EditableOrganizationDetails,
} from '../../../types';
import { Grid } from '@mui/material';

interface OrganizationDetailsModalProps {
  onCancel: () => void;
  t: TFunction;
  organizationDetails?: MyOrganizationDetails;
  isUpdating: boolean;
  onUpdate: (newOrganizationDetails: EditableOrganizationDetails) => void;
  error?: string;
}

interface OrganizationName {
  name: string;
  error?: string;
}
interface OrganizationWebsite {
  website: string;
  error?: string;
}

export default function OrganizationDetailsModal({
  onCancel,
  t,
  organizationDetails,
  isUpdating,
  onUpdate,
  error = undefined,
}: OrganizationDetailsModalProps) {
  const validWebsiteRegex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const [organizationName, setOrganizationName] = useState<OrganizationName>({
    name: (organizationDetails?.tenantName as string) || '',
  });
  const [industryType, setIndustryType] = useState(
    organizationDetails?.organizationIndustryType as string
  );

  const [organizationSize, setOrganizationSize] =
    useState<OrganizationSizeDesignation>(
      organizationDetails?.organizationSizeDesignation ??
        OrganizationSizeDesignation.SMB
    );
  const [organizationWebsite, setWebsiteChange] = useState<OrganizationWebsite>(
    {
      website: (organizationDetails?.organizationWebsite as string) || '',
    }
  );
  const [language, setLanguage] = useState<LanguageCode>(
    organizationDetails?.defaultLanguageCode ?? LanguageCode.EN
  );

  const handleOrganizationNameChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { value } = target;
    setOrganizationName({
      name: value.trim(),
      error:
        value.trim().length < 1
          ? t('minCharacterLimitForOrganizatioName')
          : undefined,
    });
  };

  const handleWebsiteChange: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { value } = target;
    setWebsiteChange({
      website: value.trim(),
      error:
        value.trim().length > 0 && !value.match(validWebsiteRegex)
          ? t('invalidWebsite')
          : undefined,
    });
  };
  const updateOrganizationDetails = useCallback(() => {
    onUpdate({
      tenantName: organizationName.name,
      organizationIndustryType: industryType,
      organizationSizeDesignation: organizationSize,
      organizationWebsite: organizationWebsite?.website?.length
        ? organizationWebsite.website
        : null,
      defaultLanguageCode: language as LanguageCode,
    });
  }, [
    organizationName.name,
    industryType,
    organizationSize,
    organizationWebsite.website,
    language,
  ]);

  return (
    <>
      <Modal.Body>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Input
              label={t('organizationName')}
              value={organizationName.name}
              onChange={handleOrganizationNameChange}
              disabled={isUpdating}
              state={organizationName?.error ? 'error' : 'default'}
              hint={organizationName?.error}
              data-testid="organizationNameInput"
              minLength={1}
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              label={t('industryType')}
              value={industryType}
              // todo ARC-623: add industry type enum and enable
              items={[]}
              onChange={(e) => setIndustryType(e.target?.value as string)}
              disabled
              data-testid="industryTypeSelect"
            ></Select>
          </Grid>
          <Grid item xs={12}>
            <Select
              label={t('organizationSize')}
              value={organizationSize}
              items={Object.keys(OrganizationSizeDesignation).map(
                (sizeDesignation) => ({
                  id: sizeDesignation,
                  name: t(OrganizationSizeDesignation[sizeDesignation]),
                })
              )}
              onChange={(e) =>
                setOrganizationSize(
                  e.target?.value as OrganizationSizeDesignation
                )
              }
              disabled={isUpdating}
              data-testid="organizationSizeSelect"
            ></Select>
          </Grid>
          <Grid item xs={12}>
            <Input
              label={t('website')}
              value={organizationWebsite.website}
              onChange={handleWebsiteChange}
              disabled={isUpdating}
              placeholder={t('notEntered')}
              data-testid="websiteInput"
              state={organizationWebsite?.error ? 'error' : 'default'}
              hint={organizationWebsite?.error}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              label={t('language')}
              value={language}
              items={Object.keys(LanguageCode).map((languageCode) => ({
                id: languageCode,
                name: t(LanguageCode[languageCode], { ns: 'LanguageCode' }),
              }))}
              onChange={(e) => setLanguage(e.target?.value as LanguageCode)}
              disabled={isUpdating}
              data-testid="languageSelect"
            ></Select>
          </Grid>
        </Grid>
        {!!error?.length && <Text color="error">{error}</Text>}
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
          onClick={updateOrganizationDetails}
          disabled={
            isUpdating ||
            !!organizationName.error ||
            !!organizationWebsite.error ||
            organizationName.name.length < 1
          }
          data-testid="saveButton"
        >
          {isUpdating ? t('updating') : t('save')}
        </Button>
      </Modal.Actions>
    </>
  );
}
