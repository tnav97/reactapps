import React from 'react';
import { render, screen } from '@testing-library/react';
import { EditUserModal, EditUserModalProps } from './EditUserModal';
import { LoginAccountTypeV2, MemberStatus } from '../../constants';

describe('components / EditUserModal', () => {
  test('it renders', () => {
    const props: EditUserModalProps = {
      t: (x) => x,
      roles: [],
      onClose: () => null,
      onUserUpdated: () => null,
      member: {
        emailAddress: '',
        firstName: '',
        lastName: '',
        userAccountId: 0,
        userId: 0,
        organizationId: 0,
        isEnabled: true,
        username: '',
        loginAccountType: LoginAccountTypeV2.INDIVIDUAL,
        phoneNumber: '',
        roleId: 0,
        roleName: '',
        organizationMemberId: 0,
        memberStatus: MemberStatus.ACTIVE,
      },
    };
    render(<EditUserModal {...props} />);

    [
      'firstNameInput',
      'lastNameInput',
      'emailInput',
      'rolesSelect',
      'phoneNumberInput',
    ].forEach((id) => expect(screen.getByTestId(id)).toBeInTheDocument());
  });
});
