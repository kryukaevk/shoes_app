import { setCartData } from './set-cart-data';
import { startLoading } from './start-loading';
import { stopLoading } from './stop-loading';

export const loadCartDataAsync = (requestServer, productId) => (dispatch) => {
     dispatch(startLoading());

     requestServer('fetchCartData', productId)
          .then((cartData) => {
               dispatch(setCartData(cartData.res));
               dispatch(stopLoading());
          })
          .catch(() => {
               dispatch(stopLoading());
          });
};
