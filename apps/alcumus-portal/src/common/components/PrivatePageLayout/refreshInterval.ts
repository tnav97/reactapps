const MAXIMUM_REFRESH_INTERVAL_IN_MINUTES = 15;

export function getTokenRefreshIntervalInMilliseconds(
  secondsTillExpiry: number
): number {
  // Refresh tokens before a minute of expiry
  // azuread access tokens expire in 60 minutes by default
  // keycloak access tokens expire in 5 minutes by default
  const suggestedExpiryIntervalInMinutes = secondsTillExpiry / 60 - 1;
  const tokenRefreshIntervalInMilliseconds =
    Math.min(
      MAXIMUM_REFRESH_INTERVAL_IN_MINUTES,
      suggestedExpiryIntervalInMinutes
    ) *
    60 *
    1000;
  return tokenRefreshIntervalInMilliseconds;
}
