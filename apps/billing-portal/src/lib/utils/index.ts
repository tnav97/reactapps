export function preloadDefaultState(req: any) {
  if (!req.initialState) {
    req.initialState = {};
  }
}
