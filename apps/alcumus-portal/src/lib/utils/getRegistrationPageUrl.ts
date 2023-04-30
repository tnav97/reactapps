import qs from 'querystring';
import store from 'store';

export default function getRegistrationPageUrl() {
  const productCode = store.get('product');
  const callbackUrl = store.get('callbackUrl');
  const organizationIdentifier = store.get('organizationIdentifier');

  const querystring = qs.stringify({
    ...(productCode && { p: productCode }),
    ...(callbackUrl && { cu: callbackUrl }),
    ...(organizationIdentifier && { oi: organizationIdentifier }),
  });

  return `/register${querystring.length ? `?${querystring}` : ''}`;
}
