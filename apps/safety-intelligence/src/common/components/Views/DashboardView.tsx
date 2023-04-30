import React, {
  FunctionComponent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ReportElementTypes } from '../../../domain/reportElementTypes';
import { ReportListItemProps } from '../../../domain/reportListItemProps';
import { DashboardDto } from '../../../dtos/dashboardDto';
import EmbedRoute from '../../../routes/EmbedRoute';
import { TableHeader } from '../ReportTable/SortableTableHeader';
import ReportsTableView from '../ReportTable/ReportsTableView';
import ReportsTileView from '../ReportTiles/ReportsTileView';
import {
  recordCountTableState,
  tableTileViewSwitcherState,
} from '../shared/ReportViewToggle';

type Props = {
  getDashboardsFunction: () => Promise<DashboardDto[] | undefined>;
  headers?: TableHeader[];
  showViews?: boolean;
  showPopular?: boolean;
  showLastViewed?: boolean;
  emptyState?: ReactNode;
  handleErrors: (err) => void;
};
const DashboardView: FunctionComponent<Props> = ({
  getDashboardsFunction,
  headers,
  showViews = false,
  showPopular = false,
  showLastViewed = false,
  emptyState,
  handleErrors,
}: Props) => {
  const [dashboards, setDashboards] = useState<
    ReportListItemProps[] | undefined
  >();
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);
  const [toggleView] = useRecoilState(tableTileViewSwitcherState);
  const setCount = useSetRecoilState(recordCountTableState);
  const getDashboards = useCallback(() => {
    if (getDashboardsFunction) {
      let data: ReportListItemProps[] | undefined;
      isMounted.current = true;
      setIsLoading(true);
      setCount(0);
      getDashboardsFunction()
        .then((response) => {
          data = response?.map((res): ReportListItemProps => {
            return {
              id: res.id,
              name: res.title,
              folder: res.folder.friendlyName,
              folderId: res.folder.id,
              elementType: ReportElementTypes.Dashboard,
              contentFavoriteId: res.contentFavoriteId,
              contentMetadataId: res.contentMetadataId,
              createdAt: res.createdAt,
              favoriteCount:
                res.favoriteCount > 0 ? res.favoriteCount : undefined,
              viewCount: res.viewCount,
              basePath: EmbedRoute.dashboardQueryString(res.folder.id, res.id),
              lastViewed: res.lastViewedAt,
              popularity: res.popularity,
              createdBy: res.userName,
              dashboards: 0,
              looks: 0,
              userId: res.userId,
            };
          });
          setIsLoading(false);
          setDashboards(data);
          setCount(data?.length || 0);
        })
        .catch((err) => {
          setIsLoading(false);
          handleErrors(err);
        });
    }
  }, [getDashboardsFunction]);

  useEffect(() => {
    getDashboards();
    return () => {
      isMounted.current = false;
    };
  }, [getDashboards]);

  return (
    <>
      {toggleView === 'table' && (
        <ReportsTableView
          id="dashboardTable"
          isLoading={isLoading}
          headers={headers}
          data={dashboards ?? []}
          showViews={showViews}
          showLastViewed={showLastViewed}
          showPopular={showPopular}
          emptyState={emptyState}
        />
      )}
      {toggleView === 'tile' && (
        <ReportsTileView
          isLoading={isLoading}
          data={dashboards ?? []}
          id="dashboardTiles"
          emptyState={emptyState}
        />
      )}
    </>
  );
};

export default DashboardView;
