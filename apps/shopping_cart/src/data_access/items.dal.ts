import { redisClient } from '../core/database';
import { Item } from '../models/item.model';

export const itemsDal = {
  getAll,
  getBySku,
};

async function getAll(): Promise<Item[]> {
  const items = await redisClient.hGetAll('items');

  const itemObjects = Object.values(items).map((item) => JSON.parse(item));

  return itemObjects;
}

async function getBySku(sku: Item['sku']): Promise<Item> {
  return redisClient
    .hGet('items', sku)
    .then((itemString) => {
      if (itemString) {
        return JSON.parse(itemString);
      } else {
        return null;
      }
    })
    .catch((error) => {
      console.log('Failed to get item by SKU', { sku, error });
      return null;
    });
}
