export interface FeaturesReducerState {
  [x: string]: boolean;
}

export const defaultState: FeaturesReducerState = {
  disablePortalFeatures: false,
  useAzureAd: false,
};

export default function featuresReducer(
  state: FeaturesReducerState = defaultState
) {
  return state;
}
