import React from 'react';
import { RecoilRoot } from 'recoil';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';

import AppMenu from './AppMenu';
import { UserApplicationAccessDto } from '../../../dtos/userApplicationAccessDto';
import { currentApp, userAppsState } from '../PrivateRoute/PrivateRoute';

describe('AppMenu', () => {
  const apps = [
    new UserApplicationAccessDto({
      appId: 'fid',
      appDisplayName: 'FieldiD',
    }),
    new UserApplicationAccessDto({
      appId: 'ecms',
      appDisplayName: 'eCompliance',
    }),
  ];
  test('it should show displayName in selector', () => {
    const initializeState = ({ set }: any) => {
      set(currentApp, apps[0].appId);
      set(userAppsState, apps);
    };

    React.useState = jest.fn().mockReturnValue([[apps[0]], {}]);

    render(
      <RecoilRoot initializeState={initializeState}>
        <AppMenu />
      </RecoilRoot>
    );
    expect(screen.getByTestId('context-chooser-input')).toBeInTheDocument();
    expect(screen.getByText(/FieldiD/)).toBeInTheDocument();
  });

  test('it should switch dropdown from fid to ecms', () => {
    const initializeState = ({ set }: any) => {
      set(currentApp, apps[0].appId);
      set(userAppsState, apps);
    };
    React.useState = jest.fn().mockReturnValue([apps, {}]);

    render(
      <MemoryRouter>
        <RecoilRoot initializeState={initializeState}>
          <AppMenu />
        </RecoilRoot>
      </MemoryRouter>
    );

    const dropdown = screen.getByTestId(
      'context-chooser-input'
    ) as HTMLSelectElement;
    fireEvent.change(dropdown, { target: { value: apps[1].appId } });
    expect(screen.getByText(/eCompliance/)).toBeInTheDocument();
  });
});
