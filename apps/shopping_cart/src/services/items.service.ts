import { itemsDal } from '../data_access/items.dal';

export const itemsService = {
  getAll: () => itemsDal.getAll(),
  getBySku: (sku: string) => itemsDal.getBySku(sku),
};
