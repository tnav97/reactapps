import { TestEnvironmentInstance } from './testEnvironment';

export function describeWhen(
  testName: string,
  propertyName: string,
  settingValue: boolean,
  testFunction: () => void
): void {
  const settings = TestEnvironmentInstance.getEnvironment();
  const settingAsDictionary = settings as any as Record<string, boolean>;
  if (settingAsDictionary[propertyName] === settingValue) {
    describe(testName, testFunction);
  } else {
    describe(testName, () => {
      console.log('nothing to run');
    });
  }
}

export function describeWhenEnabled(
  testName: string,
  propertyName: string,
  testFunction: () => void
): void {
  describeWhen(testName, propertyName, true, testFunction);
}

export function describeWhenDisabled(
  testName: string,
  propertyName: string,
  testFunction: () => void
): void {
  describeWhen(testName, propertyName, false, testFunction);
}
