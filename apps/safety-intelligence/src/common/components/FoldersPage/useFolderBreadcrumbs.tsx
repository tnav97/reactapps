import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getFolderAncestors } from '../../../server/models/folder';
import { FolderDto } from '../../../dtos/folderDto';
import { FolderNameDto } from '../../../dtos/folderNameDto';
import ReportFoldersRoute from '../../../routes/FoldersRoute';
import {
  rootFolderId,
  embedUserFolderId,
  embedGroupFolderId,
} from '../../constants/folderId';
import _ from 'lodash';
import { Route } from '../shared/PanelSection';

type Props = {
  currentFolder?: FolderNameDto | undefined;
};

const useFolderBreadcrumbs = ({
  currentFolder,
}: Props): [boolean, Route[] | undefined] => {
  const isMounted = useRef(true);
  const [isFetchingAncestors, setIsFetchingAncestors] = useState(true);
  const [folderAncestors, setFolderAncestors] = useState<
    FolderNameDto[] | undefined
  >(undefined);

  const { t } = useTranslation();

  const handleErrors = () => {
    return [false, null];
  };
  const getFolderAncestorsForBreadcrumbs = useCallback(() => {
    if (!currentFolder) return updateFolderAncestors(undefined);
    setFolderAncestors(undefined);
    setIsFetchingAncestors(true);

    getFolderAncestors(currentFolder.id)
      .then(updateFolderAncestors)
      .catch(() => handleErrors);
  }, [currentFolder]);

  const updateFolderAncestors = (res?: FolderDto[]) => {
    if (isMounted.current) {
      setFolderAncestors(res?.length ? res : undefined);
      setIsFetchingAncestors(false);
    }
  };

  const getFolderBreadcrumbs = (): Route[] | undefined => {
    const routes = folderAncestors
      ?.filter((x) => x.id !== embedUserFolderId)
      .map((x): Route => {
        if (x.id === rootFolderId || x.id === embedGroupFolderId) {
          return {
            displayName: `${t('folderHeader')}`,
            path: `${ReportFoldersRoute.path}`,
          };
        }

        if (x.isPersonal === true) {
          return {
            displayName: `${x.name}'s ${t('folder')}`,
            path: `${ReportFoldersRoute.path}/${x.id}`,
          };
        }

        return {
          displayName: x.friendlyName,
          path: `${ReportFoldersRoute.path}/${x.id}`,
        };
      });

    if (currentFolder?.isPersonal)
      routes?.push({
        displayName: `${currentFolder?.friendlyName}'s ${t('folder')}`,
        path: '',
      });
    else if (currentFolder?.name)
      routes?.push({ displayName: currentFolder?.friendlyName, path: '' });

    if (routes && routes.length > 3) {
      const shortListOfRoutes = _.takeRight(routes, 3);
      shortListOfRoutes.unshift({
        displayName: '...',
        path: routes[0].path,
      });
      return shortListOfRoutes;
    }
    return routes;
  };

  useEffect(() => {
    isMounted.current = true;
    getFolderAncestorsForBreadcrumbs();
    return () => {
      isMounted.current = false;
    };
  }, [getFolderAncestorsForBreadcrumbs]);

  return [isFetchingAncestors, getFolderBreadcrumbs()];
};

export default useFolderBreadcrumbs;
