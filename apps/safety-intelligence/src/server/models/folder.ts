import {
  EditFolderDto,
  FolderNameDto,
  PaginationPageDto,
} from '../../dtos/folderNameDto';
import { FolderDto, IFolderDto } from '../../dtos/folderDto';
import { FolderAllowedActionDto } from '../../dtos/folderAllowedActionDto';
import { DashboardDto } from '../../dtos/dashboardDto';
import { LookDto } from '../../dtos/lookDto';
import { internalAxios } from './internalAxios';
import { ReportElementTypes } from '../../domain/reportElementTypes';
import { syncViewCountAndDate } from './recent';
import { syncUser, syncUserForFolder } from './content';

export const getHomePageFolders = async (): Promise<
  FolderDto[] | undefined
> => {
  const systemWideRootFolderId = localStorage.getItem('home_folder_id');
  const applicationRootFolderName = localStorage.getItem(
    'application_root_folder_name'
  );
  const externalGroupId = localStorage.getItem('user_external_group_id');
  if (
    !systemWideRootFolderId ||
    !applicationRootFolderName ||
    !externalGroupId
  ) {
    return;
  }
  const applicationRootFolder = await getFolderChildrenByName(
    systemWideRootFolderId,
    applicationRootFolderName
  );
  const allFolders = await getAllFoldersFor(FolderDto.ROOT_REQUEST_FIELDS);

  const folders = allFolders.filter(
    (x) =>
      (x.parentId === applicationRootFolder?.id ||
        (x.externalId === externalGroupId && x.isEmbed)) &&
      x.isPersonal === false
  );
  return folders;
};

export const getFolderChildrenByName = async (
  folderId: string,
  childFolderName?: string,
  fields?: string
): Promise<FolderNameDto | undefined> => {
  if (!folderId) return;

  const response = await internalAxios.post(
    `/api/folder/${folderId}/children/search`,
    { fields, name: childFolderName },
    {
      params: {
        folderId,
      },
    }
  );
  const {
    id = '',
    name = '',
    parentId = '',
    child_count: childCount = '',
    friendly_name: friendlyName = '',
  } = response.data[0] ?? [];

  return {
    id,
    name,
    parentId,
    childCount,
    friendlyName,
  };
};

export const getAllFoldersFor = async (
  fields?: string
): Promise<FolderDto[]> => {
  const { data } = await internalAxios.get('/api/folder/all', {
    params: {
      fields,
    },
  });

  const response: FolderDto[] = data?.map((folder) => {
    const folderDto = new FolderDto(folder);
    return { ...folderDto, name: folderDto.friendlyName };
  });
  return response;
};

export const getAllEditableFoldersFor = async (): Promise<IFolderDto[]> => {
  const allFolders = await getAllFoldersFor(FolderDto.SUMMARY_REQUEST_FIELDS);
  return allFolders.filter((folder) => folder?.can?.edit_content || false);
};

export const getFolderFor = async (
  folderId?: number
): Promise<FolderDto | undefined> => {
  if (!folderId) return;
  const { data } = await internalAxios.get(`/api/folder/${folderId}`);
  return new FolderDto(data);
};

export const getFolderAncestors = async (
  folderId?: number
): Promise<FolderDto[] | undefined> => {
  if (!folderId) return;
  const applicationRootFolderName = localStorage.getItem(
    'application_root_folder_name'
  );

  const folders = await internalAxios.get(`/api/folder/${folderId}/ancestors`);
  const folderDtos = folders.data
    .map((folder) => new FolderDto(folder))
    .filter(
      (folder: FolderDto) =>
        folder.name.toLowerCase() !== applicationRootFolderName?.toLowerCase()
    );
  return folderDtos;
};

export const getFolderAncestorsNoFilter = async (
  folderId?: number
): Promise<FolderDto[] | undefined> => {
  if (!folderId) return;

  const folders = await internalAxios.get(`/api/folder/${folderId}/ancestors`);
  const folderDtos = folders.data.map((folder) => new FolderDto(folder));
  return folderDtos;
};

export const getFolderChildrenSummaries = async (
  { page, perPage }: PaginationPageDto,
  folderId?: number | undefined
): Promise<FolderDto[] | undefined> => {
  if (!folderId) return;

  const { data } = await internalAxios.get(
    `/api/folder/${folderId}/children/summaries`,
    {
      params: { page, perPage },
    }
  );
  return await syncUserForFolder(
    data?.map((folder): FolderDto => new FolderDto(folder))
  );
};

export const getAllowedAction = async (
  folderId?: number
): Promise<FolderAllowedActionDto | undefined> => {
  if (!folderId) {
    return;
  }

  const { data }: { data: FolderAllowedActionDto } = await internalAxios.get(
    `/api/folder/${folderId}/allowedAction`
  );

  return data;
};

export const getFolderChildrenCountForPaging = async (
  folderId?: number
): Promise<number | undefined> => {
  const { data } = await internalAxios.get(
    `/api/folder/${folderId}/children/count`
  );

  return data.length;
};

export const verifyEditPermissionForCurrentUser = async (
  folderId?: number
): Promise<boolean> => {
  if (!folderId) return false;
  const folder = await getFolderFor(folderId);
  return folder?.can?.edit_content || false;
};

export const getFolderDashboardsFor = async (
  folderId?: number
): Promise<DashboardDto[] | undefined> => {
  if (!folderId) return;

  const { data } = await internalAxios.get(
    `/api/folder/${folderId}/dashboards`
  );
  const dtos = data
    ?.map((dashboard): DashboardDto => {
      return new DashboardDto(dashboard);
    })
    .filter((dashboard: DashboardDto) => dashboard.deletedAt === null);

  return dtos.length
    ? await syncUser(
        await syncViewCountAndDate(ReportElementTypes.Dashboard, dtos)
      )
    : dtos;
};

export const getFolderLooksFor = async (
  folderId?: number
): Promise<LookDto[] | undefined> => {
  if (!folderId) return;

  const { data } = await internalAxios.get(`/api/folder/${folderId}/looks`);
  const dtos = data
    ?.map((look): LookDto => {
      return new LookDto(look);
    })
    .filter((look: LookDto) => look.deletedAt === null);

  return dtos.length > 0
    ? await syncUser(await syncViewCountAndDate(ReportElementTypes.Look, dtos))
    : dtos;
};

export const createFolder = async (
  folder: EditFolderDto
): Promise<FolderDto | undefined> => {
  if (!folder) return;

  const { data } = await internalAxios.post(`/api/folder`, folder);

  return data;
};

export const updateFolder = async (
  folderId: number,
  folder: EditFolderDto
): Promise<FolderDto | undefined> => {
  if (!folderId || !folder) {
    return;
  }

  const { data } = await internalAxios.patch(`/api/folder/${folderId}`, folder);

  return data;
};

export const deleteFolder = async (
  folderId: number
): Promise<boolean | undefined> => {
  if (!folderId) {
    return;
  }
  const { status } = await internalAxios.delete(`/api/folder/${folderId}`);
  return status === 200;
};

export const getUniqueListOfReportFolderIds = (
  reports: DashboardDto[] | LookDto[]
): number[] => {
  const folderIds: number[] = [];

  reports.forEach((report) => {
    if (!folderIds.includes(report.folder.id)) {
      folderIds.push(report.folder.id);
    }
  });

  return folderIds;
};

export const filterListofFolderIds = async (
  folderIds: number[]
): Promise<number[] | undefined> => {
  try {
    const folderKeepIndex: number[] = [];
    let localStorageNullCheck: string | null =
      localStorage.getItem('group_space_id');
    const orgFolderId: number = parseInt(
      localStorageNullCheck !== null ? localStorageNullCheck : '0'
    );
    localStorageNullCheck = localStorage.getItem('personal_folder_id');
    const personalFolderId: number = parseInt(
      localStorageNullCheck !== null ? localStorageNullCheck : '0'
    );

    localStorageNullCheck = localStorage.getItem('application_root_folder_id');
    const appFolder: number = parseInt(
      localStorageNullCheck !== null ? localStorageNullCheck : '0'
    );

    if (orgFolderId === 0 || personalFolderId === 0 || appFolder === 0) {
      throw new Error('Application context not detected');
    }

    folderKeepIndex.push(orgFolderId);
    folderKeepIndex.push(personalFolderId);

    for (const id of folderIds) {
      if (id !== personalFolderId && id !== orgFolderId) {
        const folderAncestors = await getFolderAncestorsNoFilter(id);

        const filteredAncestors = folderAncestors?.map(
          (ancestors) => ancestors.id
        );
        if (
          filteredAncestors?.includes(appFolder) ||
          filteredAncestors?.includes(personalFolderId) ||
          filteredAncestors?.includes(orgFolderId)
        ) {
          folderKeepIndex.push(id);
        }
      }
    }

    return folderKeepIndex;
  } catch (e) {
    console.error(e);
  }
};

export const verifyFolderNameUniqueIn = async (
  folderName: string,
  parentFolderId: string
): Promise<boolean> => {
  const duplicateFolder = await getFolderChildrenByName(
    parentFolderId,
    folderName
  );
  return duplicateFolder?.name === '';
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

export const verifyLookNameUniqueIn = async (
  lookName: string,
  parentFolderId: string
): Promise<boolean> => {
  const folderLooks = await getFolderLooksFor(parseInt(parentFolderId));
  const duplicateLook = folderLooks?.find(
    (look) =>
      look.title.trim().toLowerCase() === lookName.trim().toLocaleLowerCase()
  );
  return !duplicateLook;
};
