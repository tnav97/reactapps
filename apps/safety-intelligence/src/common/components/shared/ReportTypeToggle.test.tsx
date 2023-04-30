import React from 'react';
import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import ReportTypeToggle from './ReportTypeToggle';

describe('Report Type Toggle', () => {
  test('it should render proper text on the buttons', () => {
    render(
      <RecoilRoot>
        <ReportTypeToggle />
      </RecoilRoot>
    );
    expect(screen.getByText('dashboards')).toBeInTheDocument();
    expect(screen.getByText('looks')).toBeInTheDocument();
  });
});
