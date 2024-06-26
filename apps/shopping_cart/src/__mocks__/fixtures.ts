import { BCGSession } from '../core/auth/session.type';
import { Cart } from '../models/cart.model';
import { Item } from '../models/item.model';

export const getBCGSessionMock = (options?: { cart: Cart }): BCGSession => {
  const { cart = null } = options || {};

  return {
    id: 'session-id',
    cookie: {
      originalMaxAge: 7200000,
      expires: new Date(Date.now() + 2 * 60 * 60 * 1000),
      secure: false,
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
    },
    regenerate: jest.fn(),
    destroy: jest.fn(),
    reload: jest.fn(),
    resetMaxAge: jest.fn(),
    save: jest.fn(),
    touch: jest.fn(),
    cart,
  };
};

export const getItemMock = (item?: Partial<Item>): Item => {
  return {
    sku: 'sku1',
    name: 'item1',
    price: 10,
    ...item,
  };
};

export const getCartMock = (cart?: Partial<Cart>): Cart => {
  const item = getItemMock();

  return {
    items: [
      {
        ...item,
        quantity: 1,
        totalPrice: item.price,
      },
    ],
    totalPrice: item.price,
    ...cart,
  };
};
