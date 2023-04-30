export function getApiUrl(path: string): string {
  return `${process.env.SERVICES_HOST}${path}`;
}
