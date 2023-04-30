export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  expiresIn: number;
  refreshExpiresAt: number;
  refreshExpiresIn: number;
  tokenType: 'Bearer';
}

export interface LoginRequest {
  username: string;
  password: string;
  organizationIdentifier?: string;
}

export interface LoginCallbackData {
  organizationId: number | null;
  organizationIdentifier: string | null;
  loginIdentifier: string | null;
  username: string | null;
  email: string | null;
  password: string | null;
  loginIdentifierType: LoginCallbackIdentifierType;
}

export enum LoginCallbackIdentifierType {
  EMAIL = 'EMAIL',
  USERNAME = 'USERNAME',
  PHONE = 'PHONE',
}
