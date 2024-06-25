import { Router } from 'express';
import { itemsRoutes } from './items.routes';

// Create a new Router instance
export const router = Router();

// Mount the routers
router.use('/items', itemsRoutes);
