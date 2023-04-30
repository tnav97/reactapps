import React from 'react';
import { ReportElementTypes } from '../../../domain/reportElementTypes';
import { useRecoilState } from 'recoil';
import { reportTypeSwitchState } from '../shared/ReportTypeToggle';
import { EmptyStateBasePage } from './EmptyStateBasePage';
interface Props {
  dashboardText?: string;
  lookText?: string;
}

export default function EmptyState({ dashboardText, lookText }: Props) {
  const [reportType] = useRecoilState(reportTypeSwitchState);
  const body =
    reportType === ReportElementTypes.Dashboard ? dashboardText : lookText;

  return <EmptyStateBasePage body={body} imgSrc="/images/empty-state.svg" />;
}
