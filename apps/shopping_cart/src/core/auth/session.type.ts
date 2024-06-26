import { Session } from 'express-session';
import { Cart } from '../../models/cart.model';

export interface BCGSession extends Session {
  cart?: Cart;
}
