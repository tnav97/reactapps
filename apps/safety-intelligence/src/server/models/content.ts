import { BaseUserDto, IBaseUserDto } from '../../dtos/baseUserDto';
import { ContentFavoriteDto } from '../../dtos/ContentFavoriteDto';
import { FolderDto } from '../../dtos/folderDto';
import { ReportDto } from '../../dtos/reportDto';
import { internalAxios } from './internalAxios';

export const getContentThumbnail = async (
  contentId: number,
  type?: string
): Promise<string> => {
  if (!type) return '';

  const { data } = await internalAxios.get(`/api/content/thumbnail`, {
    params: {
      type,
      contentId,
    },
  });
  return data;
};

export const createContentFavorite = async (
  contentFavorite?: ContentFavoriteDto
): Promise<ContentFavoriteDto | undefined> => {
  if (typeof contentFavorite === 'undefined') {
    return;
  }
  const { data } = await internalAxios.post('/api/content/favorite', {
    contentFavorite,
  });

  return new ContentFavoriteDto(data);
};

export const deleteContentFavorite = async (
  contentFavoriteId: number
): Promise<boolean> => {
  const response = await internalAxios.delete(
    `/api/content/favorite/${contentFavoriteId}`
  );

  return response.status === 204;
};

export const syncUser = async <T extends ReportDto>(
  reports: T[]
): Promise<T[]> => {
  if (reports.length) {
    return await syncReportUsers(reports);
  }
  return [];
};

export const syncUserForFolder = async (
  folders: FolderDto[]
): Promise<FolderDto[]> => {
  if (folders.length) {
    const userIds = folders
      .map((report) => report.creatorId)
      .filter((value, index, self) => self.indexOf(value) === index);
    const reportUsers = await getUsersForReports(userIds);
    folders.forEach((folder: FolderDto) => {
      const user = reportUsers.find((x) => x.id === folder.creatorId);
      folder.createdBy = `${user?.displayName ?? ''}`;
    });
    return folders;
  }
  return [];
};

const syncReportUsers = async <T extends ReportDto>(
  reports: T[]
): Promise<T[]> => {
  const userIds = reports
    .map((report) => report.userId)
    .filter((value, index, self) => self.indexOf(value) === index);
  const reportUsers = await getUsersForReports(userIds);
  return mapReportUser(reports, reportUsers);
};

const getUsersForReports = async (
  userIds: number[]
): Promise<IBaseUserDto[]> => {
  const { data } = await internalAxios.post(`/api/content/users`, userIds);
  return data.map((user) => new BaseUserDto(user));
};

const mapReportUser = <T extends ReportDto>(
  reports: T[],
  reportUsers: IBaseUserDto[]
): T[] => {
  reports.forEach((report) => {
    const user = reportUsers.find((x) => x.id === report.userId);
    report.userName = `${user?.displayName ?? ''}`;
  });
  return reports;
};
