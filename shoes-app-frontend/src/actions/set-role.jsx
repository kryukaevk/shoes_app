import { ACTION_TYPE } from './action-type';

export const setRole = (userId, roleId) => ({
     type: ACTION_TYPE.SET_ROLE,
     payload: { userId, roleId },
});
