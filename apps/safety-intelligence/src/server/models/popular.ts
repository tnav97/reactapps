import { RecentlyViewedDto } from '../../dtos/RecentlyViewedDto';
import { ReportDto } from '../../dtos/reportDto';
import { ReportElementTypes } from '../../domain/reportElementTypes';
import { internalAxios } from './internalAxios';

export const getPopularByType = async (
  reportType: ReportElementTypes
): Promise<RecentlyViewedDto[]> => {
  const { data } = await internalAxios.get(`/api/popular/${reportType}`);

  return data;
};

export const getPopularById = async (
  reportType: ReportElementTypes,
  reportId: string[]
): Promise<RecentlyViewedDto[]> => {
  const response: RecentlyViewedDto[] = await internalAxios.post(
    `/api/popular/${reportType}`,
    {
      body: {
        reportId,
      },
    }
  );

  return response;
};

export const syncReportPopularityForCurrentOrganization = async <
  T extends ReportDto[]
>(
  reportType: ReportElementTypes,
  reports: T,
  popularReport?: RecentlyViewedDto[]
): Promise<T> => {
  const reportIds = reports.map((report) => report.id.toString());
  if (!popularReport || popularReport.length < 1) {
    popularReport = await getPopularById(reportType, reportIds);
  }
  return mapReportPopularity(reports, popularReport);
};

export const mapReportPopularity = <T extends ReportDto[]>(
  reports: T,
  popular: RecentlyViewedDto[]
): T => {
  const orgWideViewCount = popular
    .map((report) => report.viewCount)
    .reduce((prev, next) => prev + next);
  reports.forEach((report) => {
    report.popularity =
      ((popular.find((recent) => recent.reportId === report.id.toString())
        ?.viewCount ?? 0) /
        orgWideViewCount) *
      100.0;
  });

  return reports;
};
