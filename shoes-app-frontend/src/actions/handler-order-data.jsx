import { startLoading, stopLoading } from '.';
import { request } from '../utils';

export const handlerOrderData = (setError, setSteps) => async (dispatch) => {
     try {
          dispatch(startLoading());
          request('/order-steps').then((steps) => {
               setSteps(steps.data);
          });
     } catch (err) {
          console.error('Ошибка при загрузке данных заказа:', err);
          setError('Не удалось загрузить данные заказа');
     } finally {
          dispatch(stopLoading());
     }
};
