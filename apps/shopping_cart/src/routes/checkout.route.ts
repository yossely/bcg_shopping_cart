import { Router, Request, Response } from 'express';
import { cartService } from '../services/cart.service';
import { buildEmptyCartException } from '../exceptions';
import { checkoutService } from '../services/checkout.service';

export const checkoutRoutes = Router();

checkoutRoutes.post('/', async (req: Request, res: Response) => {
  const cart = await cartService.getBySessionID(req.sessionID);
  if (!cart || !cart.items.length) {
    return res
      .status(400)
      .send(buildEmptyCartException({ sessionID: req.sessionID }));
  }

  const data = await checkoutService.placeOrder(req.sessionID, cart);

  res.send({ data });
});
