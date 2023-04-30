import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';

import SortableTableHeader, { TableHeader } from './SortableTableHeader';
import { Table } from '@mui/material';

describe('Sortable Table Header', () => {
  test('it should render proper text as the table headers', () => {
    const headers: TableHeader[] = [
      { id: 'test1', displayName: 'Test1' },
      { id: 'test2', displayName: 'Test2' },
      { id: 'test3', displayName: 'Test3' },
    ];
    render(
      <Table>
        <SortableTableHeader headers={headers} />
      </Table>
    );
    expect(screen.getByText(/Test1/)).toBeInTheDocument();
    expect(screen.getByText(/Test2/)).toBeInTheDocument();
    expect(screen.getByText(/Test3/)).toBeInTheDocument();
  });

  test('it should trigger callback function', () => {
    const headers: TableHeader[] = [{ id: 'test1', displayName: 'Test1' }];
    const handleClick = jest.fn();

    render(
      <Table>
        <SortableTableHeader headers={headers} handleClick={handleClick} />
      </Table>
    );
    act(() => {
      fireEvent.click(screen.getByText(/Test1/));
    });
    expect(handleClick).toHaveBeenCalled();
  });
});
