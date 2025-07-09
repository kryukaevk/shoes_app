import { request } from '../utils';
import { setProductData } from './set-product-data';
import { startLoading } from './start-loading';
import { stopLoading } from './stop-loading';

export const loadProductAsync = (productId) => (dispatch) => {
     dispatch(startLoading());
     request(`/products/${productId}`)
          .then((productData) => {
               if (productData.data) {
                    dispatch(setProductData(productData.data));
               } else {
                    console.error('Данные продукта не найдены:', productData);
                    dispatch(setProductData(null));
               }
               dispatch(stopLoading());
          })
          .catch((error) => {
               console.error('Ошибка при загрузке продукта:', error);
               dispatch(setProductData(null));
               dispatch(stopLoading());
          });
};
