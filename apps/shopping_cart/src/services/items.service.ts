import { itemsDal } from '../data_access/items.dal';

export const itemsService = {
  getAll: () => itemsDal.getAll(),
};
