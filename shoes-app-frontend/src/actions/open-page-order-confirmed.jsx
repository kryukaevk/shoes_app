import { ACTION_TYPE } from './action-type';

export const openPageOrderConfirmed = (modalParams) => ({
     type: ACTION_TYPE.OPEN_PAGE_ORDER_CONFIRMED,
     payload: modalParams,
});
