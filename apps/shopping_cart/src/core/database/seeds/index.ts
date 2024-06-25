import { seedItems } from './items.seed';

export const seedDB = async () => {
  await seedItems();
};
