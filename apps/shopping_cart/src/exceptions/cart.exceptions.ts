import { BCGSession } from '../core/auth/session.type';
import { Item } from '../models/item.model';

export enum CART_EXCEPTIONS {
  INVALID_QUANTITY = 'carts/invalid_quantity',
  NOT_FOUND = 'carts/not_found',
  ITEM_NOT_FOUND = 'carts/item_not_found',
}

interface CartInvalidQuantityExceptionData {
  quantity: any;
}
type CartInvalidQuantityException =
  BCGBaseException<CartInvalidQuantityExceptionData>;
export const buildCartInvalidQuantityException = (
  data: CartInvalidQuantityExceptionData
): CartInvalidQuantityException => ({
  code: CART_EXCEPTIONS.INVALID_QUANTITY,
  message: 'Quantity should be greater than 0',
  data,
});

interface CartNotFoundExceptionData {
  sessionID: BCGSession['id'];
}
type CartNotFoundException = BCGBaseException<CartNotFoundExceptionData>;
export const buildCartNotFoundException = (
  data: CartNotFoundExceptionData
): CartNotFoundException => ({
  code: CART_EXCEPTIONS.NOT_FOUND,
  message: 'Cart not found or empty',
  data,
});

interface ItemNotFoundInCartExceptionData {
  sku: Item['sku'];
}
type ItemNotFoundInCartException =
  BCGBaseException<ItemNotFoundInCartExceptionData>;
export const buildItemNotFoundInCartException = (
  data: ItemNotFoundInCartExceptionData
): ItemNotFoundInCartException => ({
  code: CART_EXCEPTIONS.ITEM_NOT_FOUND,
  message: 'No item found in the cart for the SKU provided',
  data,
});
