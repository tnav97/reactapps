import { RedisClient } from 'redis';
import { promisify } from 'util';

export interface PromisifiedRedis {
  get: (key: string) => Promise<string | null>;
  set: (key: string, timeoutInMs: number, value: string) => Promise<'OK'>;
  del: (key: string) => Promise<number>;
  getAndDelete: (key: string) => Promise<string | null>;
  close: () => void;
  _redis: RedisClient;
}

export function promisifyRedis(redis: RedisClient): PromisifiedRedis {
  return {
    get: promisify(redis.get).bind(redis),
    set: promisify(redis.psetex).bind(redis),
    del: promisify(redis.del).bind(redis),
    getAndDelete: async function (key: string) {
      // This emulates Redis 6's GETDEL command
      // For lower versions because our prod Redis is Redis 4
      const value = await this.get(key);
      if (value) {
        await this.del(key);
      }
      return value;
    },
    close: () => redis.end(true),
    _redis: redis,
  };
}
