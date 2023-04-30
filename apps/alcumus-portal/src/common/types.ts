import { Types } from '@alcumus/core';
import {
  InvitationStatus,
  LoginAccountTypeV2,
  MemberStatus,
} from './constants';

export type UserProfile = {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  organizations?: UserOrganization[];
  location?: string;
  locale?: string;
  timezone?: string;
};

export type UserOrganization = {
  id?: number;
  organizationId: number;
  organizationName?: string;
  userId?: number;
};

export type UpdateSeatsOperation = 'increment' | 'decrement';

export type Product = {
  productCode: string;
  name: string;
  launchUrl: string;
};

export interface Role {
  roleLookupKey?: string;
  roleId: number;
  roleName: string;
}

export interface OrganizationMemberRole extends Role {
  userId: number;
}

export type RoleAndPermissions = {
  roleId: number;
  roleName: string;
  roleLookupKey: string;
  rolePermissions: Array<string>;
  organizationId: number | null;
};

export type Application = {
  applicationId: number;
  applicationLookupKey: string;
  applicationName: string;
  applicationUrl: string;
  applicationDescription: string;
  applicationCategories: ApplicationCategory[];
};

export type UserLogin = {
  userLoginId: number;
  userAccountType: string;
  authProviderName: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  isEnabled: boolean;
};

export type ApplicationCategory = {
  applicationCategoryId: number;
  applicationCategoryLookupKey: string;
  applicationCategoryName: string;
};

export interface UpdateUserRequest {
  userId: number;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber?: string | null;
  roleId: number;
  applicationIds: number[];
  organizationMemberId: number;
}

export type UserDetails = {
  userId: number;
  organizationId: number;
  isEnabled: boolean;
  firstName?: string;
  lastName?: string;
  username: string;
  emailAddress: string;
  phoneNumber: string;
  loginAccountType: LoginAccountTypeV2;
  roleLookupKey?: string;
  roleId: number;
  roleName: string;
  userAccountId: number;
};

export type OrganizationMember = UserDetails & {
  invitation?: Invitation;
  loginObjectId?: string;
  memberStatus: MemberStatus;
  organizationMemberId?: number;
};

export type MemberDetails = OrganizationMember & {
  organizationMemberId: number;
};

export type Invitation = {
  invitationId: number;
  invitationStatus: InvitationStatus;
};

export type MemberApplicationsResponse = {
  applicationId: number;
  applicationName: string;
  userId: number;
};

export type SubscriptionArtifactType = 'APPLICATION' | 'SOLUTION';

export interface Subscription {
  subscriptionId: number;
  subscriptionArtifactType: SubscriptionArtifactType;
  subscriptionArtifactId: number;
  subscriptionOrganizationId: number;
  subscriptionStartDate: Date;
  subscriptionEndDate: Date;
  subscriptionStatus: SubscriptionStatus;
  subscriptionSeats: number;
  application: Application & {
    userApplicationAccessCount?: { count: number };
  };
}

export enum SubscriptionStatus {
  AutoRenew = 'AUTO_RENEW',
  Cancelled = 'CANCELLED',
}

export type Organization = Types.Organization;

export interface MyOrganizationDetails {
  organizationId: number;
  tenantName: string;
  defaultLanguageCode: LanguageCode;
  organizationWebsite: string;
  organizationEmailDomain?: string;
  organizationSizeDesignation: OrganizationSizeDesignation;
  organizationAddress: MyOrganizationAddress;
  organizationContact: MyOrganizationContact;
  organizationIndustryType: string;
}

export interface MyOrganizationAddress {
  organizationId: number;
  mailingAddressId: number;
  addressLine1: string;
  city: string;
  provinceState: string;
  countryCode: CountryCode;
  postalZipCode: string;
}

export interface MyOrganizationContact {
  organizationContactId: number;
  organizationId: number;
  contactPhoneNumber: string;
  contactEmailAddress: string;
  contactFaxNumber: string;
  contactFirstName?: string;
  contactLastName?: string;
}

export interface EditableOrganizationDetails {
  tenantName: string;
  defaultLanguageCode: LanguageCode;
  organizationWebsite: string | null;
  organizationSizeDesignation: OrganizationSizeDesignation;
  organizationIndustryType: string;
}

export enum OrganizationSizeDesignation {
  SMB = 'SMB',
  MID_MARKET = 'MID_MARKET',
  ENTERPRISE = 'ENTERPRISE',
}

export enum LanguageCode {
  EN = 'EN',
  EN_US = 'EN_US',
  EN_GB = 'EN_GB',
  EN_CA = 'EN_CA',
}

export enum CountryCode {
  GB = 'GB',
  US = 'US',
  NZ = 'NZ',
  CA = 'CA',
}

export interface SubscriptionUser {
  userId: number;
  name: string;
  contact: string;
  role: string;
  userStatus: string;
}

export interface SubscriptionWithSeats {
  seats: { availableSeats: number; totalSeats: number };
  subscription: { applicationName: string; users: Array<SubscriptionUser> };
}

export interface OrganizationMemberStatusRequest {
  isEnabled: boolean;
  organizationId: number;
}

export interface MemberWithUsername {
  organizationMemberId: number;
  userId: number;
  modifiedAt: string;
  createdAt: string;
  organizationId: number;
  isEnabled: boolean;
  username: string;
}

export interface InviteUserRequest {
  emailAddress: string;
  applicationIds: number[];
  roleId: number;
  sendInvite?: boolean;
}
