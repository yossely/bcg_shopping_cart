import { Cart } from '../models/cart.model';
import { Order } from '../models/order.model';
import { BCGSession } from '../core/auth/session.type';
import { cartService } from './cart.service';

export const checkoutService = {
  placeOrder,
};

async function placeOrder(
  sessionID: BCGSession['id'],
  cart: Cart
): Promise<{ cart: Cart; order: Order }> {
  // TODO: create an order from the cart (out of scope)
  const order: Order = {
    id: 'order-id',
    createdAt: new Date(),
    items: cart.items,
    totalPrice: cart.totalPrice,
  };

  const emptyCart = await cartService.clear(sessionID);

  return { cart: emptyCart, order };
}
