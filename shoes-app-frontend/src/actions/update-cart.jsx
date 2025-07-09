import { updateQuantity } from './update-quantity';

export const updateCart = (productId, size, newQuantity) => {
     return (dispatch, getState) => {
          dispatch(updateQuantity(productId, size, newQuantity));

          const state = getState();
          const cartItems = state.cart.items;

          localStorage.setItem('cart', JSON.stringify(cartItems));
     };
};
