import { ACTION_TYPE } from './action-type';

export const setOrderAccess = (isAllowed) => ({
     type: ACTION_TYPE.SET_ORDER_ACCESS,
     payload: isAllowed,
});
