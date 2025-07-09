import { transformCartData } from '../bff/transformers';
import { setCartData } from './set-cart-data';

export const addToCartAsync =
     (requestServer, productDataFromCart) => (dispatch) =>
          requestServer('saveCartData', productDataFromCart).then(
               (newCartData) => {
                    const cartDataResTransform = transformCartData(
                         newCartData.res
                    );

                    dispatch(setCartData(cartDataResTransform));

                    return newCartData.res;
               }
          );
