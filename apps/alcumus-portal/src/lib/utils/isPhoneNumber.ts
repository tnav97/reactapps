export default function isPhoneNumber(phoneNumber: string): boolean {
  /* eslint-disable */ // to bypass eslint rule of no-useless-escape
  const phoneNumberValid =
    /^[\+]([0-9][\s]?|[0-9]?)([(][0-9]{3}[)][\s]?|[0-9]{3}[-\s\.]?)[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
  /* eslint-disable */

  return phoneNumber.trim().length > 0 && !phoneNumber.match(phoneNumberValid);
}
