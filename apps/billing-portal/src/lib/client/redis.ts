import redis from 'redis';

export interface RedisClientOptions extends redis.ClientOpts {
  isUsingSecureConnection?: boolean;
}

/**
 * This
 * @param isUsingSecureConnection
 * @param options
 */
export default function getClient({
  isUsingSecureConnection = false,
  ...options
}: RedisClientOptions): redis.RedisClient {
  const client = redis.createClient({
    tls: isUsingSecureConnection
      ? {
          servername: options.host,
        }
      : undefined,
    ...options,
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
