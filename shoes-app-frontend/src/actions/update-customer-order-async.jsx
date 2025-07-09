import { request } from '../utils';
import { setCustomerOrders } from './set-customer-orders';

export const updateCustomerOrderAsync =
     (orderId, updates, customerOrders) => (dispatch) => {
          return request(`/orders/${orderId}`, 'PATCH', updates)
               .then((response) => {
                    if (response.error) {
                         throw new Error(response.error);
                    }

                    const updatedOrders = customerOrders.map((order) =>
                         order.id === response.data.id ? response.data : order
                    );

                    dispatch(setCustomerOrders(updatedOrders));
                    return response;
               })
               .catch((error) => {
                    console.error('Error updating order:', error);
                    throw error;
               });
     };
