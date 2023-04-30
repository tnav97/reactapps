import { useLocation } from 'react-router-dom';
import qs from 'querystring';
import { LOCAL_STORAGE_KEYS } from '../../constants';
import store from 'store';

export interface LoginFlowUrlParameters {
  productCode?: string;
  callbackUrl?: string;
  organizationIdentifier?: string;
}

export interface LoginFlowParameters extends LoginFlowUrlParameters {
  rememberMyDomain?: boolean;
  rememberedDomain?: string;
  wasPreviousLoginWithCompanyAccount?: boolean;
}

export const DESIGNATE_NULL = 'none';

export class LoginFlowHooks {
  static getAndStoreUrlParameters(): LoginFlowParameters {
    let { productCode, callbackUrl, organizationIdentifier } =
      LoginFlowHooks.getUrlParameters();

    productCode = getValueFromUrlOrCacheAndUpdateCache(
      LOCAL_STORAGE_KEYS.PRODUCT,
      productCode
    );
    callbackUrl = getValueFromUrlOrCacheAndUpdateCache(
      LOCAL_STORAGE_KEYS.REDIRECT_URL,
      callbackUrl
    );
    organizationIdentifier = getValueFromUrlOrCacheAndUpdateCache(
      LOCAL_STORAGE_KEYS.DOMAIN,
      organizationIdentifier
    );
    const rememberMyDomain = LoginFlowHooks.isDomainRemembered();
    const rememberedDomain = store.get(LOCAL_STORAGE_KEYS.REMEMBERED_DOMAIN);
    const wasPreviousLoginWithCompanyAccount =
      LoginFlowHooks.wasPreviousLoginWithCompanyAccount();
    return {
      rememberedDomain,
      rememberMyDomain,
      organizationIdentifier,
      callbackUrl,
      productCode,
      wasPreviousLoginWithCompanyAccount,
    };
  }

  static getStoredValues(): LoginFlowParameters {
    return {
      rememberMyDomain: LoginFlowHooks.isDomainRemembered(),
      wasPreviousLoginWithCompanyAccount:
        LoginFlowHooks.wasPreviousLoginWithCompanyAccount(),
      callbackUrl: store.get(LOCAL_STORAGE_KEYS.REDIRECT_URL),
      rememberedDomain: store.get(LOCAL_STORAGE_KEYS.REMEMBERED_DOMAIN),
      organizationIdentifier: store.get(LOCAL_STORAGE_KEYS.DOMAIN),
      productCode: store.get(LOCAL_STORAGE_KEYS.PRODUCT),
    };
  }

  static getUrlParameters(): LoginFlowUrlParameters {
    const location = useLocation();
    const {
      p: productCode,
      cu: callbackUrl,
      oi: organizationIdentifier,
    } = qs.parse(location.search.substring(1));
    return {
      organizationIdentifier: organizationIdentifier as string | undefined,
      callbackUrl: callbackUrl as string | undefined,
      productCode: productCode as string | undefined,
    };
  }

  static clearTemporaryValues() {
    store.remove(LOCAL_STORAGE_KEYS.DOMAIN);
    store.remove(LOCAL_STORAGE_KEYS.REDIRECT_URL);
    store.remove(LOCAL_STORAGE_KEYS.PRODUCT);
    store.remove(
      LOCAL_STORAGE_KEYS.IS_CURRENT_LOGIN_ATTEMPT_WITH_COMPANY_CREDENTIALS
    );
  }

  static rememberDomain(shouldRemember: boolean, newDomain: string) {
    LoginFlowHooks.storeCurrentAttempt(true);

    store.set(LOCAL_STORAGE_KEYS.REMEMBER_MY_DOMAIN, shouldRemember);
    if (shouldRemember) {
      store.set(LOCAL_STORAGE_KEYS.REMEMBERED_DOMAIN, newDomain);
    } else {
      store.remove(LOCAL_STORAGE_KEYS.REMEMBERED_DOMAIN);
    }
  }

  static storeCurrentAttempt(isUsingCompanyCredentials: boolean): void {
    store.set(
      LOCAL_STORAGE_KEYS.IS_CURRENT_LOGIN_ATTEMPT_WITH_COMPANY_CREDENTIALS,
      isUsingCompanyCredentials
    );
  }

  static storeSuccessfulLoginAttempt(): void {
    const currentAttemptUsesCompanyCredentials =
      LoginFlowHooks.isCurrentAttemptWithCompanyAccount();
    store.set(
      LOCAL_STORAGE_KEYS.WAS_PREVIOUS_LOGIN_WITH_COMPANY_CREDENTIALS,
      currentAttemptUsesCompanyCredentials
    );
  }

  static isCurrentAttemptWithCompanyAccount(): boolean {
    return getBooleanValueFromStorage(
      LOCAL_STORAGE_KEYS.IS_CURRENT_LOGIN_ATTEMPT_WITH_COMPANY_CREDENTIALS
    );
  }

  static wasPreviousLoginWithCompanyAccount(): boolean {
    return getBooleanValueFromStorage(
      LOCAL_STORAGE_KEYS.WAS_PREVIOUS_LOGIN_WITH_COMPANY_CREDENTIALS
    );
  }

  static isDomainRemembered(): boolean {
    return getBooleanValueFromStorage(LOCAL_STORAGE_KEYS.REMEMBER_MY_DOMAIN);
  }
}

function getBooleanValueFromStorage(key: string): boolean {
  const value = store.get(key);
  return value && value.toString().toLowerCase() === 'true';
}

function getValueFromUrlOrCacheAndUpdateCache(
  storageKey: string,
  urlParameter: string | undefined | string[]
): string | undefined {
  const valueFromStorage = store.get(storageKey);

  if (urlParameter === DESIGNATE_NULL) {
    store.remove(storageKey);
    return undefined;
  } else if (
    urlParameter &&
    (!valueFromStorage || urlParameter !== valueFromStorage)
  ) {
    store.set(storageKey, urlParameter);
    return urlParameter as string;
  } else if (!urlParameter) {
    return store.get(storageKey) as string | undefined;
  }

  return urlParameter as string | undefined;
}
