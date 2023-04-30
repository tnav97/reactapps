import React, { FunctionComponent } from 'react';
import { useRecoilState } from 'recoil';
import { createStyles, makeStyles } from '@mui/styles';
import { StyleVariables, Text } from '@alcumus/components';
import { tableTileViewSwitcherState } from '../shared/ReportViewToggle';
import SubFolderTableView from './SubFolderTableView';
import ReportFoldersRoute from '../../../routes/FoldersRoute';
import { withSkeletonLoading } from '../../hocs/withLoading';
import { ReportElementTypes } from '../../../domain/reportElementTypes';
import { FolderDto } from '../../../dtos/folderDto';
import { TableHeader } from '../ReportTable/SortableTableHeader';
import ReportsTileView from '../ReportTiles/ReportsTileView';
import EmptyFolderState from '../EmptyState/EmptyFolderState';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      paddingTop: 0,
    },
    title: {
      lineHeight: `${theme.spacing(3)}px`,
      fontWeight: StyleVariables.fonts.weight.medium,
      paddingBottom: theme.spacing(3),
    },
  })
);
interface Props {
  folders: FolderDto[];
  showTitle?: boolean;
  isLoading: boolean;
}

const HomePageFolderList: FunctionComponent<Props> = ({
  folders,
  showTitle = true,
}: Props) => {
  const classes = useStyles();
  const [toggleView] = useRecoilState(tableTileViewSwitcherState);

  if (!folders.length) return <></>;
  const headers: TableHeader[] = [
    { id: 'elementType', displayName: 'Type' },
    { id: 'name', displayName: 'Name' },
  ];

  const finalFolders = folders.map((folder) => {
    return {
      id: folder.id,
      name: folder.name,
      basePath: `${ReportFoldersRoute.path}/${folder.id}` || '',
      folder: folder.name,
      folderId: folder.id,
      contentFavoriteId: 0,
      contentMetadataId: 0,
      userId: folder.creatorId,
      createdAt: 0,
      createdBy: `${folder.creatorId}`,
      dashboards: folder.dashboards?.length || 0,
      looks: folder.looks?.length || 0,
      creatorId: folder.creatorId,
      elementType: ReportElementTypes.Folder,
    };
  });
  return (
    <div>
      {!!showTitle && (
        <Text as="h3" className={classes.title}>
          Folders ({finalFolders.length})
        </Text>
      )}
      {toggleView === 'table' && (
        <SubFolderTableView
          data={finalFolders ?? []}
          headers={headers}
          showCreateButton={false}
        />
      )}
      {toggleView === 'tile' && (
        <ReportsTileView
          isLoading={false}
          data={finalFolders}
          title="Folders"
          id="folderTiles"
          headers={headers.map((header) => header.displayName)}
          emptyState={<EmptyFolderState showCreateButton={false} />}
        />
      )}
    </div>
  );
};
export default withSkeletonLoading<Props>(HomePageFolderList);
