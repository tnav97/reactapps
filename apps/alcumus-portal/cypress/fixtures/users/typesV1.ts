import { AuthProviderType } from '../tenants/types';

export interface UserMetadata {
  id: number;
  createdAt: string;
  modifiedAt: string;
  deletedAt: string | null;
  dataImportFileId: number | null;
  dataImportRowId: number | null;
}

export interface EmployeeDataImportRow {
  firstName?: string;
  lastName?: string;
  username?: string;
  email?: string;
  organizationId?: number;
  organizationIdentifier?: string;
  userNumber?: string;
  productType?: string;
}

export interface EmployeeDataImportResult {
  email: string | null;
  userId: number;
  employeeId: number | null;
  alcumusUserId: number | null;
  userAccountId: number | null;
  username: string | null;
  organizationId: number | null;
}

export interface RegisterUserRequest {
  firstName: string;
  lastName: string;
  createAccount: boolean;
  username?: string | null;
  email?: string | null;
  password?: string;
}

export interface UserMigrationRequest {
  firstName: string;
  lastName: string;
  isEnabled: boolean;
  username?: string;
  email?: string;
  password?: string;
}

export interface MultiCompanyUserMigrationRequest extends UserMigrationRequest {
  organizationIdentifier?: string;
  organizationId?: string;
  productType?: string;
}

export enum UserAccountType {
  PERSONAL = 'PERSONAL_ACCOUNT',
  ORGANIZATION = 'ORGANIZATION_ACCOUNT',
}

export interface UserAccountResponse extends UserMetadata {
  email: string | null;
  username: string | null;
  isEnabled: boolean;
  authProviderName: AuthProviderType;
  internalAccountId: string | null;
  userAccountType: UserAccountType;
  scopedToOrganizationId: number | null;
  requiresPasswordReset: boolean;
  userId: number;
  phoneNumber: string | null;
  firstName?: string;
  lastName?: string;
}

export interface UserResponse extends UserMetadata {
  firstName: string;
  lastName: string;
  credentials?: UserAccountResponse;
}

export interface UserMigrationResponse {
  alcumusUserId: number;
  userId: number;
  userOrganizationId: number;
  organizationId: number;
  userOrganizationAccountId: number;
  email: string | null;
  username: string | null;
  isEnabled: boolean;
  authProviderName: AuthProviderType | string;
  userAccountType: UserAccountType;
  internalAccountId: string | null;
  firstName: string;
  lastName: string;
}

export interface AccountRequest {
  username?: string;
  email?: string;
  phoneNumber?: string;
  isEnabled?: boolean;
}

export interface CreateUserRequest extends User, AccountRequest {
  password?: string;
  createAccount: boolean;
}

export interface BaseEntity {
  deletedAt?: Date | string | null;
  createdAt?: Date | string;
  modifiedAt?: Date | string;
}

export interface User extends BaseEntity {
  firstName: string;
  lastName: string;
  dataImportFileId?: number;
}

export interface OrganizationMember extends BaseEntity {
  userId: number;
  organizationId: number;
  isEnabled: boolean;
}
