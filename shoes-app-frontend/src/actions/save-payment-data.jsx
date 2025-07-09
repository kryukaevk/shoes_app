import { ACTION_TYPE } from './action-type';

export const savePaymentData = (paymentData) => ({
     type: ACTION_TYPE.SAVE_PAYMENT_DATA,
     payload: paymentData,
});
