import React from 'react';
import { makeStyles, withStyles } from '@mui/styles';
import NavBar from '../NavBar';
import { Skeleton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import SkeletonTableRow from './SkeletonTableRow';

const StyledTableContainer = withStyles(() => ({
  root: {
    boxShadow: 'none',
  },
}))(TableContainer);

const useStyles = makeStyles({
  table: {
    margin: 24,
  },
  header: {
    margin: 24,
  },
});

export default function LoadingPage({}) {
  const classes = useStyles();

  const rows: JSX.Element[] = Array.from(Array(20), (_, i) => (
    <SkeletonTableRow key={i} />
  ));

  return (
    <NavBar disabled={true}>
      <div className={classes.header}>
        <br />
        <Skeleton width="20%" data-testid="SkeletonLoading" />
        <br />
        <Skeleton width="10%" />
        <br />
        <Skeleton width="100%" />
      </div>
      <StyledTableContainer>
        <Table className={classes.table}>
          <TableBody>{rows}</TableBody>
        </Table>
      </StyledTableContainer>
    </NavBar>
  );
}
