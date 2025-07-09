import { ACTION_TYPE } from './action-type';

export const openModalOrder = (modalParams) => ({
     type: ACTION_TYPE.OPEN_MODAL_ORDER,
     payload: modalParams,
});
