import {
  EditableOrganizationDetails,
  MyOrganizationAddress,
  MyOrganizationContact,
} from '../../types';
import axios from 'axios';

export const updateMyOrganizationDetails = (
  organizationId: number,
  newOrganizationDetails: EditableOrganizationDetails
) =>
  axios.patch(`/api/organizations/${organizationId}/profile`, {
    newOrganizationDetails,
  });

export const updateMyOrganizationContact = (
  newOrganizationContact: MyOrganizationContact
) =>
  axios.patch(
    `/api/organizations/${newOrganizationContact.organizationId}/contact/${newOrganizationContact.organizationContactId}`,
    { newOrganizationContact }
  );

export const updateMyOrganizationAddress = (
  newOrganizationAddress: MyOrganizationAddress
) =>
  axios.patch(
    `/api/organizations/${newOrganizationAddress.organizationId}/address/${newOrganizationAddress.mailingAddressId}`,
    { newOrganizationAddress }
  );

export const createMyOrganizationContact = (
  newOrganizationContact: MyOrganizationContact
) =>
  axios.post(
    `/api/organizations/${newOrganizationContact.organizationId}/contact`,
    { newOrganizationContact }
  );

export const createMyOrganizationAddress = (
  newOrganizationAddress: MyOrganizationAddress
) =>
  axios.post(
    `/api/organizations/${newOrganizationAddress.organizationId}/address`,
    { newOrganizationAddress }
  );
