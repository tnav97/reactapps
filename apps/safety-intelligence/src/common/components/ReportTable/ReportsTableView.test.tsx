import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import ReportsTableView from './ReportsTableView';

describe('Report Type Toggle', () => {
  test('it should render proper text as the table headers', () => {
    const headers = [
      { id: 'test1', displayName: 'Test1' },
      { id: 'test2', displayName: 'Test2' },
      { id: 'test3', displayName: 'Test3' },
    ];
    render(
      <RecoilRoot>
        <ReportsTableView isLoading={false} headers={headers} data={[]} />
      </RecoilRoot>
    );
    expect(screen.getByText(/Test1/)).toBeInTheDocument();
    expect(screen.getByText(/Test2/)).toBeInTheDocument();
    expect(screen.getByText(/Test3/)).toBeInTheDocument();
  });
});
