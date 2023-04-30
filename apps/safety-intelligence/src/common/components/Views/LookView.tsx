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
import { LookDto } from '../../../dtos/lookDto';
import EmbedRoute from '../../../routes/EmbedRoute';
import {
  recordCountTableState,
  tableTileViewSwitcherState,
} from '../shared/ReportViewToggle';
import ReportTableView from '../ReportTable/ReportsTableView';
import ReportsTileView from '../ReportTiles/ReportsTileView';
import { TableHeader } from '../ReportTable/SortableTableHeader';

type Props = {
  getLooksFunction: () => Promise<LookDto[] | undefined>;
  headers?: TableHeader[];
  showViews?: boolean;
  showPopular?: boolean;
  showLastViewed?: boolean;
  emptyState?: ReactNode;
  handleErrors: (err) => void;
};
const LookView: FunctionComponent<Props> = ({
  getLooksFunction,
  headers,
  showViews = false,
  showPopular = false,
  showLastViewed = false,
  emptyState,
  handleErrors,
}: Props) => {
  const [toggleView] = useRecoilState(tableTileViewSwitcherState);
  const [looks, setLooks] = useState<ReportListItemProps[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);
  const setCount = useSetRecoilState(recordCountTableState);

  const getLooks = useCallback(() => {
    if (getLooksFunction) {
      isMounted.current = true;
      let data: ReportListItemProps[] | undefined;
      setIsLoading(true);
      setCount(0);
      getLooksFunction()
        .then((response) => {
          data = response?.map((res): ReportListItemProps => {
            return {
              id: res.id,
              name: res.title,
              folder: res.folder.friendlyName,
              folderId: res.folder.id,
              elementType: ReportElementTypes.Look,
              contentFavoriteId: res.contentFavoriteId,
              contentMetadataId: res.contentMetadataId,
              createdAt: res.createdAt,
              favoriteCount:
                res.favoriteCount > 0 ? res.favoriteCount : undefined,
              viewCount: res.viewCount,
              basePath: EmbedRoute.lookQueryString(res.folder.id, res.id),
              lastViewed: res.lastViewedAt,
              popularity: res.popularity,
              createdBy: res.userName,
              dashboards: 0,
              looks: 0,
              userId: res.userId,
            };
          });
          setIsLoading(false);
          setLooks(data);
          setCount(data?.length || 0);
        })
        .catch((err) => {
          setIsLoading(false);
          handleErrors(err);
        });
    }
  }, [getLooksFunction]);

  useEffect(() => {
    getLooks();
    return () => {
      isMounted.current = false;
    };
  }, [getLooks]);

  return (
    <>
      {toggleView === 'table' && (
        <ReportTableView
          id="lookTable"
          headers={headers}
          data={looks ?? []}
          isLoading={isLoading}
          showViews={showViews}
          showLastViewed={showLastViewed}
          showPopular={showPopular}
          emptyState={emptyState}
        />
      )}
      {toggleView === 'tile' && (
        <ReportsTileView
          data={looks ?? []}
          isLoading={isLoading}
          id="lookTiles"
          emptyState={emptyState}
        />
      )}
    </>
  );
};

export default LookView;
