export enum CART_EXCEPTIONS {
  INVALID_QUANTITY = 'carts/invalid_quantity',
}

interface CartInvalidQuantityExceptionData {
  quantity: any;
}

interface CartInvalidQuantityException
  extends BCGBaseException<CartInvalidQuantityExceptionData> {}

export const buildCartInvalidQuantityException = (
  data: CartInvalidQuantityExceptionData
): CartInvalidQuantityException => ({
  code: CART_EXCEPTIONS.INVALID_QUANTITY,
  message: 'Quantity should be greater than 0',
  data,
});
