import { Item } from './item.model';

export interface CartItem extends Item {
  quantity: number;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  totalPrice: number;
}
