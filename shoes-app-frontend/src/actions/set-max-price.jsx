import { ACTION_TYPE } from './action-type';

export const setMaxPrice = (maxPriceData) => ({
     type: ACTION_TYPE.SET_MAX_PRICE,
     payload: maxPriceData,
});
