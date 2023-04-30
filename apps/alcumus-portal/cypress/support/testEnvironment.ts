export interface TestEnvironment {
  local: AlcumusPortalSettings;
  dev?: AlcumusPortalSettings;
  qa?: AlcumusPortalSettings;
}

interface AlcumusPortalSettings {
  FEATURE_TOGGLE_USE_AZURE_AD: boolean;
}

const ALL_SETTINGS: TestEnvironment = {
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

export type TestEnvironmentType = 'local' | 'dev' | 'qa';

export class TestEnvironmentInstance {
  private static environmentType: TestEnvironmentType;
  private static instance: TestEnvironment;

  static initialize(
    environmentType: TestEnvironmentType,
    allEnvironments: TestEnvironment
  ) {
    TestEnvironmentInstance.environmentType = environmentType;
    TestEnvironmentInstance.instance = allEnvironments;
  }

  static getEnvironment(): AlcumusPortalSettings {
    if (!TestEnvironmentInstance.instance) {
      TestEnvironmentInstance.initialize('local', ALL_SETTINGS);
    }
    return TestEnvironmentInstance.instance[
      TestEnvironmentInstance.environmentType
    ];
  }
}
