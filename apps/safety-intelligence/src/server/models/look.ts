/* eslint-disable dot-notation */
import { LookDto, LookQueryDto } from '../../dtos/lookDto';
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
} from './folder';
import { internalAxios } from './internalAxios';
import { LookFilter } from '../../dtos/lookFilter';
import { queryToLookFilterMapper } from '../../mappers/queryToLookFilterMapper';
import { QueryDto } from '../../dtos/queryDto';
import { syncUser } from './content';

export const searchLooksWithSyncUserAndRecentView = async (
  searchOptions: Record<string, string>
): Promise<LookDto[]> => {
  return await searchLooks(searchOptions);
};

export const searchLooks = async (
  searchOptions: Record<string, string>
): Promise<LookDto[]> => {
  searchOptions.fields = LookDto.QUERY_FIELDS;

  let { data } = await internalAxios.post('/api/look/search', {
    searchOptions,
  });
  data = data.map((look) => new LookDto(look));

  const folderIds: number[] | undefined = await filterListofFolderIds(
    getUniqueListOfReportFolderIds(data)
  );
  const result = data.filter((reports) =>
    folderIds?.includes(reports.folder.id)
  );

  return result;
};

export const searchLooksAndSync = async (
  searchOptions: Record<string, string>
): Promise<LookDto[]> => {
  return await syncUser(
    await syncViewCountAndDate(
      ReportElementTypes.Look,
      await searchLooks(searchOptions)
    )
  );
};

export const searchRecentlyViewedLook = async (): Promise<LookDto[]> => {
  const recentlyViewedReports = await getRecent(ReportElementTypes.Look);
  if (recentlyViewedReports.length) {
    const recentlyViewedLooks = await searchLooks({
      id: recentlyViewedReports
        .map((recent: RecentlyViewedDto) => recent.reportId)
        .join(','),
    });

    return await syncUser(
      mapReportViewCountAndDate(recentlyViewedLooks, recentlyViewedReports)
    );
  }
  return [];
};

export const getPopularLooksForCurrentOrganization = async (): Promise<
  LookDto[]
> => {
  const popularReports = await getPopularByType(ReportElementTypes.Look);
  if (popularReports.length) {
    const popularLooks = await searchLooksAndSync({
      id: popularReports
        .map((recent: RecentlyViewedDto) => recent.reportId)
        .join(','),
    });

    return await syncUser(
      await syncReportPopularityForCurrentOrganization(
        ReportElementTypes.Look,
        popularLooks,
        popularReports
      )
    );
  }
  return [];
};

export const getEmbedUriForLook = async (lookId: string): Promise<string> => {
  const { data } = await internalAxios.get(`/api/look/embed/${lookId}`);

  return data.uri;
};

export const getSiteFilterForLook = async (
  lookId?: string
): Promise<LookFilter | undefined> => {
  const lookFilters = await getAllLookFilters(lookId);
  return lookFilters.length === 0
    ? undefined
    : lookFilters.find(
        (filter) =>
          (filter.name.toLowerCase() === 'site' ||
            filter.name.toLowerCase() === 'sites.id') &&
          filter.dimension === 'sites.id'
      );
};

export const getAllLookFilters = async (
  lookId?: string
): Promise<LookFilter[]> => {
  if (!lookId) {
    return [];
  }

  const { data: lookQueryDto } = await internalAxios.get(`/api/look/${lookId}`);
  if (lookQueryDto) {
    return queryToLookFilterMapper(
      new LookQueryDto({
        id: lookQueryDto.id,
        query: new QueryDto({
          id: lookQueryDto.query['id'],
          model: lookQueryDto.query['model'],
          view: lookQueryDto.query['view'],
          fields: lookQueryDto.query['fields'],
          filters: lookQueryDto.query['filters'],
          filterConfig: lookQueryDto.query['filter_config'],
          filterExpression: lookQueryDto.query['filter_expression'],
          slug: lookQueryDto.query['slug'],
        }),
      })
    );
  }
  return [];
};

export const createLook = async (
  title: string,
  folderId: string,
  modelName?: string,
  dataSource?: string
): Promise<LookDto> => {
  const { data } = await internalAxios.post('/api/look/', {
    title: title,
    folderId: folderId,
    model: modelName,
    view: dataSource,
  });
  return data;
};
