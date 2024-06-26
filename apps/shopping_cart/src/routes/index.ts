import { Router } from 'express';
import { itemsRoutes } from './items.routes';
import { cartRoutes } from './cart.routes';
import { checkoutRoutes } from './checkout.route';

// Create a new Router instance
export const router = Router();

// Mount the routers
router.use('/items', itemsRoutes);
router.use('/cart', cartRoutes);
router.use('/checkout', checkoutRoutes);
