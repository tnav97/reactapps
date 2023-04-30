export interface ProcessEnvObject {
  [key: string]: string | undefined;
}

export class ProcessEnvWrapper {
  private static _instance: ProcessEnvWrapper;
  private _overrides?: ProcessEnvObject;
  private readonly _processEnv: ProcessEnvObject;

  public static getInstance(): ProcessEnvWrapper {
    if (!this._instance) {
      this._instance = new ProcessEnvWrapper(process.env);
    }
    return this._instance;
  }

  public overrideEnv(overrides: ProcessEnvObject): void {
    this._overrides = overrides;
  }

  public clearOverrides(): void {
    this._overrides = undefined;
  }

  protected constructor(processEnv: ProcessEnvObject) {
    this._processEnv = processEnv;
    this._overrides = undefined;
  }

  public getValue(path: string): string | undefined {
    const environment = this._overrides || this._processEnv;

    return environment[path] || undefined;
  }

  public getValueOrNull(path: string): string | null {
    return this.getValue(path) || null;
  }

  public getValueOrDefault(path: string, defaultValue: string): string {
    return this.getValue(path) || defaultValue;
  }

  public getValueOrThrow(path: string): string {
    const value = this.getValue(path);
    if (!value) {
      throw new Error(
        `process.env.${path} is not defined but is required for service to be healthy`
      );
    }
    return <string>value;
  }

  /**
   * Whether an environment variable has truthy values, useful for feature toggles
   *
   * @param path
   */
  public isEnabled(path: string, defaultValue = false): boolean {
    const value = this.getValueOrDefault(path, defaultValue.toString());
    return !!value && !!value.match(/true|on/i);
  }
}

const _instance = ProcessEnvWrapper.getInstance();
export default _instance;
