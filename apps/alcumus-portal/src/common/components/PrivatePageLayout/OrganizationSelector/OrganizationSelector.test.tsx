import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { OrganizationSelector } from './OrganizationSelector';
import { Organization } from '../../../types';
import { act } from 'react-dom/test-utils';
import { searchOrganizations } from './searchOrganizations';

jest.mock('./searchOrganizations');

const mockedSearchOrganizations = searchOrganizations as jest.MockedFunction<
  typeof searchOrganizations
>;

describe('OrganizationSelector', () => {
  const currentOrganization: Organization = {
    id: 1,
    parentTenantId: null,
    tenantTypeCode: 'ORGANIZATION',
    tenantName: 'Alcumus, Inc',
    tenantIdentifier: 'alcumus',
  };

  beforeEach(() => {
    mockedSearchOrganizations.mockResolvedValue({ results: [], total: 0 });
  });

  it('renders when current organization is provided', async () => {
    render(
      <MemoryRouter>
        <OrganizationSelector {...{ currentOrganization }} />
      </MemoryRouter>
    );

    expect(await screen.findByText('organization')).toBeInTheDocument();

    const input: HTMLInputElement = screen.getByTestId(
      'organization-selector-input'
    );
    expect(input).toBeInTheDocument();
    expect(input.value).toBe(currentOrganization.tenantName);
  });

  it('search call is made when text is entered', async () => {
    render(
      <MemoryRouter>
        <OrganizationSelector {...{ currentOrganization }} />
      </MemoryRouter>
    );

    expect(screen.getByText('organization')).toBeInTheDocument();

    const autocomplete = await screen.findByTestId(
      'organization-selector-autocomplete'
    );
    const input: HTMLInputElement = screen.getByTestId(
      'organization-selector-input'
    );

    expect(autocomplete).toBeInTheDocument();
    autocomplete.focus();

    await act(async () => {
      fireEvent.change(input, { target: { value: 'S' } });
    });

    expect(input.value).toBe('S');
    expect(mockedSearchOrganizations).toBeCalledWith('S');
  });
});
