import { ACTION_TYPE } from './action-type';

export const updateQuantity = (productId, size, quantity) => ({
     type: ACTION_TYPE.UPDATE_QUANTITY,
     payload: { productId, size, quantity },
});
