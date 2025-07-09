import { request } from '../utils';
import { setProductData } from './set-product-data';

export const saveProductAsync = (id, formData, setInputError) => (dispatch) => {
     const saveRequest = id
          ? request(`/products/${id}`, 'PATCH', formData)
          : request('/products', 'POST', formData);
     return saveRequest
          .then((updatedProduct) => {
               dispatch(setProductData(updatedProduct.data));
               return updatedProduct.data;
          })
          .catch((error) => {
               console.error('Error in saveProductAsync:', error);
               setInputError(error.message);
               throw error;
          });
};
