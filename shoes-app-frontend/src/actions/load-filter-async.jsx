import { setProductsData } from './set-products-data';
import { startLoading } from './start-loading';
import { stopLoading } from './stop-loading';

export const loadFilterAsync = (requestServer, categoryId) => (dispatch) => {
     dispatch(startLoading());
     requestServer('fetchProducts', '', null, null, categoryId)
          .then((productsData) => {
               dispatch(setProductsData(productsData.res));
               dispatch(stopLoading());
          })
          .catch(() => {
               dispatch(stopLoading());
          });
};
