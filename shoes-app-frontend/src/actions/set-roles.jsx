import { ACTION_TYPE } from './action-type';

export const setRoles = (roles) => ({
     type: ACTION_TYPE.SET_ROLES,
     payload: roles,
});
