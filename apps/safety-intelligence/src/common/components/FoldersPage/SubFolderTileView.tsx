import React, { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { recordTypeSwitcherState } from '../shared/ReportViewToggle';
import ReportsTileView from '../ReportTiles/ReportsTileView';
import { ReportListItemProps } from '../../../domain/reportListItemProps';
import EmptyFolderState from '../EmptyState/EmptyFolderState';
export interface TableViewProps {
  folders: ReportListItemProps[];
  dashboards: ReportListItemProps[];
  looks: ReportListItemProps[];
  isLoading: boolean;
  headers?: Array<string>;
  data?: ReportListItemProps[];
  showCreateButton: boolean;
}

const SubFolderTileView: FunctionComponent<TableViewProps> = ({
  folders,
  dashboards,
  looks,
  isLoading,
  headers,
  showCreateButton,
}: TableViewProps) => {
  const [type] = useRecoilState(recordTypeSwitcherState);

  const showFolders = type === 'all' || type === 'folders';
  const showDashboards = type === 'all' || type === 'dashboards';
  const showLooks = type === 'all' || type === 'looks';

  const hasContent = () => {
    return (
      !isLoading &&
      ((showFolders && folders.length !== 0) ||
        (showDashboards && dashboards.length !== 0) ||
        (showLooks && looks.length !== 0))
    );
  };
  if (!hasContent()) {
    return <EmptyFolderState showCreateButton={showCreateButton} />;
  }

  return (
    <>
      {!!showFolders && (
        <ReportsTileView
          isLoading={isLoading}
          data={folders ?? []}
          title="Folders"
          id="folderTiles"
          headers={headers}
        />
      )}
      <br />
      {!!showDashboards && (
        <ReportsTileView
          isLoading={isLoading}
          data={dashboards ?? []}
          title="Dashboards"
          id="dashboardTiles"
        />
      )}
      <br />
      {!!showLooks && (
        <ReportsTileView
          isLoading={isLoading}
          data={looks ?? []}
          title="Looks"
          id="lookTiles"
        />
      )}
    </>
  );
};

export default SubFolderTileView;
