import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { TranslateReady } from '@alcumus/components';
import PanelSection from '../shared/PanelSection';
import { getAllowedAction } from '../../../server/models/folder';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import UpdateFolderModal from './UpdateFolderModal';
import DeleteFolderModal from './DeleteFolderModal';
import { FolderAllowedActionDto } from '../../../dtos/folderAllowedActionDto';
import useFolderBreadcrumbs from './useFolderBreadcrumbs';
import useCurrentFolder from './useCurrentFolder';
import CreateFolderModal from './CreateFolderModal';
import ReportViewToggle, {
  tableTileViewSwitcherState,
  recordCountTableState,
  recordTypeSwitcherState,
  ReportSwitcherTypes,
} from '../shared/ReportViewToggle';
import NavBar from '../NavBar';
import SubFolderTableView from './SubFolderTableView';
import SubFolderTileView from './SubFolderTileView';
import { TableHeader } from '../ReportTable/SortableTableHeader';
import MoveDashboardModal from '../Modals/MoveDashboardModal';
import { ReportListItemProps } from '../../../domain/reportListItemProps';
import CreateDashboardModal from '../Modals/CreateDashboardModal';
import CreateLookModal from '../Modals/CreateLookModal';
import CreateNewButton from '../Button/CreateNewButton';

type Props = {
  folderId: string;
};

export const SubFolderPage: FunctionComponent<RouteComponentProps<Props>> = ({
  match,
}: RouteComponentProps<Props>) => {
  const [errorState, setErrorState] = useState<{
    hasError: boolean;
    redirectUrl: string;
  }>({ hasError: false, redirectUrl: '' });
  const handleErrors = (err) => {
    if (err.response.status === 404) {
      setErrorState({ hasError: true, redirectUrl: '/notfound' });
    } else {
      setErrorState({ hasError: true, redirectUrl: '/error' });
    }
  };

  const folderId = parseInt(match.params.folderId);
  const isMounted = useRef(true);
  const [currentFolderActions, setCurrentFolderActions] = useState<
    FolderAllowedActionDto | undefined
  >();
  const [isFetchingFolder, currentFolder, folders, dashboards, looks] =
    useCurrentFolder({
      folderId: folderId,
      handleErrorsCallback: handleErrors,
    });
  const [showCreate, setShowCreate] = useState<boolean>(false);
  const [toggleView] = useRecoilState(tableTileViewSwitcherState);
  const shouldDisplayEditSettings = currentFolder?.name && showCreate;
  const [, setCount] = useRecoilState(recordCountTableState);
  const [type] = useRecoilState(recordTypeSwitcherState);
  const [data, setData] = useState<ReportListItemProps[]>([
    ...folders,
    ...dashboards,
    ...looks,
  ]);

  const [isFetchingAncestors, folderBreadcrumbs] = useFolderBreadcrumbs({
    currentFolder: currentFolder,
  });

  const { t, i18n } = useTranslation(['SubFolderPage', 'TableHeaders']);
  const headers: TableHeader[] = [
    { id: 'elementType', displayName: t('type', { ns: 'TableHeaders' }) },
    { id: 'name', displayName: t('name', { ns: 'TableHeaders' }) },
    {
      id: 'dashboards',
      displayName: t('dashboards', { ns: 'TableHeaders' }),
      isNumeric: true,
    },
    {
      id: 'looks',
      displayName: t('looks', { ns: 'TableHeaders' }),
      isNumeric: true,
    },
    { id: 'createdBy', displayName: t('owner', { ns: 'TableHeaders' }) },
    {
      id: 'contentFavoriteId',
      displayName: t('favorite', { ns: 'TableHeaders' }),
    },
  ];

  const getCurrentFolderActions = useCallback(() => {
    const updateCurrentFolderActions = (
      res?: FolderAllowedActionDto | undefined
    ) => {
      if (isMounted.current) {
        setCurrentFolderActions(res);
      }
    };

    getAllowedAction(folderId)
      .then(updateCurrentFolderActions)
      .catch((res) => handleErrors(res));
  }, [folderId]);

  useEffect(() => {
    setShowCreate(currentFolder?.can?.edit_content || false);
  }, [currentFolder]);

  useEffect(() => {
    isMounted.current = true;
    getCurrentFolderActions();
    return () => {
      isMounted.current = false;
    };
  }, [getCurrentFolderActions]);

  const switchDataType = async () => {
    switch (type) {
      case ReportSwitcherTypes.All:
        setData([...folders, ...dashboards, ...looks]);
        setCount(folders.length + dashboards.length + looks.length);
        break;
      case ReportSwitcherTypes.Folders:
        setData([...folders]);
        setCount(folders.length);
        break;
      case ReportSwitcherTypes.Dashboards:
        setData([...dashboards]);
        setCount(dashboards.length);
        break;
      case ReportSwitcherTypes.Looks:
        setData([...looks]);
        setCount(looks.length);
        break;
      default:
        setData([...folders, ...dashboards, ...looks]);
        setCount(folders.length + dashboards.length + looks.length);
        break;
    }
  };

  useEffect(() => {
    switchDataType();
  }, [type, folders, looks, dashboards]);

  if (errorState.hasError) {
    return <Redirect to={errorState.redirectUrl} />;
  }

  const getSubtitle = () => {
    if (currentFolder?.isPersonal) return t('personalFolder');
    if (
      `${currentFolder?.parentId}` ===
      localStorage.getItem('application_root_folder_id')
    )
      return t('alcumusLibrary');
    if (
      `${currentFolder?.externalId}` ===
      localStorage.getItem('user_external_group_id')
    )
      return t('orgFolder');
  };
  return (
    <TranslateReady tReady={i18n.isInitialized}>
      <NavBar>
        <PanelSection
          isLoading={isFetchingFolder || isFetchingAncestors}
          panelSettings={
            shouldDisplayEditSettings && <CreateNewButton buttonSize="sm" />
          }
          subTitle={getSubtitle()}
          routes={folderBreadcrumbs}
          enableEdit={currentFolderActions?.canUpdate}
          enableDelete={currentFolderActions?.canDelete}
          currentFolderId={currentFolder?.id}
        >
          <ReportViewToggle />
          <br />
          {folderId && toggleView === 'table' && (
            <SubFolderTableView
              data={data}
              headers={headers}
              showOwner
              showDashboardCount
              showLookCount
              showFavorite
              isLoading={isFetchingFolder || isFetchingAncestors}
              showCreateButton={showCreate}
            />
          )}
          {folderId && toggleView === 'tile' && (
            <SubFolderTileView
              folders={folders}
              dashboards={dashboards}
              looks={looks}
              isLoading={isFetchingFolder || isFetchingAncestors}
              headers={headers.map((header) => header.displayName)}
              showCreateButton={showCreate}
            />
          )}
        </PanelSection>
        {showCreate && (
          <>
            <CreateFolderModal defaultFolderId={currentFolder?.id ?? -1} />
            <CreateDashboardModal defaultFolderId={currentFolder?.id ?? -1} />
            <CreateLookModal defaultFolderId={currentFolder?.id ?? -1} />
          </>
        )}
        {shouldDisplayEditSettings && (
          <>
            <UpdateFolderModal
              currentFolderName={currentFolder?.name}
              defaultFolderId={currentFolder?.id ?? -1}
              parentId={currentFolder?.parentId ?? -1}
            />
          </>
        )}
        <MoveDashboardModal />
        <DeleteFolderModal />
      </NavBar>
    </TranslateReady>
  );
};

export default SubFolderPage;
