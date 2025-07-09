import { request } from '../utils';

export const handlerServerForCatalogMini = (
     setProducts,
     debouncedSearchPhrase = ''
) => {
     return request(`/products?search=${debouncedSearchPhrase}`).then(
          ({ data }) => {
               setProducts(data);
          }
     );
};
