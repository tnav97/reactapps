import qs from 'querystring';
import {
  DESIGNATE_NULL,
  LoginFlowHooks,
  LoginFlowUrlParameters,
} from '../../common/hooks/LoginLogoutFlow';

export function getLoginUrlWithQueryString(
  baseUrl: string,
  { productCode, callbackUrl, organizationIdentifier }: LoginFlowUrlParameters
) {
  const querystring = qs.stringify({
    ...(productCode && { p: productCode }),
    ...(callbackUrl && { cu: callbackUrl }),
    ...(organizationIdentifier && { oi: organizationIdentifier }),
  });
  return `${baseUrl}${querystring.length ? `?${querystring}` : ''}`;
}

// todo(ARC_646): should methods rely on this or on getLoginRedirectUrl
export default function getLoginPageUrl() {
  const { productCode, callbackUrl, organizationIdentifier } =
    LoginFlowHooks.getStoredValues();

  return getLoginUrlWithQueryString('/login', {
    productCode,
    callbackUrl,
    organizationIdentifier,
  });
}

export function getLoginCredentialsPageUrl() {
  const { productCode, callbackUrl, organizationIdentifier } =
    LoginFlowHooks.getAndStoreUrlParameters();

  return getLoginUrlWithQueryString('/login/credentials', {
    productCode,
    organizationIdentifier,
    callbackUrl,
  });
}

export function getLoginRedirectUrl() {
  const { productCode, callbackUrl } = LoginFlowHooks.getStoredValues();
  const wasPreviousLoginWithCompanyAccount =
    LoginFlowHooks.wasPreviousLoginWithCompanyAccount();

  if (wasPreviousLoginWithCompanyAccount) {
    return '/login/discovery';
  }

  return getLoginUrlWithQueryString('/login', {
    productCode,
    callbackUrl,
    organizationIdentifier: DESIGNATE_NULL,
  });
}
