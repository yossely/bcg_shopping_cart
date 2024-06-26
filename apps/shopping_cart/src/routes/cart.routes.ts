import { Router, Request, Response } from 'express';
import { itemsService } from '../services/items.service';
import { cartService, getEmptyCart } from '../services/cart.service';
import {
  buildItemNotFoundException,
  buildCartInvalidQuantityException,
  buildEmptyCartException,
  buildItemNotFoundInCartException,
} from '../exceptions';

export const cartRoutes = Router();

cartRoutes.get('/', async (req: Request, res: Response) => {
  const cart = await cartService.getBySessionID(req.sessionID);

  res.send({ data: cart || getEmptyCart() });
});

cartRoutes.post('/items/:sku', async (req: Request, res: Response) => {
  const { sku } = req.params;
  const { quantity } = req.body || {};

  const item = await itemsService.getBySku(sku);

  if (!item) {
    return res.status(404).send(buildItemNotFoundException({ sku }));
  }

  if (!Number(quantity) || Number(quantity) <= 0) {
    return res
      .status(400)
      .send(buildCartInvalidQuantityException({ quantity }));
  }

  const updatedCart = await cartService.addItem(req.session, item, quantity);

  res.send({ data: updatedCart });
});

cartRoutes.delete('/items/:sku', async (req: Request, res: Response) => {
  const { sku } = req.params;

  const item = await itemsService.getBySku(sku);
  if (!item) {
    return res.status(404).send(buildItemNotFoundException({ sku }));
  }

  const cart = await cartService.getBySessionID(req.sessionID);
  if (!cart || !cart.items.length) {
    return res
      .status(400)
      .send(buildEmptyCartException({ sessionID: req.sessionID }));
  }

  let itemsInCart = cart.items.find((cartItem) => cartItem.sku === sku);
  if (!itemsInCart) {
    return res.status(404).send(buildItemNotFoundInCartException({ sku }));
  }

  const updatedCart = await cartService.removeItem(req.sessionID, cart, sku);

  res.send({ data: updatedCart });
});
