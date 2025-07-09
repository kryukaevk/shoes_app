import { ACTION_TYPE } from './action-type';

export const setMinPrice = (minPriceData) => ({
     type: ACTION_TYPE.SET_MIN_PRICE,
     payload: minPriceData,
});
