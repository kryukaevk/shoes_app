import { ACTION_TYPE } from './action-type';

export const removeFromCart = (productId, size) => {
     return (dispatch, getState) => {
          const { cart } = getState();
          const updatedItems = cart.items.filter(
               (item) => !(item.productId === productId && item.size === size)
          );

          dispatch({
               type: ACTION_TYPE.REMOVE_FROM_CART,
               payload: updatedItems,
          });

          localStorage.setItem('cart', JSON.stringify(updatedItems));
     };
};
