import { ProcessEnvWrapper } from './processEnv';

const processEnv = ProcessEnvWrapper.getInstance();

describe('ProcessEnv', () => {
  beforeAll(() => {
    processEnv.overrideEnv({
      MY_FEATURE_TOGGLE_false: 'false',
      MY_FEATURE_TOGGLE_other: 'other',
      MY_FEATURE_TOGGLE_zero: '0',
      MY_FEATURE_TOGGLE_one: '1',
      MY_FEATURE_TOGGLE_on: 'on',
      MY_FEATURE_TOGGLE_ON: 'ON',
      MY_FEATURE_TOGGLE_true: 'true',
      MY_FEATURE_TOGGLE_TRUE: 'TRUE',
      MY_FEATURE_TOGGLE_blank: '',
      MY_FEATURE_TOGGLE_undefined: undefined,
      // @ts-ignore
      MY_FEATURE_TOGGLE_null: null, // this will never happen because process.env serializes null to '' -
    });
  });

  afterAll(() => {
    processEnv.clearOverrides();
  });
  describe('isEnabled', () => {
    it('isEnabled considers "true" and "on" as the only truthy values', () => {
      expect(processEnv.isEnabled('MY_FEATURE_TOGGLE_false')).toBe(false);
      expect(processEnv.isEnabled('MY_FEATURE_TOGGLE_other')).toBe(false);
      expect(processEnv.isEnabled('MY_FEATURE_TOGGLE_blank')).toBe(false);
      expect(processEnv.isEnabled('MY_FEATURE_TOGGLE_undefined')).toBe(false);
      expect(processEnv.isEnabled('MY_FEATURE_TOGGLE_null')).toBe(false);
      expect(processEnv.isEnabled('MY_FEATURE_TOGGLE_zero')).toBe(false);
      expect(processEnv.isEnabled('MY_FEATURE_TOGGLE_one')).toBe(false);
      expect(processEnv.isEnabled('MY_FEATURE_TOGGLE_on')).toBe(true);
      expect(processEnv.isEnabled('MY_FEATURE_TOGGLE_ON')).toBe(true);
      expect(processEnv.isEnabled('MY_FEATURE_TOGGLE_true')).toBe(true);
      expect(processEnv.isEnabled('MY_FEATURE_TOGGLE_TRUE')).toBe(true);
      expect(processEnv.isEnabled('NOT_DEFINED')).toBe(false);
    });
  });

  describe('getValueOrThrow', () => {
    it('throws error if undefined or blank', () => {
      assertProcessEnvThrowsError('MY_FEATURE_TOGGLE_undefined');
      assertProcessEnvThrowsError('MY_FEATURE_TOGGLE_null');
      assertProcessEnvThrowsError('MY_FEATURE_TOGGLE_blank');
      assertProcessEnvThrowsError('DOES_NOT_EXIST');
    });

    it('gets value if defined', () => {
      expect(processEnv.getValueOrThrow('MY_FEATURE_TOGGLE_on')).toEqual('on');
      expect(processEnv.getValueOrThrow('MY_FEATURE_TOGGLE_false')).toEqual(
        'false'
      );
    });
  });

  describe('getValueOrDefault', () => {
    it('equals default value if undefined or blank', () => {
      assertProcessEnvReturnsDefault('MY_FEATURE_TOGGLE_undefined');
      assertProcessEnvReturnsDefault('MY_FEATURE_TOGGLE_null');
      assertProcessEnvReturnsDefault('MY_FEATURE_TOGGLE_blank');
      assertProcessEnvReturnsDefault('DOES_NOT_EXIST');
    });

    it('gets value if defined', () => {
      expect(
        processEnv.getValueOrDefault('MY_FEATURE_TOGGLE_on', 'defaultValue')
      ).toEqual('on');
      expect(
        processEnv.getValueOrDefault('MY_FEATURE_TOGGLE_false', 'defaultValue')
      ).toEqual('false');
    });
  });

  describe('getValue', () => {
    it('returns undefined if blank or null or undefined', () => {
      assertProcessEnvReturnsUndefined('MY_FEATURE_TOGGLE_undefined');
      assertProcessEnvReturnsUndefined('MY_FEATURE_TOGGLE_null');
      assertProcessEnvReturnsUndefined('MY_FEATURE_TOGGLE_blank');
      assertProcessEnvReturnsUndefined('DOES_NOT_EXIST');
    });

    it('gets value if defined', () => {
      expect(processEnv.getValue('MY_FEATURE_TOGGLE_on')).toEqual('on');
      expect(processEnv.getValue('MY_FEATURE_TOGGLE_false')).toEqual('false');
    });
  });
});

function assertProcessEnvThrowsError(path: string): void {
  expect(() => processEnv.getValueOrThrow(path)).toThrow(
    `process.env.${path} is not defined but is required for service to be healthy`
  );
}

function assertProcessEnvReturnsDefault(path: string): void {
  const defaultValue = 'defaultValue';
  expect(processEnv.getValueOrDefault(path, defaultValue)).toEqual(
    defaultValue
  );
}

function assertProcessEnvReturnsUndefined(path: string): void {
  expect(processEnv.getValue(path)).toBeUndefined();
}
