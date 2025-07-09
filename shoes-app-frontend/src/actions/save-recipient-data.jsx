import { ACTION_TYPE } from './action-type';

export const saveRecipientData = (recipientData) => ({
     type: ACTION_TYPE.SAVE_RECIPIENT_DATA,
     payload: recipientData,
});
