import { RecentlyViewedDto } from '../../dtos/RecentlyViewedDto';
import { ReportElementTypes } from '../../domain/reportElementTypes';
import { ReportDto } from '../../dtos/reportDto';
import { internalAxios } from './internalAxios';

export const getRecent = async (
  reportType: ReportElementTypes
): Promise<RecentlyViewedDto[]> => {
  const { data } = await internalAxios.get(`/api/recent/${reportType}`);

  return data;
};

export const syncViewCountAndDate = async <T extends ReportDto[]>(
  reportType: ReportElementTypes,
  reports: T,
  recentlyViewedReports?: RecentlyViewedDto[]
): Promise<T> => {
  if (!recentlyViewedReports || recentlyViewedReports.length < 1) {
    recentlyViewedReports = await getRecent(reportType);
  }
  if (recentlyViewedReports.length < 1) {
    return reports;
  }

  return mapReportViewCountAndDate(reports, recentlyViewedReports);
};

export const mapReportViewCountAndDate = <T extends ReportDto[]>(
  reports: T,
  recentlyViewedReports: RecentlyViewedDto[]
): T => {
  reports.forEach((report) => {
    const recent = recentlyViewedReports.find(
      (recentReport) => recentReport.reportId === report.id.toString()
    );
    if (recent) {
      report.lastViewedAt = new Date(recent.utcLastModifiedDate);
    }
    report.viewCount = recent?.viewCount ?? 0;
  });

  return reports;
};
