import React from 'react';
import WithTFunctionAsProp from '../../types/WithTFunctionAsProp';
import { ActionPage } from '@alcumus/components';

export default function GenericError({ t }: WithTFunctionAsProp) {
  return (
    <ActionPage
      imgSrc="/images/bench_with_safety_cap.svg"
      imgAlt={t('imgAlt')}
      pageTitle={t('header')}
      header={t('header')}
      body={t('bodyText')}
    />
  );
}
