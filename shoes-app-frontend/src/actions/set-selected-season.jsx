import { ACTION_TYPE } from './action-type';

export const setSelectedSeason = (seasonData) => ({
     type: ACTION_TYPE.SET_SELECTED_SEASON,
     payload: seasonData,
});
