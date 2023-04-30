import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Tile from './Tile';
import { ReportElementTypes } from '../../../domain/reportElementTypes';
import EmbedRoute from '../../../routes/EmbedRoute';
import { RecoilRoot } from 'recoil';

describe('Tile View', () => {
  test('it should render item as tile', () => {
    const dashboard = {
      id: 1,
      name: 'test title',
      elementType: ReportElementTypes.Dashboard,
      contentFavoriteId: 1,
      contentMetadataId: 1,
      favourites: 2,
      views: undefined,
      basePath: EmbedRoute.dashboardQueryString(1, 1),
      createdBy: 'author',
      liked: true,
    };
    render(
      <RecoilRoot>
        <MemoryRouter>
          <Tile data={dashboard} />
        </MemoryRouter>
      </RecoilRoot>
    );
    expect(screen.getByText(dashboard.name)).toBeInTheDocument();
    expect(screen.getByText(/2 Favorites,/)).toBeInTheDocument();
    expect(screen.queryByText(/0 Views/)).not.toBeInTheDocument();
    expect(screen.getByText(/Created By author/)).toBeInTheDocument();
  });
});
