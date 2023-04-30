import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Drawer } from './Drawer';

describe('Navigation/Drawer', () => {
  test('it should render', () => {
    render(
      <Drawer
        drawerOpen
        drawerContent={
          <React.Fragment>
            <a href="#" data-testid="testLink">
              Documents
            </a>
          </React.Fragment>
        }
      />
    );

    const testLink = screen.getByTestId('testLink');
    expect(testLink.textContent).toEqual('Documents');
  });

  test('it should render with closed drawer', () => {
    render(
      <Drawer
        drawerOpen={false}
        drawerContent={
          <React.Fragment>
            <a href="#" data-testid="testLink">
              Documents
            </a>
          </React.Fragment>
        }
      />
    );

    const testLink = screen.getByTestId('testLink');
    expect(testLink.textContent).toEqual('Documents');
  });

  test('it should trigger callback function', () => {
    const mockDrawerToggle = jest.fn();

    render(
      <Drawer
        drawerOpen={false}
        drawerContent={
          <React.Fragment>
            <a href="#" data-testid="testLink">
              Documents
            </a>
          </React.Fragment>
        }
        onToggleDrawer={mockDrawerToggle}
      />
    );

    const drawerIcon = screen.getByTestId('drawerIcon');
    fireEvent.click(drawerIcon);
    expect(mockDrawerToggle).toHaveBeenCalledTimes(1);
    fireEvent.click(drawerIcon);
    expect(mockDrawerToggle).toHaveBeenCalledTimes(2);
  });
});
