function extractHostFromUrl(url: string): string {
  const parts = url.split('.').slice();
  parts.shift();
  const host = parts.join('.');
  return host.includes('/') ? host.split('/')[0] : host;
}

export default function findAuthConsumerCallbackMatch(
  callbackWhitelist: string[],
  callbackUrl: string
) {
  // See if there is a direct match for callback in whitelist
  let match = callbackWhitelist.find(
    (url) => url.toLowerCase() === callbackUrl.toLowerCase()
  );

  // If no match is found, see if we have callbacks that support wildcard hosts.
  // If we do try matching them with host from callback url
  if (!match) {
    const wildcardPatterns = callbackWhitelist.filter(
      (url) => url.startsWith('http://*.') || url.startsWith('https://*.')
    );
    if (wildcardPatterns.length) {
      const targetHost = extractHostFromUrl(callbackUrl);
      wildcardPatterns.forEach((pattern) => {
        if (!match) {
          const host = extractHostFromUrl(pattern);
          if (host.toLowerCase() === targetHost.toLowerCase()) {
            match = pattern;
          }
        }
      });
    }
  }

  return match;
}
