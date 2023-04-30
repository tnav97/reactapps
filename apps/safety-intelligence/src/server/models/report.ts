import { ReportElementTypes } from '../../domain/reportElementTypes';
import { getEmbedUriForDashboard } from './dashboard';
import { getEmbedUriForLook } from './look';

export const getEmbedReportUri = async (
  embeddedReportId: string,
  reportType: ReportElementTypes,
  selectedSiteIds?: number[]
): Promise<string> => {
  switch (reportType) {
    case ReportElementTypes.Dashboard:
      return await getEmbedUriForDashboard(embeddedReportId, selectedSiteIds);
    case ReportElementTypes.Look:
      return await getEmbedUriForLook(embeddedReportId);
    default:
      return '';
  }
};

export const getFilterUpdatePostMessage = (
  reportType: ReportElementTypes,
  selectedSiteIds?: number[]
): string => {
  switch (reportType) {
    case ReportElementTypes.Dashboard:
      return JSON.stringify({
        type: 'dashboard:filters:update',
        filters: {
          Site: selectedSiteIds?.join(','),
        },
      });
    case ReportElementTypes.Look:
      return JSON.stringify({
        type: 'look:filters:update',
        filters: {
          'sites.id': selectedSiteIds?.join(','),
        },
      });
    default:
      return '';
  }
};

export const getReportRunMessage = (reportType: ReportElementTypes): string => {
  switch (reportType) {
    case ReportElementTypes.Dashboard:
      return JSON.stringify({
        type: 'dashboard:run',
      });
    case ReportElementTypes.Look:
      return JSON.stringify({
        type: 'look:run',
      });
    default:
      return '';
  }
};
