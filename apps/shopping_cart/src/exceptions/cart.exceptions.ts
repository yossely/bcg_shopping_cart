import { BCGSession } from '../core/auth/session.type';
import { Item } from '../models/item.model';

export enum CART_EXCEPTIONS {
  INVALID_QUANTITY = 'carts/invalid_quantity',
  EMPTY = 'carts/empty',
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

interface EmptyCartExceptionData {
  sessionID: BCGSession['id'];
}
type EmptyCartException = BCGBaseException<EmptyCartExceptionData>;
export const buildEmptyCartException = (
  data: EmptyCartExceptionData
): EmptyCartException => ({
  code: CART_EXCEPTIONS.EMPTY,
  message: 'The cart is empty',
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
