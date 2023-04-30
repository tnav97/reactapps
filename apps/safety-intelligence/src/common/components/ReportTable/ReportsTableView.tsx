import React, { FunctionComponent, ReactNode, useMemo, useState } from 'react';
import { makeStyles, withStyles } from '@mui/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NavLink } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useTranslation } from 'react-i18next';
import { ReportListItemProps } from '../../../domain/reportListItemProps';
import { withSkeletonLoading } from '../../hocs/withLoading';
import FavoriteContentButton from '../shared/FavoriteContentButton';
import handleOnDeleteFavorite from './handleOnDeleteFavorite';
import { StyleVariables } from '@alcumus/components';
import ReportOptionsColumn from './ReportOptionsColumn';
import { differenceInDays } from 'date-fns';
import SortableTableHeader, {
  SortingConfiguration,
  TableHeader,
} from '../ReportTable/SortableTableHeader';
import ReportThumbnailView from './ReportThumbnailRow';
import { ReportElementTypes } from '../../../domain/reportElementTypes';
import { showKebabMenu, showMoveFunction } from '../shared/ShowMoveFunction';
import PopularityScore from './PopularityScore';

export interface ReportProps {
  id?: string;
  headers?: TableHeader[];
  data: ReportListItemProps[];
  removeFavoriteFromTable?: boolean;
  isLoading: boolean;
  showViews?: boolean;
  showLastViewed?: boolean;
  showPopular?: boolean;
  emptyState?: ReactNode;
}

const StyledTableCell = withStyles(() => ({
  root: {
    padding: '8px 16px',
  },
}))(TableCell);

const useStyles = makeStyles({
  thumbnailWrapperStyle: {
    width: 85,
    height: 60,
    overflow: 'hidden',
    marginRight: 'auto',
    display: 'flex',
    border: `1px solid ${StyleVariables.colors.grey2}`,
  },
  thumbnailStyle: {
    margin: 'auto',
    width: '100%',
    height: 'auto',
  },
  tableContainer: {
    boxShadow: 'none !important',
    paddingTop: 0,
  },
  favoriteIcon: {
    paddingLeft: 32,
  },
  cellWidth: {
    width: '35%',
  },
  customNavLink: {
    color: StyleVariables.colors.text.default,
    textDecoration: 'underline',
    '&:hover': {
      color: StyleVariables.colors.text.info,
    },
  },
});

const ReportTableView: FunctionComponent<ReportProps> = ({
  id,
  headers,
  data,
  removeFavoriteFromTable,
  showLastViewed,
  showPopular,
  showViews,
  isLoading,
  emptyState,
}: ReportProps) => {
  const [tableRow, setTableRow] = useState<ReportListItemProps[] | undefined>();
  const [sortConfig, updateSortConfig] = useState<SortingConfiguration[]>([]);
  const { t } = useTranslation();

  const sortedRows = useMemo(() => {
    if (!sortConfig.length) {
      return [...data];
    }

    function descendingComparator(a, b, orderBy) {
      if (b[orderBy] < a[orderBy]) return -1;
      if (b[orderBy] > a[orderBy]) return 1;
      return 0;
    }

    function getComparator(a, b, config: SortingConfiguration) {
      const result = descendingComparator(a, b, config.propertyName);

      return config.sortType === 'desc' ? result : -result;
    }
    const sorted = [...data].sort((a, b) => {
      for (const config of sortConfig) {
        const result = getComparator(a, b, config);
        if (result !== 0) {
          return result;
        }
      }
      return 0;
    });
    return sorted;
  }, [sortConfig, data]);

  const handleChange = (pendingChange: SortingConfiguration[]) => {
    updateSortConfig([...pendingChange]);
  };

  const classes = useStyles();
  const hasContent = (): boolean => {
    return !isLoading && data.length !== 0;
  };

  return (
    <>
      <TableContainer
        className={classes.tableContainer}
        component={Paper}
        data-testid={id}
      >
        <Table aria-label="report table">
          <SortableTableHeader
            headers={headers}
            sortConfig={sortConfig}
            handleClick={handleChange}
          />
          {hasContent() && (
            <TableBody>
              {sortedRows.map((row: ReportListItemProps) => {
                return (
                  <TableRow key={row.id} data-testid="reportRow">
                    <StyledTableCell scope="row" align="center">
                      <NavLink to={row.basePath}>
                        <span className={classes.thumbnailWrapperStyle}>
                          <ReportThumbnailView
                            data={{ id: row.id, elementType: row.elementType }}
                          />
                        </span>
                      </NavLink>
                    </StyledTableCell>
                    <StyledTableCell className={classes.cellWidth} align="left">
                      <NavLink
                        to={row.basePath}
                        className={classes.customNavLink}
                      >
                        {row.name}
                      </NavLink>
                    </StyledTableCell>
                    {showPopular && (
                      <StyledTableCell align="left">
                        <PopularityScore score={row.popularity || 0} />
                      </StyledTableCell>
                    )}
                    {showViews && (
                      <StyledTableCell align="right">
                        {row.viewCount ? row.viewCount : '--'}
                      </StyledTableCell>
                    )}
                    {showLastViewed && (
                      <StyledTableCell align="left">
                        {differenceInDays(
                          new Date(),
                          row.lastViewed || new Date()
                        ) < 1
                          ? t('lessThanDay')
                          : formatDistanceToNow(row.lastViewed || 0)}{' '}
                        {t('ago')}
                      </StyledTableCell>
                    )}
                    <StyledTableCell align="left">
                      {row.createdBy}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      <NavLink
                        to={`folders/${row.folderId}`}
                        className={classes.customNavLink}
                      >
                        {row.folder}
                      </NavLink>
                    </StyledTableCell>
                    <StyledTableCell
                      className={classes.favoriteIcon}
                      align="left"
                    >
                      <FavoriteContentButton
                        elementType={row.elementType}
                        liked={row.contentFavoriteId !== null}
                        contentMetadataId={row.contentMetadataId}
                        contentFavoriteId={row.contentFavoriteId}
                        handleOnDeleteFavorite={(contentFavoriteId) => {
                          if (removeFavoriteFromTable)
                            setTableRow(
                              handleOnDeleteFavorite({
                                content: tableRow ?? [],
                                contentFavoriteId: contentFavoriteId,
                              })
                            );
                        }}
                      />
                    </StyledTableCell>
                    {showKebabMenu({ report: row }) ? (
                      <StyledTableCell>
                        <ReportOptionsColumn
                          showDownload
                          showSchedule
                          showEdit
                          showMove={showMoveFunction({ report: row })}
                          showDelete
                          enableDelete={
                            row.elementType === ReportElementTypes.Folder
                          }
                          row={row}
                        />
                      </StyledTableCell>
                    ) : (
                      <StyledTableCell></StyledTableCell>
                    )}
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      {!hasContent() && emptyState}
    </>
  );
};

export default withSkeletonLoading<ReportProps>(ReportTableView);
