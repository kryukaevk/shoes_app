import { ACTION_TYPE } from './action-type';

export const setSelectedCategory = (categoryData) => ({
     type: ACTION_TYPE.SET_SELECTED_CATEGORY,
     payload: categoryData,
});
