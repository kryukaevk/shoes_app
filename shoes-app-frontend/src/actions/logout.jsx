import { request } from '../utils';
import { ACTION_TYPE } from './action-type';

export const logout = () => async (dispatch) => {
     try {
          await request('/auth/logout', 'POST');
          dispatch({
               type: ACTION_TYPE.LOGOUT,
          });
          localStorage.removeItem('userData');
     } catch (error) {
          console.error('Ошибка при выходе:', error);
     }
};
