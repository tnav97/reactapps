import { useCallback, useEffect, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { ReportElementTypes } from '../../../domain/reportElementTypes';
import { ReportListItemProps } from '../../../domain/reportListItemProps';
import { FolderDto } from '../../../dtos/folderDto';
import FoldersRoute from '../../../routes/FoldersRoute';
import ReportsRoute from '../../../routes/ReportsRoute';
import {
  getFolderChildrenSummaries,
  getFolderDashboardsFor,
  getFolderFor,
  getFolderLooksFor,
} from '../../../server/models/folder';
import { recordCountTableState } from '../shared/ReportViewToggle';
type Props = {
  folderId: number;
  handleErrorsCallback: (err) => void;
};

const useCurrentFolder = ({
  folderId,
  handleErrorsCallback,
}: Props): [
  boolean,
  FolderDto | undefined,
  ReportListItemProps[],
  ReportListItemProps[],
  ReportListItemProps[]
] => {
  const isMounted = useRef(true);
  const [isFetchingFolder, setIsFetchingFolder] = useState(true);
  const [currentFolder, setCurrentFolder] = useState<FolderDto | undefined>(
    undefined
  );
  const [folders, setFolders] = useState<ReportListItemProps[]>([]);
  const [dashboards, setDashboards] = useState<ReportListItemProps[]>([]);
  const [looks, setLooks] = useState<ReportListItemProps[]>([]);
  const setCount = useSetRecoilState(recordCountTableState);

  const updateCurrentFolder = async (res?: FolderDto) => {
    if (isMounted.current) {
      try {
        const [folders, dashboards, looks] = await Promise.all([
          getFolderChildrenSummaries({ page: 1, perPage: 30 }, folderId),
          res?.dashboards.length ? getFolderDashboardsFor(folderId) : [],
          res?.looks.length ? getFolderLooksFor(folderId) : [],
        ]);
        setFolders(
          folders?.map((folder): ReportListItemProps => {
            return new ReportListItemProps({
              ...folder,
              basePath: `${FoldersRoute.path}/${folder.id}`,
              elementType: ReportElementTypes.Folder,
              dashboards: folder.dashboards?.length,
              looks: folder.looks?.length,
              createdBy: folder.createdBy,
              folder: folder.name,
              folderId: folder.id,
            });
          }) ?? []
        );
        setDashboards(
          dashboards?.map((dashboard): ReportListItemProps => {
            return new ReportListItemProps({
              ...dashboard,
              elementType: ReportElementTypes.Dashboard,
              basePath: `${ReportsRoute.path}/${dashboard.folder.id}?dashboardId=${dashboard.id}`,
              dashboards: 0,
              looks: 0,
              createdBy: dashboard.userName,
              name: dashboard.title,
              folder: dashboard.folder.name,
              folderId: dashboard.folder.id,
            });
          }) ?? []
        );
        setLooks(
          looks?.map((look): ReportListItemProps => {
            return new ReportListItemProps({
              ...look,
              elementType: ReportElementTypes.Look,
              basePath: `${ReportsRoute.path}/${look.folder.id}?lookId=${look.id}`,
              dashboards: 0,
              looks: 0,
              createdBy: look.userName,
              name: look.title,
              folder: look.folder.name,
              folderId: look.folder.id,
            });
          }) ?? []
        );

        setCurrentFolder(res);
        setIsFetchingFolder(false);
      } catch (err) {
        handleErrorsCallback(err);
      }
    }
  };

  const getCurrentFolder = useCallback(() => {
    setIsFetchingFolder(true);
    setCount(0);
    getFolderFor(folderId)
      .then(updateCurrentFolder)
      .catch(handleErrorsCallback);
  }, [folderId]);

  useEffect(() => {
    isMounted.current = true;
    getCurrentFolder();
    return () => {
      isMounted.current = false;
    };
  }, [getCurrentFolder]);

  return [isFetchingFolder, currentFolder, folders, dashboards, looks];
};

export default useCurrentFolder;
