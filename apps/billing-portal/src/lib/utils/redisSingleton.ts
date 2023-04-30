import getClient from '../client/redis';
import { PromisifiedRedis, promisifyRedis } from './promisifiedRedis';
import { EnvironmentVariables } from '../../common/constants/environmentVariables';

let redisClient: PromisifiedRedis;

export function getRedisSingleton(): PromisifiedRedis {
  if (!redisClient) {
    redisClient = promisifyRedis(
      getClient({
        host: EnvironmentVariables.Redis.host(),
        port: EnvironmentVariables.Redis.port(),
        password: EnvironmentVariables.Redis.password(),
        isUsingSecureConnection:
          EnvironmentVariables.Redis.useSecureConnection(),
      })
    );
  }

  return redisClient;
}
