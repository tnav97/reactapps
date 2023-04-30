import { SplitFactory } from '@splitsoftware/splitio';
import { ISDK } from '@splitsoftware/splitio/types/splitio';
import SplitManager from './splitManager';
import path from 'path';
import { Utilities } from '@alcumus/core';

jest.mock('@splitsoftware/splitio');

const mockedSplitFactory = SplitFactory as jest.MockedFunction<
  typeof SplitFactory
>;

describe('Split Manager', () => {
  beforeEach(() => {
    // @ts-ignore
    SplitManager._instance = undefined;
  });

  afterEach(() => {
    Utilities.ProcessEnv.clearOverrides();
  });

  it('is a singleton', () => {
    mockedSplitFactory.mockReturnValue({
      manager: jest.fn(),
      client: jest.fn(),
    } as unknown as ISDK);

    const instance = SplitManager.getInstance();
    const instance2 = SplitManager.getInstance();

    expect(instance).toBe(instance2);
    expect(mockedSplitFactory).toBeCalledTimes(1);
  });

  it('uses Split localhost mode when FEATURE_TOGGLE_USE_SPLIT = false', () => {
    Utilities.ProcessEnv.overrideEnv({
      FEATURE_TOGGLE_USE_SPLIT: 'false',
    });

    SplitManager.getInstance();
    expect(mockedSplitFactory).toBeCalledTimes(1);
    expect(mockedSplitFactory).toBeCalledWith({
      core: { authorizationKey: 'localhost' },
      features: path.join(__dirname, '.split'),
      scheduler: { featuresRefreshRate: 15 },
    });
  });

  it('uses Split servers when FEATURE_TOGGLE_USE_SPLIT = true', () => {
    const SPLIT_AUTH_KEY = '123';
    Utilities.ProcessEnv.overrideEnv({
      FEATURE_TOGGLE_USE_SPLIT: 'true',
      SELF_SIGNUP_SPLIT_AUTH_KEY: SPLIT_AUTH_KEY,
    });
    SplitManager.getInstance();
    expect(mockedSplitFactory).toBeCalledTimes(1);
    expect(mockedSplitFactory).toBeCalledWith({
      core: { authorizationKey: SPLIT_AUTH_KEY },
      features: undefined,
      scheduler: { featuresRefreshRate: 15 },
    });
  });
});
