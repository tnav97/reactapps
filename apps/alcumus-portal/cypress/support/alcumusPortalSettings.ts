import { TestEnvironment } from './testEnvironment';

export interface AlcumusPortalSettings {
  FEATURE_TOGGLE_USE_AZURE_AD: boolean;
}

export const ALL_SETTINGS: TestEnvironment<AlcumusPortalSettings> = {
  local: {
    FEATURE_TOGGLE_USE_AZURE_AD: true,
  },
  dev: {
    FEATURE_TOGGLE_USE_AZURE_AD: true,
  },
  qa: {
    FEATURE_TOGGLE_USE_AZURE_AD: false,
  },
};
