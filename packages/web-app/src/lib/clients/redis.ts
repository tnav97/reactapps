import redis from 'redis';
import connectRedis, { RedisStore } from 'connect-redis';
import session from 'express-session';
import {
  ONE_HOUR_IN_MILLISECONDS,
  TWENTY_FOUR_HOURS_IN_SECONDS,
} from '../../constants';

export interface RedisClientOptions extends redis.ClientOpts {
  connectTimeout?: number;
}

export default function getClient({
  host,
  port,
  password,
  connectTimeout = ONE_HOUR_IN_MILLISECONDS, // Default timeout is 1 hour for cached items
}: RedisClientOptions): redis.RedisClient {
  const isUsingSecureConnection = port === 6380;
  const client = redis.createClient({
    host,
    port,
    password,
    tls: isUsingSecureConnection
      ? {
          servername: host,
        }
      : undefined,
    connect_timeout: connectTimeout,
  });

  client.on('ready', () => {
    console.info('REDIS CLIENT: Ready to cache data...');
  });

  client.on('reconnecting', () => {
    console.info('REDIS CLIENT: Reconnecting after losing the connection...');
  });

  client.on('end', () => {
    console.info('REDIS CLIENT: Ending the redis server connection');
  });

  client.on('error', (err: redis.RedisError) => {
    console.error(`REDIS CLIENT: ERROR: ${err.message}`, err.stack);
  });

  return client;
}

export function getRedisStore({
  host,
  port,
  password,
  connectTimeout = TWENTY_FOUR_HOURS_IN_SECONDS, // Default timeout is 24 hours
}: RedisClientOptions): RedisStore {
  const client: redis.RedisClient = getClient({
    host,
    port,
    password,
    connectTimeout,
  });
  const RedisConnector = connectRedis(session);
  // Redis store ttl set in seconds. Defaulting to 24 hours.
  // Reference: https://github.com/tj/connect-redis#ttl
  return new RedisConnector({
    host,
    port,
    client,
    ttl: TWENTY_FOUR_HOURS_IN_SECONDS,
  });
}
