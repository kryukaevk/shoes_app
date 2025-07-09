import { ACTION_TYPE } from '../actions';

export const initialCustomerOrderState = {
     orders: [],
     error: null,
};

export const customerOrdersReducer = (
     state = initialCustomerOrderState,
     action
) => {
     switch (action.type) {
          case ACTION_TYPE.SET_CUSTOMER_ORDERS:
               return {
                    ...state,
                    orders: action.payload,
               };
          case ACTION_TYPE.SET_CUSTOMER_ORDERS_ERROR:
               return {
                    ...state,
                    customerOrders: [],
                    error: action.payload,
               };
          default:
               return state;
     }
};
