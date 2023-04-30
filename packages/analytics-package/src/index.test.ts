import Analytics from './index';
import { init } from 'mixpanel-browser';

const mockedIdentify = jest.fn();
const mockedTrack = jest.fn();

jest.mock('mixpanel-browser', () => {
  return {
    init: jest.fn().mockImplementation(() => {
      return {
        identify: mockedIdentify,
        track: mockedTrack,
      };
    }),
  };
});

describe('Unit test: index', () => {
  const analyticsKey = 'somekey';
  const email = 'someone@domain.com';
  const category = 'Questionnaire';
  const event = 'Signup Initiated';
  let analyticsObject1: null | Analytics;
  let analyticsObject2: null | Analytics;
  beforeAll(() => {
    // Reassign window.location so that it can be mocked with jest
    // https://github.com/facebook/jest/issues/890#issuecomment-682286025

    // @ts-ignore
    const location = window.location;
    // @ts-ignore
    delete global.window.location;
    global.window.location = Object.assign({}, location);
  });
  afterEach(() => {
    analyticsObject1 = null;
    analyticsObject2 = null;
  });

  test('returns a singleton', () => {
    analyticsObject1 = Analytics.getInstance();
    analyticsObject2 = Analytics.getInstance();
    expect(analyticsObject1).toBe(analyticsObject2);
  });

  test('calls init', () => {
    const mockedInit = init as jest.MockedFunction<typeof init>;
    Analytics.getInstance().initialize(analyticsKey, 'test', {
      test: 'test',
      ignore_dnt: true,
    });
    expect(mockedInit).toBeCalledTimes(1);
    expect(mockedInit).toBeCalledWith(
      analyticsKey,
      { test: 'test', ignore_dnt: true },
      'test'
    );
  });

  test('calls identify', () => {
    Analytics.getInstance().initialize(analyticsKey);
    analyticsObject1 = Analytics.getInstance();
    analyticsObject1.identify(email);

    expect(mockedIdentify).toHaveBeenCalledTimes(1);
    expect(mockedIdentify).toHaveBeenCalledWith(email);
  });

  test('calls track', () => {
    Analytics.getInstance().initialize(analyticsKey);
    analyticsObject1 = Analytics.getInstance();
    analyticsObject1.trackWithCategory(category, event);

    expect(mockedTrack).toHaveBeenCalledTimes(1);
    expect(mockedTrack).toHaveBeenCalledWith(event, {
      Category: category,
    });
  });

  test('it does not call init when disabledAnalytics is on', () => {
    window.location.search = '?_disableAnalytics=true';
    const mockedInit = init as jest.MockedFunction<typeof init>;
    Analytics.getInstance().initialize(analyticsKey);
    expect(mockedInit).not.toHaveBeenCalled();
  });
});
