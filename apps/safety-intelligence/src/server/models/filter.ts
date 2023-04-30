/* eslint-disable no-useless-return */
import { ReportElementTypes } from '../../domain/reportElementTypes';
import { IBaseFilter } from '../../dtos/baseFilter';
import { getSiteFilterForLook } from './look';
import { getSiteFilterForDashboard } from './dashboard';

export const getSiteFilterFor = async (
  viewType: string,
  contentId: string
): Promise<IBaseFilter | undefined> => {
  switch (viewType) {
    case ReportElementTypes.Dashboard:
      return getSiteFilterForDashboard(contentId);
    case ReportElementTypes.Look:
      return getSiteFilterForLook(contentId);
    default:
      return;
  }
};
