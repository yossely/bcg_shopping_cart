import { CartItem } from './cart.model';

export interface Order {
  id: string;
  createdAt: Date;
  items: CartItem[];
  totalPrice: number;
}
