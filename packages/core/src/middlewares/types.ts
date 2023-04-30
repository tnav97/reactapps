export interface DecodedUserInfo {
  // eslint-disable-next-line camelcase
  preferred_username?: string;
  userId?: number;
  organizationId?: number;
}

/* eslint-disable camelcase */
export interface DecodedAzureAdAccessToken {
  header: {
    typ: string;
    alg: string;
    kid: string;
  };
  payload: {
    iss: string;
    exp: number;
    nbf: number;
    aud: string;
    sub: string;
    given_name: string;
    family_name: string;
    tfp: string;
    nonce: string;
    azp: string;
    ver: string;
    iat: number;
  };
  signature: string;
}
/* eslint-enable camelcase */
