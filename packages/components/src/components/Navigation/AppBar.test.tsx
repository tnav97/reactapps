import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AppBar from './AppBar';

describe('Navigation/AppBar', () => {
  test('it should render with defaults', () => {
    render(
      <BrowserRouter>
        <AppBar
          logoUrl="https://coredevuksstorage01.z33.web.core.windows.net/alcumus-logo.svg"
          logoAltText="Alcumus Logo"
          logoRedirect="/"
        />
      </BrowserRouter>
    );
    expect(screen.getByTestId('logoImage').getAttribute('src')).toEqual(
      'https://coredevuksstorage01.z33.web.core.windows.net/alcumus-logo.svg'
    );
    expect(screen.getByTestId('logoImage').getAttribute('alt')).toEqual(
      'Alcumus Logo'
    );
  });

  test('it should render with user content', () => {
    const { container } = render(
      <BrowserRouter>
        <AppBar
          logoUrl="https://coredevuksstorage01.z33.web.core.windows.net/alcumus-logo.svg"
          logoAltText="Alcumus Logo"
          logoRedirect="/"
          userContent={<span data-testid="testContent">User Content</span>}
        />
      </BrowserRouter>
    );

    const testContent = screen.getByTestId('testContent');
    expect(testContent.textContent).toEqual('User Content');
  });
});
