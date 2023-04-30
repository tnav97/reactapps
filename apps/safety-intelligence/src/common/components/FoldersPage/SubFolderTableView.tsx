import React, { FunctionComponent, useMemo, useState } from 'react';
import { makeStyles, withStyles } from '@mui/styles';
import {
  AssessmentOutlined,
  DashboardOutlined,
  FolderOutlined,
} from '@mui/icons-material';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { StyleVariables } from '@alcumus/components';
import { NavLink } from 'react-router-dom';
import { ReportListItemProps } from '../../../domain/reportListItemProps';
import ReportOptionsColumn from '../ReportTable/ReportOptionsColumn';
import { ReportElementTypes } from '../../../domain/reportElementTypes';
import SortableTableHeader, {
  SortingConfiguration,
  TableHeader,
} from '../ReportTable/SortableTableHeader';
import EmptyFolderState from '../EmptyState/EmptyFolderState';
import FavoriteContentButton from '../shared/FavoriteContentButton';
import handleOnDeleteFavorite from '../ReportTable/handleOnDeleteFavorite';
import { showKebabMenu, showMoveFunction } from '../shared/ShowMoveFunction';

export interface TableViewProps {
  data: ReportListItemProps[];
  headers?: TableHeader[];
  showOwner?: boolean;
  showDashboardCount?: boolean;
  showLookCount?: boolean;
  showFavorite?: boolean;
  isLoading?: boolean;
  showCreateButton: boolean;
  removeFavoriteFromTable?: boolean;
}

const StyledTableCell = withStyles(() => ({
  root: {
    padding: '8px 16px',
  },
}))(TableCell);

const useStyles = makeStyles({
  tableContainer: {
    boxShadow: 'none !important',
    paddingTop: 0,
  },
  icon: {
    color: StyleVariables.colors.grey4,
  },
  customNavLink: {
    color: StyleVariables.colors.text.default,
    textDecoration: 'underline',
    '&:hover': {
      color: StyleVariables.colors.text.info,
    },
  },
  sortIcon: {
    position: 'absolute',
    paddingLeft: 4,
  },
  kebabColumn: {
    padding: 0,
    width: 55,
  },
});

const SubFolderTableView: FunctionComponent<TableViewProps> = ({
  data,
  headers,
  showOwner = false,
  showDashboardCount = false,
  showLookCount = false,
  showFavorite = false,
  isLoading,
  showCreateButton,
  removeFavoriteFromTable,
}: TableViewProps) => {
  const classes = useStyles();

  const [sortConfig, updateSortConfig] = useState<SortingConfiguration[]>([]);
  const [tableRow, setTableRow] = useState<ReportListItemProps[] | undefined>();

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

  const canSeeKebabMenu = (row: ReportListItemProps) => {
    return (
      (row.elementType === ReportElementTypes.Folder && row.can?.editContent) ||
      row.elementType !== ReportElementTypes.Folder
    );
  };

  const hasContent = (): boolean => {
    return !isLoading && data.length !== 0;
  };

  return (
    <>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table aria-label="Record Table" data-testid="recordTable">
          <SortableTableHeader
            headers={headers}
            sortConfig={sortConfig}
            handleClick={handleChange}
          />
          {hasContent() && (
            <TableBody>
              {sortedRows.map((row: ReportListItemProps) => {
                return (
                  <TableRow key={row.id}>
                    <StyledTableCell
                      component="th"
                      scope="row"
                      className={classes.icon}
                    >
                      {row.elementType === ReportElementTypes.Folder && (
                        <FolderOutlined />
                      )}
                      {row.elementType === ReportElementTypes.Dashboard && (
                        <DashboardOutlined />
                      )}
                      {row.elementType === ReportElementTypes.Look && (
                        <AssessmentOutlined />
                      )}
                    </StyledTableCell>
                    <StyledTableCell scope="row">
                      <NavLink
                        className={classes.customNavLink}
                        to={`${row.basePath}`}
                      >
                        {row.name}
                      </NavLink>
                    </StyledTableCell>
                    {showDashboardCount && (
                      <StyledTableCell align="right">
                        {row.elementType === ReportElementTypes.Folder
                          ? row.dashboards
                          : '--'}
                      </StyledTableCell>
                    )}
                    {showLookCount && (
                      <StyledTableCell align="right">
                        {row.elementType === ReportElementTypes.Folder
                          ? row.looks
                          : '--'}
                      </StyledTableCell>
                    )}
                    {showOwner && (
                      <StyledTableCell>
                        {row.elementType === ReportElementTypes.Folder
                          ? '--'
                          : row.createdBy}
                      </StyledTableCell>
                    )}
                    {showFavorite && (
                      <StyledTableCell>
                        {row.elementType === ReportElementTypes.Folder ? (
                          '--'
                        ) : (
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
                        )}
                      </StyledTableCell>
                    )}
                    {showKebabMenu({ report: row }) ? (
                      <StyledTableCell className={classes.kebabColumn}>
                        {canSeeKebabMenu(row) && (
                          <ReportOptionsColumn
                            showEdit={row.can?.editContent || row.can?.update}
                            showDelete={
                              row.can?.editContent || row.can?.destroy
                            }
                            enableDelete={
                              row.elementType === ReportElementTypes.Folder
                            }
                            showMove={showMoveFunction({ report: row })}
                            row={row}
                          />
                        )}
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
      {!hasContent() && (
        <EmptyFolderState showCreateButton={showCreateButton} />
      )}
    </>
  );
};

export default SubFolderTableView;
