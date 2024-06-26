import { Router, Request, Response } from 'express';
import { itemsService } from '../services/items.service';
import { cartService } from '../services/cart.service';
import {
  buildItemNotFoundException,
  buildCartInvalidQuantityException,
} from '../exceptions';

export const cartRoutes = Router();

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
