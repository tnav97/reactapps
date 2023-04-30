export interface CreateOrganizationRequest {
  tenantName?: string;
  tenantIdentifier?: string;
  createAccount: boolean;
  rootEmail?: string;
  rootPassword?: string;
  rootFirstName?: string;
  rootLastName?: string;
}

export enum TenantTypeCode {
  ADMIN_ORGANIZATION = 'ADMIN_ORGANIZATION',
  ORGANIZATION = 'ORGANIZATION',
  ORGANIZATION_SITE = 'ORGANIZATION_SITE',
}

export enum AuthProviderType {
  KEYCLOAK = 'KEYCLOAK',
  AZURE_AD = 'AZURE_AD',
  API = 'API',
  EXTERNAL = 'EXTERNAL',
  SAML = 'SAML',
}

export interface OrganizationResponse {
  id: number;
  createdAt: string;
  modifiedAt: string;
  deletedAt: Date | null;
  tenantTypeCode: TenantTypeCode;
  tenantName: string;
  tenantIdentifier: string;
  parentTenantId: number;
  userId?: number | null;
}

export interface CreateOrUpdateApiAuthProvider {
  authProviderType?: AuthProviderType | null;
  authProviderName: string;
  apiTokenHeaderName: string | null;
  apiTokenHeaderValue: string | null;
  callbackUrl: string | null;
  samlPolicyName?: string | null;
}

export interface OrganizationAuthProviderResponse
  extends CreateOrUpdateApiAuthProvider {
  createdAt: string;
  modifiedAt: string;
  deletedAt: string | null;
  id: number;
  authProviderType: AuthProviderType;
  organizationId: number | null;
  userNamePrefix: string | null;
  samlPolicyName: string | null;
}
