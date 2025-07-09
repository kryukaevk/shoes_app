import { ACTION_TYPE } from './action-type';

export const setCustomerOrders = (customerOrders) => ({
     type: ACTION_TYPE.SET_CUSTOMER_ORDERS,
     payload: customerOrders,
});
