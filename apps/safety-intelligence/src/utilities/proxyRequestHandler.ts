import _ from 'lodash';
import { ProxyRequest } from '../domain/proxyRequest';

export class ProxyRequestHandler<T> {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private method: string,
    private relativeUrl: string,
    private parameters: Record<string, unknown>,
    private payload?: T
  ) {}

  private toUrlEncoded = <T>(object: T): string => {
    return Object.entries(object)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
      )
      .join('&');
  };

  private buildUrl = (): string => {
    const parameterString = _.isEmpty(this.parameters)
      ? null
      : `?${this.toUrlEncoded(this.parameters)}`;
    return `${process.env.SAFETY_INTELLIGENCE_API}${this.relativeUrl}${
      parameterString ?? ''
    }`;
  };

  private getPayloadAsJson = (): string => {
    return _.isEmpty(this.payload) ? '' : JSON.stringify(this.payload);
  };

  proxyRequest = (): ProxyRequest => {
    return {
      requestUrl: this.buildUrl(),
      requestMethod: this.method,
      requestContent: this.getPayloadAsJson(),
    } as ProxyRequest;
  };

  public static get SI2_PROXY_URL(): string {
    // return '/Proxy/MakeSi2ApiCall';
    return '';
  }
}
