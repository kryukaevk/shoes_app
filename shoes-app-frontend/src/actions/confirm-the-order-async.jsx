import { request } from '../utils';

export const confirmTheOrderAsync = (
     recipient,
     delivery,
     payment,
     orderData,
     login
) => {
     return request('/orders', 'POST', {
          recipient,
          delivery,
          payment,
          orderData,
          login,
     })
          .then((response) => {
               return response.data;
          })
          .catch((error) => {
               console.error('Ошибка при отправке заказа:', error);
               throw error;
          });
};
