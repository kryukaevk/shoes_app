import { ACTION_TYPE } from './action-type';

export const setErrorMessage = (error) => ({
     type: ACTION_TYPE.SET_ERROR_MESSAGE,
     payload: error,
});
