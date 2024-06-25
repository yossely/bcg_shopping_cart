import { Router, Request, Response } from 'express';
import { itemsService } from '../services/items.service';

export const itemsRoutes = Router();

// List items
itemsRoutes.get('/', async (req: Request, res: Response) => {
  const items = await itemsService.getAll();

  res.send({ data: items });
});
