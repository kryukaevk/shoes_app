import { request } from '../utils';
import { setCustomerOrders } from './set-customer-orders';
import { setCustomerOrdersError } from './set-customer-orders-error';
import { startLoading } from './start-loading';
import { stopLoading } from './stop-loading';

export const loadCustomerOrdersAsync = () => (dispatch) => {
     dispatch(startLoading());
     request('/orders')
          .then((response) => {
               if (response.error) {
                    dispatch(setCustomerOrdersError(response.error));
                    dispatch(setCustomerOrders([]));
               } else {
                    dispatch(setCustomerOrders(response.data || []));
                    dispatch(setCustomerOrdersError(null));
               }
               dispatch(stopLoading());
          })
          .catch((error) => {
               dispatch(
                    setCustomerOrdersError(error.message || 'Ошибка сервера')
               );
               dispatch(setCustomerOrders([]));
               dispatch(stopLoading());
          });
};
