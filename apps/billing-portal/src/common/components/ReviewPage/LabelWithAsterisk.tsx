import React from 'react';
import { StyleVariables } from '@alcumus/components';

export const LabelWithAsterisk = ({ label }: { label: string }) => (
  <>
    {label}{' '}
    <span style={{ color: StyleVariables.colors.text.critical }}>*</span>
  </>
);
