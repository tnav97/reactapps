export default function getAuthorizationHeader(accessToken: string): {
  [key: string]: string;
} {
  return {
    Authorization: `Bearer ${accessToken}`,
  };
}
