import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePageAllApps from './HomePageAllApps';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { ALL_APPLICATIONS } from './alcumusProducts';
import {
  useApplicationCategories,
  useApplications,
} from '../../hooks/useApplications';
import { SWRResponse } from 'swr';

jest.mock('../../hooks/useApplications');

const fetchApplicationsMocked = useApplications as jest.MockedFunction<
  typeof useApplications
>;
const fetchApplicationCategoriesMocked =
  useApplicationCategories as jest.MockedFunction<
    typeof useApplicationCategories
  >;

const user = { firstName: 'foo', lastName: 'bar', email: 'foo@bar.baz' };
describe('HomePageAllApps', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  test.skip('It should render all apps', () => {
    fetchApplicationsMocked.mockReturnValue({
      data: { applications: ALL_APPLICATIONS },
      isValidating: false,
    } as SWRResponse);
    fetchApplicationCategoriesMocked.mockReturnValue({} as SWRResponse);

    render(<HomePageAllApps user={user} tenantName="test-tenant" />);
    expect(screen.getByText(/allApplications/)).toBeInTheDocument();
    expect(screen.getByText(/filterCategories/)).toBeInTheDocument();

    ALL_APPLICATIONS.forEach((app) => {
      expect(screen.getAllByText(app.applicationName)[0]).toBeInTheDocument();
    });
  });
});
