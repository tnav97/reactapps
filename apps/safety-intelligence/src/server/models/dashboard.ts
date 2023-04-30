import { DashboardDto } from '../../dtos/dashboardDto';
import {
  getRecent,
  mapReportViewCountAndDate,
  syncViewCountAndDate,
} from './recent';
import { ReportElementTypes } from '../../domain/reportElementTypes';
import { RecentlyViewedDto } from '../../dtos/RecentlyViewedDto';
import {
  getPopularByType,
  syncReportPopularityForCurrentOrganization,
} from './popular';
import {
  getUniqueListOfReportFolderIds,
  filterListofFolderIds,
  getFolderDashboardsFor,
} from './folder';
import { internalAxios } from './internalAxios';
import { DashboardFilter } from '../../dtos/dashboardFilter';
import { syncUser } from './content';

export const searchDashboards = async (
  searchOptions: Record<string, string>
): Promise<DashboardDto[]> => {
  searchOptions.fields = DashboardDto.QUERY_FIELDS;
  let { data } = await internalAxios.post('/api/dashboard/search', {
    searchOptions,
  });
  data = data.map((dashboard) => new DashboardDto(dashboard));
  const folderIds: number[] | undefined = await filterListofFolderIds(
    getUniqueListOfReportFolderIds(data)
  );

  const result = data.filter((reports) =>
    folderIds?.includes(reports.folder.id)
  );

  return result;
};

export const searchDashboardsAndSync = async (
  searchOptions: Record<string, string>
): Promise<DashboardDto[]> => {
  return await syncUser(
    await syncViewCountAndDate(
      ReportElementTypes.Dashboard,
      await searchDashboards(searchOptions)
    )
  );
};

export const searchRecentlyViewedDashboard = async (): Promise<
  DashboardDto[]
> => {
  const recentlyViewedReports = await getRecent(ReportElementTypes.Dashboard);
  if (recentlyViewedReports.length) {
    const recentlyViewedDashboards = await searchDashboards({
      id: recentlyViewedReports
        .map((recent: RecentlyViewedDto) => recent.reportId)
        .join(','),
    });

    return await syncUser(
      mapReportViewCountAndDate(recentlyViewedDashboards, recentlyViewedReports)
    );
  }
  return [];
};

export const getPopularDashboardsForCurrentOrganization = async (): Promise<
  DashboardDto[]
> => {
  const popularReports = await getPopularByType(ReportElementTypes.Dashboard);
  if (popularReports.length) {
    const popularDashboards = await searchDashboardsAndSync({
      id: popularReports
        .map((recent: RecentlyViewedDto) => recent.reportId)
        .join(','),
    });

    return await syncReportPopularityForCurrentOrganization(
      ReportElementTypes.Dashboard,
      popularDashboards,
      popularReports
    );
  }
  return [];
};

export const saveDashboardAs = async (
  newDashboardTitle: string,
  spaceId: string,
  dashboardId: string,
  changedFilters: { [key: string]: string }
): Promise<boolean> => {
  const saveDashboardDto: Record<string, unknown> = {
    dashboardId: dashboardId,
    newTitle: newDashboardTitle,
    spaceId: spaceId,
    customFilters: Object.keys(changedFilters).map((key) => {
      if (key.trim().toLowerCase() === 'site')
        return Object.assign({ Name: key, DefaultValue: '' });
      return Object.assign({ Name: key, DefaultValue: changedFilters[key] });
    }),
  };

  const response = await internalAxios.post('/api/dashboard/save', {
    saveDashboardDto,
  });
  return response.status === 200;
};

export const getSiteFilterForDashboard = async (
  dashboardId?: string
): Promise<DashboardFilter | undefined> => {
  const dashboardFilters = await getAllDashboardFilters(dashboardId);
  return dashboardFilters.length === 0
    ? undefined
    : dashboardFilters.find(
        (filter) =>
          filter.name.toLowerCase() === 'site' &&
          filter.type === 'field_filter' &&
          filter.uiConfig?.type !== 'range_slider' &&
          filter.uiConfig?.type !== 'slider' &&
          filter.dimension === 'sites.id'
      );
};

export const getAllDashboardFilters = async (
  dashboardId?: string
): Promise<DashboardFilter[]> => {
  if (dashboardId === undefined) {
    return [];
  }
  const { data } = await internalAxios.get(
    `/api/dashboard/filters/${dashboardId}`
  );
  return data.map((filter: any) => new DashboardFilter(filter));
};

export const getEmbedUriForDashboard = async (
  dashboardId: string,
  selectedSiteIds?: number[]
): Promise<string> => {
  const siteFilterString =
    selectedSiteIds && selectedSiteIds.length > 0
      ? `Site=${selectedSiteIds}`
      : '';

  const { data } = await internalAxios.get(
    `/api/dashboard/embed/${dashboardId}`,
    {
      params: {
        filterString: siteFilterString,
      },
    }
  );

  return data.uri;
};

export const verifyDashboardNameUniqueIn = async (
  dashboardName: string,
  parentFolderId: string
): Promise<boolean> => {
  const folderDashboards = await getFolderDashboardsFor(
    parseInt(parentFolderId)
  );
  const duplicateDashboard = folderDashboards?.find(
    (dashboard) =>
      dashboard.title.trim().toLowerCase() ===
      dashboardName.trim().toLocaleLowerCase()
  );
  return !duplicateDashboard;
};

export const moveDashboard = async (
  dashboardId: string,
  folderId: string,
  dashboardTitle: string
): Promise<boolean> => {
  return await internalAxios.post(`/api/dashboard/move`, {
    dashboardId: dashboardId,
    folderId: folderId,
    dashboardTitle: dashboardTitle,
  });
};

export const createDashboard = async (
  title: string,
  folderId: string
): Promise<DashboardDto> => {
  const { data } = await internalAxios.post('/api/dashboard/', {
    title: title,
    spaceId: folderId,
    preferredViewer: 'dashboards-next',
  });
  return new DashboardDto(data);
};
