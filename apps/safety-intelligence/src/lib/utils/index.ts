import { useQuery } from './useQuery';

function preloadDefaultState(req: any) {
  if (!req.initialState) {
    req.initialState = {};
  }
}

export { preloadDefaultState, useQuery };
