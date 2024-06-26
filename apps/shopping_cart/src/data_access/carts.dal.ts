import { BCGSession } from '../core/auth/session.type';
import { redisClient } from '../core/database';
import { REDIS_SESSION_CONSTANT } from '../core/database/constants';
import { Cart } from '../models/cart.model';

export const cartsDal = {
  getBySessionID,
  setCartForSessionID,
};

async function getBySessionID(sessionID: BCGSession['id']): Promise<Cart> {
  const sessionDataString = await redisClient.get(
    `${REDIS_SESSION_CONSTANT}:${sessionID}`
  );

  if (sessionDataString) {
    const session = JSON.parse(sessionDataString);
    return session.cart;
  }

  return null;
}

async function setCartForSessionID(
  sessionID: BCGSession['id'],
  updatedCart: Cart
): Promise<boolean> {
  const sessionDataString = await redisClient.get(
    `${REDIS_SESSION_CONSTANT}:${sessionID}`
  );

  const session: BCGSession = JSON.parse(sessionDataString) || {};
  session.cart = updatedCart;

  return redisClient
    .set(`sess:${sessionID}`, JSON.stringify(session))
    .then(() => {
      console.log('Updated cart for sessionID', { sessionID, updatedCart });
      return true;
    })
    .catch((error) => {
      console.error('Failed to update cart for sessionID', {
        data: { sessionID, updatedCart },
        error,
      });
      return false;
    });
}
