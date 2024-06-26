import { Item } from '../models/item.model';

export enum ITEMS_EXCEPTIONS {
  NOT_FOUND = 'items/not_found',
}

interface ItemNotFoundExceptionData {
  sku: Item['sku'];
}

interface ItemNotFoundException
  extends BCGBaseException<ItemNotFoundExceptionData> {}

export const buildItemNotFoundException = (
  data: ItemNotFoundExceptionData
): ItemNotFoundException => ({
  code: ITEMS_EXCEPTIONS.NOT_FOUND,
  message: 'Item not found',
  data,
});
