import React, { FunctionComponent, ReactNode } from 'react';
import { Row, Col } from 'antd';
import { withSkeletonLoading } from '../../hocs/withLoading';
import { ReportListItemProps } from '../../../domain/reportListItemProps';
import Tile from './Tile';
import { createStyles, makeStyles } from '@mui/styles';
import { StyleVariables, Text } from '@alcumus/components';
import { ReportElementTypes } from '../../../domain/reportElementTypes';
import FolderTile from '../FoldersPage/FolderTile';

const useStyles = makeStyles((theme) =>
  createStyles({
    container: {
      padding: 0,
    },
    title: {
      lineHeight: `${theme.spacing(3)}px`,
      fontWeight: StyleVariables.fonts.weight.medium,
      paddingBottom: theme.spacing(3),
    },
  })
);
interface Props {
  id?: string;
  isLoading: boolean;
  data: ReportListItemProps[];
  title?: string;
  headers?: string[];
  emptyState?: ReactNode;
}

const ReportsTileView: FunctionComponent<Props> = ({
  id,
  data,
  title,
  headers,
  emptyState,
}: Props) => {
  const classes = useStyles();
  if (!data.length) {
    return <>{emptyState}</>;
  }

  return (
    <div className={classes.container} data-testid={id}>
      {title && (
        <Text className={classes.title}>
          {title} ({data.length})
        </Text>
      )}
      <Row gutter={[24, 36]}>
        {data?.map((x: ReportListItemProps, index) => {
          const reportItem = {
            id: x.id,
            elementType: x.elementType,
            name: x.name || 'N/A',
            basePath: x.basePath,
            views: x.viewCount || '--',
            favourites: x.favoriteCount ?? 0,
            createdBy: x.createdBy,
            liked: x.contentFavoriteId !== null,
            contentMetadataId: x.contentMetadataId,
            contentFavoriteId: x.contentFavoriteId,
            dashboards: x.dashboards,
            looks: x.looks,
          };
          return (
            <Col key={index + reportItem.name} flex="230px">
              {x.elementType === ReportElementTypes.Folder ? (
                <FolderTile data={reportItem} headers={headers} />
              ) : (
                <Tile data={reportItem} />
              )}
            </Col>
          );
        })}
        <Col flex="auto" />
      </Row>
    </div>
  );
};
export default withSkeletonLoading<Props>(ReportsTileView);
