import { Utilities } from '@alcumus/core';
import { AlcumusProducts } from '../../server/constants';
import findAuthConsumerCallbackMatch from './findAuthConsumerCallbackMatch';

export default function shouldAllowAuthWithRedirectionFlow(
  callbackWhiteList: string[],
  product?: string,
  callbackUrl?: string
) {
  const onlyProductOrCallbackUrlProvidedInUrl =
    (product?.length && !callbackUrl?.length) ||
    (!product?.length && callbackUrl?.length);

  if (onlyProductOrCallbackUrlProvidedInUrl) {
    return false;
  } else if (product?.length && callbackUrl?.length) {
    // take the callback url ignoring anything from query string
    const callbackHostPath = callbackUrl.split('?')[0];

    const unsupportedProduct =
      product &&
      !AlcumusProducts.find(
        (p) => p.productCode.toLowerCase() === product.toLowerCase()
      );
    const hasCallbackButNotAllowed =
      callbackHostPath &&
      !findAuthConsumerCallbackMatch(callbackWhiteList, callbackHostPath);

    // localhost is reserved for your machine and .local is only reservable
    // in an internal network; so both are sufficient for local testing
    // of the whitelist.
    const isLocalhostOrLocalNetwork =
      callbackUrl.startsWith('http://localhost:') ||
      callbackUrl.split('://')[1].split(/[:/]/)[0].endsWith('.local');

    if (
      /* For unsupported products, we need to redirect users to base url */
      unsupportedProduct ||
      /**
       * Portal needs to whitelist localhost based callback urls to optimize dev experience
       * for integrating products when working with hosted portal coordinating with a local app to establish session
       *
       * Examples of callback urls:
       * Safety Intelligence: http://localhost:3002/api/auth/session
       * SafeContractor: http://localhost:3000/api/login/auth/session
       *
       * Note: Localhost callback urls are supported across all environments except production environment
       */
      (isLocalhostOrLocalNetwork &&
        !Utilities.ProcessEnv.isEnabled(
          'ALCUMUS_PORTAL_ALLOW_LOCAL_REDIRECT'
        )) ||
      /**
       * A non-localhost callbacks must match one of the values in AUTH_CONSUMER_CALLBACKS_WHITELIST environment variable
       */
      (!isLocalhostOrLocalNetwork && hasCallbackButNotAllowed)
    ) {
      return false;
    }
  }

  return true;
}
