import { Item } from '../../../models/item.model';
import { redisClient } from '..';

export async function seedItems() {
  const items: Item[] = [
    { sku: '120P90', name: 'Google Home', price: 49.99 },
    { sku: '43N23P', name: 'MacBook Pro', price: 5399.99 },
    { sku: 'A304SD', name: 'Alexa Speaker', price: 109.5 },
    { sku: '344222', name: 'Raspberry Pi', price: 30.0 },
  ];

  for (const item of items) {
    await redisClient.hSet('items', item.sku, JSON.stringify(item));
  }
}
