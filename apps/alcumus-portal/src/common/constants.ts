export const KEY_MAP = {
  ENTER: 13,
};

export const Roles = {
  CLIENT_USER: 'Client.User',
  ALCUMUS_ADMIN: 'Alcumus.Admin',
  CLIENT_ADMIN: 'Client.Admin',
  ALCUMUS_SUPPORT_TIER_1: 'Alcumus.Support.Tier1',
  ALCUMUS_SUPPORT_TIER_2: 'Alcumus.Support.Tier2',
  ALCUMUS_CUSTOMER_SUCCESS: 'Alcumus.CustomerSuccess',
};

export const ALCUMUS_ROLES_PREFIX = 'Alcumus.';

export const LOCAL_STORAGE_KEYS = {
  PRODUCT: 'login.product',
  REDIRECT_URL: 'login.callbackUrl',
  DOMAIN: 'login.organizationIdentifier',
  REMEMBERED_DOMAIN: 'login.rememberedDomain',
  REMEMBER_MY_DOMAIN: 'login.rememberMyDomain',
  WAS_PREVIOUS_LOGIN_WITH_COMPANY_CREDENTIALS:
    'login.previousSuccessfulLoginWasCompanyLogin',
  IS_CURRENT_LOGIN_ATTEMPT_WITH_COMPANY_CREDENTIALS:
    'login.isCurrentAttemptUsingCompanyLogin',
};

export enum LoginAccountTypeV2 {
  INDIVIDUAL = 'INDIVIDUAL',
  ORGANIZATION = 'ORGANIZATION',
}

export const DEFAULT_ROLE_LOOKUP_KEY = 'Client.User';

export enum InvitationStatus {
  PENDING_INVITE = 'PENDING_INVITE',
  INVITE_EXPIRED = 'INVITE_EXPIRED',
  PENDING_ACCEPTANCE = 'PENDING_ACCEPTANCE',
  CANCELED = 'CANCELED',
}

export enum MemberStatus {
  ACTIVE = 'ACTIVE',
  DELETED = 'DELETED',
  DISABLED = 'DISABLED',
  PENDING_INVITE = 'PENDING_INVITE',
  INVITE_EXPIRED = 'INVITE_EXPIRED',
  PENDING_ACCEPTANCE = 'PENDING_ACCEPTANCE',
  CANCELED = 'CANCELED',
}

export const IMAGE_BASE_URL =
  'https://coredevuksstorage01.z33.web.core.windows.net';
