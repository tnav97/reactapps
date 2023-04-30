interface eCMSAuthRequestDto {
  username: string;
  password: string;
}

export const getECMSCSCredentials = (): eCMSAuthRequestDto => {
  return {
    username: `${process.env.ECMS_CS_EMAIL}`,
    password: `${process.env.ECMS_CS_PASSWORD}`,
  };
};

export const getECMSApiUrl = (path: string): string => {
  return `${process.env.ECMS_API}${path}`;
};

export const getECMSWebUrl = (path?: string): string => {
  return `${process.env.ECMS_WEB}${path || ''}`;
};

export const getECMSRequiredHeaders = (
  siteId: string,
  accessToken: string,
  version?: string
) => {
  return {
    Authorization: `bearer ${accessToken}`,
    'x-version': version || '1',
    'x-site': siteId,
  };
};

export const getECMSCSDefaultSiteId = (): string => {
  return `${process.env.ECMS_CS_DEFAULT_SITE_ID}`;
};
