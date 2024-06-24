import { Router } from 'express';
import itemsRoutes from './items.routes';

// Create a new Router instance
const router = Router();

// Mount the routers
router.use('/items', itemsRoutes);

export default router;
