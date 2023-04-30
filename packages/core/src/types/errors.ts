/**
 * Use this class if you are already translating your errors.
 */
export class LocalizedError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;

    // have to set error prototype explicitly according to
    // https://stackoverflow.com/questions/31626231/custom-error-class-in-typescript
    Object.setPrototypeOf(this, LocalizedError.prototype);
  }
}

/**
 * Use this error class if you want to rely on a middleware to
 * translate your errors for you.  Useful if you do not want to pass
 * i18nNext around.
 */
export class LocalizableError extends Error {
  readonly status: number;
  readonly key: string;
  readonly parameters?: object;

  constructor(status: number, key: string, parameters?: object) {
    super(key);
    this.status = status;
    this.key = key;
    this.parameters = parameters;
  }
}
