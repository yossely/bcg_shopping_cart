import { Item } from '../../../models/item.model';
import { redisClient } from '..';
import {
  GOOGLE_HOME_SKU,
  MACBOOK_PRO_SKU,
  ALEXA_SKU,
  RASPBERRY_PI_SKU,
} from '../constants';

export async function seedItems() {
  const items: Item[] = [
    { sku: GOOGLE_HOME_SKU, name: 'Google Home', price: 49.99 },
    { sku: MACBOOK_PRO_SKU, name: 'MacBook Pro', price: 5399.99 },
    { sku: ALEXA_SKU, name: 'Alexa Speaker', price: 109.5 },
    { sku: RASPBERRY_PI_SKU, name: 'Raspberry Pi', price: 30.0 },
  ];

  for (const item of items) {
    await redisClient.hSet('items', item.sku, JSON.stringify(item));
  }
}
