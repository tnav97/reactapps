import React from 'react';
import { Fade } from '@mui/material';
import { Trans } from 'react-i18next';
import { Dropdown } from '../../../Dropdown';
import { TFunction } from 'i18next';

export interface DropdownWithFadeProps {
  fadeIn: boolean;
  questionsTranslationKey: string;
  onSelect: (value: string) => void;
  dropdownValue?: string;
  options: Array<string>;
  t: TFunction;
  withCustomValue?: boolean;
  'data-testid': string;
  customValueLabel?: string;
}

export default function SentenceInput({
  fadeIn,
  questionsTranslationKey,
  customValueLabel,
  onSelect,
  dropdownValue,
  options,
  withCustomValue = false,
  t,
  'data-testid': dataTestId,
}: DropdownWithFadeProps) {
  return (
    <Fade in={fadeIn} timeout={{ enter: 800 }}>
      <span>
        <Trans i18nKey={questionsTranslationKey} t={t}>
          {/* Keep space below in order to allow the translation template be applied correctly */}
          {''}
          <Dropdown
            onSelect={onSelect}
            onCustomValue={withCustomValue ? onSelect : undefined}
            value={dropdownValue}
            customValueLabel={customValueLabel}
            options={options}
            data-testid={dataTestId}
          />
        </Trans>
      </span>
    </Fade>
  );
}
