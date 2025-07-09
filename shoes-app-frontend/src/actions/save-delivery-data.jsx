import { ACTION_TYPE } from './action-type';

export const saveDeliveryData = (deliveryData) => ({
     type: ACTION_TYPE.SAVE_DELIVERY_DATA,
     payload: deliveryData,
});
