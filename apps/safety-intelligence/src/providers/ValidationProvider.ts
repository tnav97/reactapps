import {
  getFolderChildrenByName,
  getFolderDashboardsFor,
} from '../server/models/folder';

export const verifyFolderNameUniqueIn = async (
  folderName: string,
  parentFolderId: string
): Promise<boolean> => {
  const duplicateFolder = await getFolderChildrenByName(
    parentFolderId,
    folderName
  );
  return !duplicateFolder;
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
