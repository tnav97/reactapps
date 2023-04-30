import { CreateOrganizationRequest, OrganizationResponse } from './types';
import { getApiKeyAxios } from '../common/axios';
import { Generators } from '../common/generators';

export const TENANT_ENDPOINTS = {
  ORGANIZATIONS: '/tenants/api/v1/organizations',
  AUTH: '/tenants/api/v1/auth',
  ME: '/tenants/api/v1/me',
  MY_AUTH_PROVIDER: '/tenants/api/v1/me/authProvider',
  AUTH_PROVIDERS: '/tenants/api/v1/authProviders',
};

export async function createOrganization(
  request: CreateOrganizationRequest
): Promise<OrganizationResponse> {
  const axiosInstance = getApiKeyAxios(false);
  const response = await axiosInstance.post(
    TENANT_ENDPOINTS.ORGANIZATIONS,
    request
  );
  return response.data;
}

export async function createOrganizationWithoutRootAccount(): Promise<OrganizationResponse> {
  const axiosInstance = getApiKeyAxios(true);
  const request: CreateOrganizationRequest = {
    createAccount: false,
    tenantName: Generators.organizationName(),
    tenantIdentifier: Generators.organizationIdentifier(),
  };
  const response = await axiosInstance.post(
    TENANT_ENDPOINTS.ORGANIZATIONS,
    request
  );
  return response.data;
}

export async function getOrganization(
  organizationId: number
): Promise<OrganizationResponse> {
  const axiosInstance = getApiKeyAxios(true);
  const response = await axiosInstance.get(
    `${TENANT_ENDPOINTS.ORGANIZATIONS}/${organizationId}`
  );
  return response.data;
}
