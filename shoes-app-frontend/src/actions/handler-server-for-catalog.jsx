import { request } from '../utils';
import { setProductsData } from './set-products-data';
import { startLoading } from './start-loading';
import { stopLoading } from './stop-loading';

export const handlerServerForCatalog =
     (
          page,
          PAGINATION_LIMIT,
          setLastPage,
          categoryId,
          seasonId,
          minPrice,
          maxPrice,
          selectedSize
     ) =>
     (dispatch) => {
          dispatch(startLoading());
          let url = `/products?page=${page}&limit=${PAGINATION_LIMIT}`;
          if (categoryId) {
               url += `&categoryId=${categoryId}`;
          }
          if (seasonId) {
               url += `&seasonId=${seasonId}`;
          }
          if (minPrice) {
               url += `&minPrice=${minPrice}`;
          }
          if (maxPrice) {
               url += `&maxPrice=${maxPrice}`;
          }
          if (selectedSize) {
               url += `&size=${selectedSize}`;
          }
          request(url)
               .then(({ data, lastPage }) => {
                    const products = data;
                    if (selectedSize) {
                         const filteredProducts = products.filter((product) =>
                              product.sizes.includes(selectedSize)
                         );
                         dispatch(setProductsData(filteredProducts));
                    } else {
                         dispatch(setProductsData(products));
                    }
                    setLastPage(lastPage || 1);
                    dispatch(stopLoading());
               })
               .catch((error) => {
                    console.error('Ошибка при загрузке продуктов:', error);
                    dispatch(setProductsData([]));
                    dispatch(stopLoading());
               });
     };
