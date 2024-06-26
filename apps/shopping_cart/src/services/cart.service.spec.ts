import { getBCGSessionMock, getItemMock } from '../__mocks__/fixtures';
import { cartsDal } from '../data_access/carts.dal';
import { itemsDal } from '../data_access/items.dal';
import { Cart } from '../models/cart.model';
import { cartService } from './cart.service';
import {
  ALEXA_SKU,
  GOOGLE_HOME_SKU,
  MACBOOK_PRO_SKU,
  RASPBERRY_PI_SKU,
} from '../core/database/constants';
import { Item } from '../models/item.model';

jest.mock('../data_access/carts.dal');
jest.mock('../data_access/items.dal');

describe('CartService', () => {
  const setup = (
    mockedCart: Cart,
    mockedSetCart: boolean,
    mockedItemBySku: Item = getItemMock()
  ) => {
    const getBySessionIDSpy = jest
      .spyOn(cartsDal, 'getBySessionID')
      .mockImplementation(() => {
        return Promise.resolve(mockedCart);
      });

    const setCartForSessionIDSpy = jest
      .spyOn(cartsDal, 'setCartForSessionID')
      .mockImplementation(() => {
        return Promise.resolve(mockedSetCart);
      });

    const getBySkuSpy = jest
      .spyOn(itemsDal, 'getBySku')
      .mockImplementation(() => {
        return Promise.resolve(mockedItemBySku);
      });

    return { getBySessionIDSpy, setCartForSessionIDSpy, getBySkuSpy };
  };

  describe('Add item', () => {
    it('should add item to a session with an empty cart', async () => {
      const { getBySessionIDSpy, setCartForSessionIDSpy } = setup(null, true);
      const session = getBCGSessionMock();
      const item = getItemMock();
      const expectedCart: Cart = {
        items: [
          {
            ...item,
            quantity: 1,
            totalPrice: item.price,
          },
        ],
        totalPrice: item.price,
      };

      const cartResponse = await cartService.addItem(session, item, 1);

      expect(cartResponse).toStrictEqual(expectedCart);
      expect(getBySessionIDSpy).toHaveBeenCalledWith(session.id);
      expect(setCartForSessionIDSpy).toHaveBeenCalledWith(
        session.id,
        cartResponse
      );
    });

    it('should increase quantity to an existing item cart', async () => {
      const session = getBCGSessionMock();
      const item = getItemMock();
      const existingCart: Cart = {
        items: [
          {
            ...item,
            quantity: 1,
            totalPrice: item.price,
          },
        ],
        totalPrice: item.price,
      };
      const expectedCart: Cart = {
        items: [
          {
            ...item,
            quantity: 2,
            totalPrice: item.price * 2,
          },
        ],
        totalPrice: item.price * 2,
      };
      const { setCartForSessionIDSpy } = setup(existingCart, true);

      const cartResponse = await cartService.addItem(session, item, 1);

      expect(cartResponse).toStrictEqual(expectedCart);
      expect(setCartForSessionIDSpy).toHaveBeenCalledWith(
        session.id,
        cartResponse
      );
    });

    it('should add new item on existing cart', async () => {
      const session = getBCGSessionMock();
      const item1 = getItemMock({ sku: 'sku1' });
      const item2 = getItemMock({ sku: 'sku2' });
      const existingCart: Cart = {
        items: [
          {
            ...item1,
            quantity: 1,
            totalPrice: item1.price,
          },
        ],
        totalPrice: item1.price,
      };
      const expectedCart: Cart = {
        items: [
          {
            ...item1,
            quantity: 1,
            totalPrice: item1.price,
          },
          {
            ...item2,
            quantity: 1,
            totalPrice: item2.price,
          },
        ],
        totalPrice: item1.price + item2.price,
      };
      const { setCartForSessionIDSpy } = setup(existingCart, true);

      const cartResponse = await cartService.addItem(session, item2, 1);

      expect(cartResponse).toStrictEqual(expectedCart);
      expect(setCartForSessionIDSpy).toHaveBeenCalledWith(
        session.id,
        cartResponse
      );
    });

    describe('Promotions', () => {
      describe('Google Home', () => {
        it('should not apply promotion', async () => {
          const session = getBCGSessionMock();
          const googleHome = getItemMock({ sku: GOOGLE_HOME_SKU });
          const existingCart: Cart = {
            items: [
              {
                ...googleHome,
                quantity: 1,
                totalPrice: googleHome.price,
              },
            ],
            totalPrice: googleHome.price,
          };
          const expectedCart: Cart = {
            items: [
              {
                ...googleHome,
                quantity: 2,
                totalPrice: googleHome.price * 2,
              },
            ],
            totalPrice: googleHome.price * 2,
          };
          const { setCartForSessionIDSpy } = setup(existingCart, true);

          const cartResponse = await cartService.addItem(
            session,
            googleHome,
            1
          );

          expect(cartResponse).toStrictEqual(expectedCart);
          expect(setCartForSessionIDSpy).toHaveBeenCalledWith(
            session.id,
            cartResponse
          );
        });

        it('should apply promotion', async () => {
          const session = getBCGSessionMock();
          const googleHome = getItemMock({ sku: GOOGLE_HOME_SKU });
          const existingCart: Cart = {
            items: [
              {
                ...googleHome,
                quantity: 2,
                totalPrice: googleHome.price * 2,
              },
            ],
            totalPrice: googleHome.price * 2,
          };
          const expectedCart: Cart = {
            items: [
              {
                ...googleHome,
                quantity: 3,
                totalPrice: googleHome.price * 2,
              },
            ],
            totalPrice: googleHome.price * 2,
          };
          const { setCartForSessionIDSpy } = setup(existingCart, true);

          const cartResponse = await cartService.addItem(
            session,
            googleHome,
            1
          );

          expect(cartResponse).toStrictEqual(expectedCart);
          expect(setCartForSessionIDSpy).toHaveBeenCalledWith(
            session.id,
            cartResponse
          );
        });
      });

      describe('Alexa', () => {
        it('should not apply promotion', async () => {
          const session = getBCGSessionMock();
          const alexa = getItemMock({ sku: ALEXA_SKU });
          const existingCart: Cart = {
            items: [
              {
                ...alexa,
                quantity: 1,
                totalPrice: alexa.price,
              },
            ],
            totalPrice: alexa.price,
          };
          const expectedCart: Cart = {
            items: [
              {
                ...alexa,
                quantity: 2,
                totalPrice: alexa.price * 2,
              },
            ],
            totalPrice: alexa.price * 2,
          };
          const { setCartForSessionIDSpy } = setup(existingCart, true);

          const cartResponse = await cartService.addItem(session, alexa, 1);

          expect(cartResponse).toStrictEqual(expectedCart);
          expect(setCartForSessionIDSpy).toHaveBeenCalledWith(
            session.id,
            cartResponse
          );
        });

        it('should apply promotion', async () => {
          const session = getBCGSessionMock();
          const alexa = getItemMock({ sku: ALEXA_SKU });
          const existingCart: Cart = {
            items: [
              {
                ...alexa,
                quantity: 2,
                totalPrice: alexa.price * 2,
              },
            ],
            totalPrice: alexa.price * 2,
          };
          const expectedCart: Cart = {
            items: [
              {
                ...alexa,
                quantity: 3,
                totalPrice: alexa.price * 3 * 0.9,
              },
            ],
            totalPrice: alexa.price * 3 * 0.9,
          };
          const { setCartForSessionIDSpy } = setup(existingCart, true);

          const cartResponse = await cartService.addItem(session, alexa, 1);

          expect(cartResponse).toStrictEqual(expectedCart);
          expect(setCartForSessionIDSpy).toHaveBeenCalledWith(
            session.id,
            cartResponse
          );
        });
      });

      describe('MacBook Pro', () => {
        it('should not apply promotion if only raspberry in cart', async () => {
          const session = getBCGSessionMock();
          const raspberry = getItemMock({ sku: RASPBERRY_PI_SKU });
          const existingCart: Cart = {
            items: [
              {
                ...raspberry,
                quantity: 1,
                totalPrice: raspberry.price,
              },
            ],
            totalPrice: raspberry.price,
          };
          const expectedCart: Cart = {
            items: [
              {
                ...raspberry,
                quantity: 2,
                totalPrice: raspberry.price * 2,
              },
            ],
            totalPrice: raspberry.price * 2,
          };
          const { setCartForSessionIDSpy } = setup(existingCart, true);

          const cartResponse = await cartService.addItem(session, raspberry, 1);

          expect(cartResponse).toStrictEqual(expectedCart);
          expect(setCartForSessionIDSpy).toHaveBeenCalledWith(
            session.id,
            cartResponse
          );
        });

        it('should add free raspberry if MacBook Pro is in cart', async () => {
          const session = getBCGSessionMock();
          const raspberry = getItemMock({ sku: RASPBERRY_PI_SKU });
          const macBook = getItemMock({ sku: MACBOOK_PRO_SKU });
          const expectedCart: Cart = {
            items: [
              {
                ...macBook,
                quantity: 1,
                totalPrice: macBook.price,
              },
              {
                ...raspberry,
                quantity: 1,
                totalPrice: 0,
              },
            ],
            totalPrice: macBook.price,
          };
          const { setCartForSessionIDSpy } = setup(null, true, raspberry);

          const cartResponse = await cartService.addItem(session, macBook, 1);

          expect(cartResponse).toStrictEqual(expectedCart);
          expect(setCartForSessionIDSpy).toHaveBeenCalledWith(
            session.id,
            cartResponse
          );
        });

        it('should set existing raspberry free on MacBook Pro added to cart', async () => {
          const session = getBCGSessionMock();
          const raspberry = getItemMock({ sku: RASPBERRY_PI_SKU });
          const macBook = getItemMock({ sku: MACBOOK_PRO_SKU });
          const existingCart: Cart = {
            items: [
              {
                ...raspberry,
                quantity: 1,
                totalPrice: raspberry.price,
              },
            ],
            totalPrice: raspberry.price,
          };
          const expectedCart: Cart = {
            items: [
              {
                ...raspberry,
                quantity: 1,
                totalPrice: 0,
              },
              {
                ...macBook,
                quantity: 1,
                totalPrice: macBook.price,
              },
            ],
            totalPrice: macBook.price,
          };
          const { setCartForSessionIDSpy } = setup(
            existingCart,
            true,
            raspberry
          );

          const cartResponse = await cartService.addItem(session, macBook, 1);

          expect(cartResponse).toStrictEqual(expectedCart);
          expect(setCartForSessionIDSpy).toHaveBeenCalledWith(
            session.id,
            cartResponse
          );
        });
      });
    });
  });
});
