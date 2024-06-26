import { itemsDal } from '../data_access/items.dal';
import { Cart } from '../models/cart.model';
import { Item } from '../models/item.model';
import { BCGSession } from '../core/auth/session.type';
import { cartsDal } from '../data_access/carts.dal';
import { deepCopy } from '../utils';
import {
  GOOGLE_HOME_SKU,
  ALEXA_SKU,
  MACBOOK_PRO_SKU,
  RASPBERRY_PI_SKU,
} from '../core/database/constants';

const getEmptyCart = (): Cart => ({ items: [], totalPrice: 0 });

export const cartService = {
  addItem,
  getBySessionID,
};

async function addItem(
  session: BCGSession,
  item: Item,
  quantity: number
): Promise<Cart> {
  let cart = await cartsDal.getBySessionID(session.id);

  if (!cart) {
    // initialize session with an empty cart
    cart = getEmptyCart();
    session.cart = cart;
  }

  pushItemToCart(cart, item, quantity);

  // TODO: apply only promotions that are applicable to the current item
  cart = await applyPromotions(cart);
  cart.totalPrice = calculateTotal(cart);

  await cartsDal.setCartForSessionID(session.id, cart);

  return cart;
}

const applyPromotions = async (cart: Cart): Promise<Cart> => {
  const updatedCart = deepCopy(cart);

  applyGoogleHomePromotions(updatedCart);
  applyAlexaPromotions(updatedCart);
  await applyMacBookPromotions(updatedCart);

  return updatedCart;
};

const applyGoogleHomePromotions = (cart: Cart): Cart => {
  const googleHomeItems = cart.items.find(
    (cartItem) => cartItem.sku === GOOGLE_HOME_SKU
  );

  if (googleHomeItems) {
    const toChargeGoogleHome =
      googleHomeItems.quantity - Math.floor(googleHomeItems.quantity / 3);
    googleHomeItems.totalPrice = toChargeGoogleHome * googleHomeItems.price;
  }

  return cart;
};

const applyAlexaPromotions = (cart: Cart): Cart => {
  const alexaItems = cart.items.find((cartItem) => cartItem.sku === ALEXA_SKU);

  if (alexaItems) {
    if (alexaItems.quantity >= 3) {
      alexaItems.totalPrice = alexaItems.quantity * alexaItems.price * 0.9;
    } else {
      alexaItems.totalPrice = alexaItems.quantity * alexaItems.price;
    }
  }

  return cart;
};

const applyMacBookPromotions = async (cart: Cart) => {
  let macBookProItems = cart.items.find(
    (cartItem) => cartItem.sku === MACBOOK_PRO_SKU
  );
  let raspberryPiItems = cart.items.find(
    (cartItem) => cartItem.sku === RASPBERRY_PI_SKU
  );
  let macBookQty = macBookProItems?.quantity || 0;
  let raspberryQty = raspberryPiItems?.quantity || 0;

  if (macBookQty > raspberryQty) {
    const raspberryItem = await itemsDal.getBySku(RASPBERRY_PI_SKU);
    pushItemToCart(cart, raspberryItem, macBookQty - raspberryQty);
  }

  if (macBookProItems) {
    macBookProItems.totalPrice =
      macBookProItems.quantity * macBookProItems.price;
  }

  raspberryPiItems = cart.items.find(
    (cartItem) => cartItem.sku === RASPBERRY_PI_SKU
  );
  if (raspberryPiItems) {
    raspberryPiItems.totalPrice =
      (raspberryPiItems.quantity - macBookQty) * raspberryPiItems.price;
  }
};

const calculateTotal = (cart: Cart): number => {
  return cart.items.reduce((total, item) => total + item.totalPrice, 0);
};

const pushItemToCart = (cart: Cart, item: Item, quantity: number) => {
  const itemInCart = cart.items.find((cartItem) => cartItem.sku === item.sku);
  if (itemInCart) {
    itemInCart.quantity += quantity;
    itemInCart.totalPrice = itemInCart.quantity * item.price;
  } else {
    cart.items.push({
      ...item,
      quantity,
      totalPrice: quantity * item.price,
    });
  }
};

async function getBySessionID(sessionID: string): Promise<Cart> {
  const cart = await cartsDal.getBySessionID(sessionID);
  return cart || getEmptyCart();
}
