import { ACTION_TYPE } from './action-type';

export const saveOrderData = (orderData) => ({
     type: ACTION_TYPE.SAVE_ORDER_DATA,
     payload: orderData,
});
