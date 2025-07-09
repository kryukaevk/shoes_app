import { request } from '../utils';
import { loadCustomerOrdersAsync } from './load-customer-orders-async';

export const removeFromCustomerOrdersAsync = (id) => async (dispatch) => {
     request(`/orders/${id}`, 'DELETE');
     dispatch(loadCustomerOrdersAsync());
};
