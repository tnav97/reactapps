import {
  SortDirection,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import React, { FunctionComponent, useCallback } from 'react';
import { StyleVariables } from '@alcumus/components';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
export interface SortingConfiguration {
  propertyName: string;
  sortType: SortDirection;
}
export interface TableHeader {
  id: string;
  displayName: string;
  isNumeric?: boolean;
}
interface Props {
  headers?: TableHeader[];
  sortConfig?: SortingConfiguration[];
  handleClick?: (pendingChange: SortingConfiguration[]) => void;
}

const useStyles = makeStyles({
  sortIcon: {
    position: 'absolute',
    paddingLeft: 4,
  },
});

const StyledTableRow = withStyles((theme) => ({
  root: {
    height: theme.spacing(3),
  },
}))(TableRow);

const StyledTableCell = withStyles(() => ({
  head: {
    padding: '0 16px',
    backgroundColor: StyleVariables.colors.grey1,
    color: StyleVariables.colors.grey4,
  },
}))(TableCell);

const SortableTableHeader: FunctionComponent<Props> = ({
  headers,
  sortConfig = [],
  handleClick,
}: Props) => {
  const classes = useStyles();

  const sortBy = useCallback(
    (propertyName: string) => {
      if (!sortConfig) return;
      let pendingChange = sortConfig;
      const index = pendingChange.findIndex(
        (config) => config.propertyName === propertyName
      );
      if (index > -1) {
        const currentSortType = pendingChange[index].sortType;
        pendingChange.splice(index, 1);
        if (currentSortType === 'desc') {
          pendingChange = [{ propertyName: propertyName, sortType: 'asc' }];
        }
      } else {
        pendingChange = [{ propertyName: propertyName, sortType: 'desc' }];
      }
      if (handleClick) handleClick(pendingChange);
    },
    [sortConfig]
  );
  const getSortIcon = (property: string) => {
    const config = sortConfig.find(
      (sortConfig) => sortConfig.propertyName === property
    );
    return config ? (
      config.sortType === 'desc' ? (
        <ArrowDownwardIcon />
      ) : (
        <ArrowUpwardIcon />
      )
    ) : null;
  };

  return (
    <TableHead>
      <StyledTableRow>
        {headers &&
          headers.map((header) => (
            <StyledTableCell
              key={header.id}
              onClick={() => sortBy(header.id)}
              align={header.isNumeric ? 'right' : 'left'}
            >
              {header.displayName}
              <span className={classes.sortIcon}>{getSortIcon(header.id)}</span>
            </StyledTableCell>
          ))}
        {<StyledTableCell key="kebab-menu" />}
      </StyledTableRow>
    </TableHead>
  );
};

export default SortableTableHeader;
