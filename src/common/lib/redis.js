import Redis from 'ioredis';

import { config } from '../config/env-variables.js';

// Create redis connection as a singleton
let redisClientSingleton = null;

/**
 * Creates redis client if no client already exists
 *
 * @returns {Redis}
 */
export const getRedisClient = () => {
  if (!redisClientSingleton) {
    redisClientSingleton = new Redis(config.REDIS_URI);

    // Listen for the 'connect' event
    redisClientSingleton.on('connect', () => {
      // eslint-disable-next-line no-console
      console.log('Redis connected successfully');
    });

    // Listen for the 'error' event
    redisClientSingleton.on('error', err => {
      throw new Error(`Redis must be running, error: ${err}`);
    });
  }

  return redisClientSingleton;
};
