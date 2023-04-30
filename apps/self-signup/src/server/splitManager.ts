import { SplitFactory } from '@splitsoftware/splitio';
import SplitIO, {
  SplitKey,
  Treatments,
  Attributes,
} from '@splitsoftware/splitio/types/splitio';
import path from 'path';
import { Utilities } from '@alcumus/core';
import { FeatureToggles } from '../common/constants/featureToggles';

interface SplitConfigOptions {
  core: { authorizationKey: string };
  scheduler: { featuresRefreshRate: number };
  features?: string;
}

const getSplitConfig: () => SplitConfigOptions = () => {
  const featuresRefreshRate = 15;
  let features: string | undefined = path.join(__dirname, '.split');
  let authorizationKey = 'localhost';

  if (FeatureToggles.useSplit()) {
    authorizationKey = Utilities.ProcessEnv.getValueOrThrow(
      'SELF_SIGNUP_SPLIT_AUTH_KEY'
    );
    features = undefined;
  }

  return {
    core: {
      authorizationKey,
    },
    features,
    scheduler: {
      featuresRefreshRate,
    },
  };
};

export default class SplitManager {
  private static _instance: SplitManager;

  public static getInstance(): SplitManager {
    if (!SplitManager._instance) {
      SplitManager._instance = new SplitManager();
    }

    return SplitManager._instance;
  }

  private manager: SplitIO.IManager;
  private client: SplitIO.IClient;

  public constructor() {
    const factory = SplitFactory({ ...getSplitConfig() });

    this.manager = factory.manager();
    this.client = factory.client();
  }

  public getAllTreatments(
    key: SplitKey,
    attributes: Attributes = {}
  ): Treatments {
    return this.client.getTreatments(key, this.manager.names(), attributes);
  }
}
