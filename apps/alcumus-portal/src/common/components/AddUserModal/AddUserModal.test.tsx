import '@testing-library/jest-dom';
import '@testing-library/react/dont-cleanup-after-each';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { AddUserModal } from './AddUserModal';
import { Role, Subscription } from '../../types';
import { postCreateUser } from './postCreateUser';
import { act } from 'react-dom/test-utils';
import { SWRResponse } from 'swr';
import { useSubscriptions } from '../../hooks/useSubscriptions';
import { useOrganizationProfile } from '../../hooks/useOrganizationProfile';

jest.mock('./postCreateUser');
jest.mock('../../hooks/useSubscriptions');
jest.mock('../../hooks/useOrganizationProfile');

const fetchSubscriptionsMock = useSubscriptions as jest.MockedFunction<
  typeof useSubscriptions
>;
const fetchOrganizationProfileMock =
  useOrganizationProfile as jest.MockedFunction<typeof useOrganizationProfile>;
const mockedPostCreateUser = postCreateUser as jest.MockedFunction<
  typeof postCreateUser
>;

const tFunction = (x: string) => x;

describe('AddUserModal', () => {
  const roles: Role[] = [
    {
      roleId: 1,
      roleName: 'Admin',
    },
    {
      roleId: 2,
      roleName: 'User',
    },
  ];
  const subscriptions: Partial<Subscription>[] = [
    {
      application: {
        applicationName: 'Safety Intelligenmce',
        applicationLookupKey: 'si',
        applicationDescription: 'foobar',
        userApplicationAccessCount: { count: 1 },
        applicationId: 1,
        applicationUrl: 'foobar',
        applicationCategories: [],
      },
    },
  ];
  const fetchSubscriptions = jest.fn();
  const onClose = jest.fn();
  const onUserAdded = jest.fn();

  beforeEach(() => {
    fetchOrganizationProfileMock.mockReturnValue({
      data: {
        organizationProfile: { organizationEmailDomain: 'abc.co' },
      },
    } as SWRResponse);
    fetchSubscriptionsMock.mockReturnValue({
      data: subscriptions,
    } as SWRResponse);
    fetchSubscriptions.mockReset(); // fetchSubscriptions
    onClose.mockReset();
    onUserAdded.mockReset();
  });

  const addUserModalWithProps = (
    <AddUserModal
      t={tFunction}
      roles={roles}
      onClose={onClose}
      onUserAdded={onUserAdded}
      organizationId={1}
    />
  );
  test('it should render', () => {
    render(addUserModalWithProps);

    expect(fetchSubscriptionsMock).toBeCalled();

    expect(screen.getByText('title')).toBeInTheDocument();
    expect(screen.getByText('cancel')).toBeInTheDocument();
    expect(screen.getByText('save')).toBeInTheDocument();
    expect(screen.getByText('saveAndAddNew')).toBeInTheDocument();
  });

  test('it calls onClose when cancel is clicked', () => {
    render(addUserModalWithProps);

    expect(fetchSubscriptionsMock).toBeCalled();

    fireEvent.click(screen.getByText('cancel'));

    expect(onClose).toBeCalled();
  });

  test('it calls onUserAdded when user successfully added', async () => {
    mockedPostCreateUser.mockResolvedValueOnce();

    render(addUserModalWithProps);

    expect(fetchSubscriptionsMock).toBeCalled();

    const emailInput = screen.getByTestId('email');
    await act(async () => {
      await fireEvent.change(emailInput, { target: { value: 'a@abc.com' } });
      await fireEvent.click(screen.getByText('save'));
    });

    expect(mockedPostCreateUser).toBeCalled();
    expect(onUserAdded).toBeCalled();
  });

  test('renders emailHintIndividual hint', async () => {
    render(addUserModalWithProps);

    const emailInput = screen.getByTestId('email');
    fireEvent.input(emailInput, { target: { value: 'a@bc.ca' } });
    expect(screen.getByText(/emailHintIndividual/)).toBeInTheDocument();
  });

  /**
   * Fix me when debugging currentOrganizationEmailDomain is undefined inside the email change handler
   * { value: 'a@abc.co', currentOrganizationEmailDomain: undefined }!
   */
  test.skip('renders emailHintOrganization hint', async () => {
    render(addUserModalWithProps);

    const emailInput = screen.getByTestId('email');
    await act(async () => {
      await fireEvent.change(emailInput, { target: { value: 'a@abc.co' } });
    });
    expect(screen.getByText(/emailHintOrganization/)).toBeInTheDocument();
  });

  test('renders initial email hint', async () => {
    render(addUserModalWithProps);

    expect(screen.getByText(/emailHint/)).toBeInTheDocument();
  });
});
