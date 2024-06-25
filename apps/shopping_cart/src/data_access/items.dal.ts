import { redisClient } from '../core/database';
import { Item } from '../models/item.model';

export const itemsDal = {
  getAll,
};

async function getAll(): Promise<Item[]> {
  const items = await redisClient.hGetAll('items');

  const itemObjects = Object.values(items).map((item) => JSON.parse(item));

  return itemObjects;
}
