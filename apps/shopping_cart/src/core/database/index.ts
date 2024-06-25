import { createClient } from 'redis';

export const redisClient = createClient({
  url: `redis://${process.env.DB_HOST}:${process.env.DB_PORT}`,
});

redisClient.connect().catch((e) => {
  console.error('Failed to connect to Redis', e);
});
