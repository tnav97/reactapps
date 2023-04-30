import React from 'react';
import { Skeleton } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

export default function SkeletonTableRow({}) {
  return (
    <TableRow>
      <TableCell width="5%">
        <Skeleton />
      </TableCell>
      <TableCell width="35%">
        <Skeleton />
      </TableCell>
      <TableCell width="20%">
        <Skeleton />
      </TableCell>
      <TableCell width="20%">
        <Skeleton />
      </TableCell>
      <TableCell width="10%">
        <Skeleton />
      </TableCell>
    </TableRow>
  );
}
