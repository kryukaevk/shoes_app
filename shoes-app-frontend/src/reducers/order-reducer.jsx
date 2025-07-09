import { ACTION_TYPE } from '../actions';

export const initialOrderState = {
     recipient: {
          name: '',
          surname: '',
          phone: '',
          email: '',
     },
     delivery: {
          deliveryType: 'courier',
          address: '',
          pickupPoint: { id: '', address: '' },
     },
     payment: {
          paymentMethod: 'cash',
     },
     orderData: {
          items: [],
          totalSum: 0,
          allQuantity: 0,
     },
};

export const orderReducer = (state = initialOrderState, action) => {
     switch (action.type) {
          case ACTION_TYPE.SAVE_RECIPIENT_DATA:
               return { ...state, recipient: action.payload };
          case ACTION_TYPE.SAVE_DELIVERY_DATA:
               return { ...state, delivery: action.payload };
          case ACTION_TYPE.SAVE_PAYMENT_DATA:
               return { ...state, payment: action.payload };
          case ACTION_TYPE.SAVE_ORDER_DATA:
               return { ...state, orderData: action.payload };
          case ACTION_TYPE.RESET_ORDER_DATA:
               return initialOrderState;
          default:
               return state;
     }
};
