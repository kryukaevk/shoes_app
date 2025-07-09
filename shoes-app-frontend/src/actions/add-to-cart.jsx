import { ACTION_TYPE } from './action-type';

export const addToCart = (product) => {
     return (dispatch, getState) => {
          const { cart } = getState();
          const existingItem = cart.items.find(
               (item) =>
                    item.productId === product.productId &&
                    item.size === product.size
          );

          let updatedItems;
          if (existingItem) {
               updatedItems = cart.items.map((item) =>
                    item.productId === product.productId &&
                    item.size === product.size
                         ? { ...item, quantity: item.quantity + 1 }
                         : item
               );
          } else {
               updatedItems = [...cart.items, product];
          }

          dispatch({
               type: ACTION_TYPE.ADD_TO_CART,
               payload: updatedItems,
          });

          localStorage.setItem('cart', JSON.stringify(updatedItems));
     };
};
