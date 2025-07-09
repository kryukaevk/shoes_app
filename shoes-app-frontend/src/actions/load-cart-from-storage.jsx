import { ACTION_TYPE } from './action-type';

export const loadCartFromStorage = () => {
     return (dispatch) => {
          const cart = localStorage.getItem('cart');
          const cartItems = cart ? JSON.parse(cart) : [];
          dispatch({
               type: ACTION_TYPE.LOAD_CART_FROM_STORAGE,
               payload: cartItems,
          });
     };
};
