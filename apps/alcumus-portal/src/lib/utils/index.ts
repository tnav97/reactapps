import { getAccessToken } from './getAccessToken';
import getAuthorizationHeader from './getAuthorizationHeader';
import updateTokensInLocalStorage from './updateTokensInLocalStorage';
import removeTokensFromLocalStorage from './removeTokensFromLocalStorage';

function preloadDefaultState(req: any) {
  if (!req.initialState) {
    req.initialState = {};
  }
}

export const ROOT_TENANT_ID = 1;

export {
  preloadDefaultState,
  getAccessToken,
  getAuthorizationHeader,
  removeTokensFromLocalStorage,
  updateTokensInLocalStorage,
};
