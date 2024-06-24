import { Router, Request, Response } from 'express';

// New Router instance
const router = Router();

// List items
router.get('/', (req: Request, res: Response) => {
  // TODO: get items from service -> DAL
  res.send([]);
});

export default router;
