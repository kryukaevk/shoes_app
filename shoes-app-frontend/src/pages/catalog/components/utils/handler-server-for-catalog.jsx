import { startLoading, stopLoading } from '../../../../actions';
import { getLastPageFromLinks } from './get-last-page-from-links';
import { setProductsData } from '../../../../actions';

export const handlerServerForCatalog = (
     dispatch,
     requestServer,
     debouncedSearchPhrase = '',
     page = null,
     PAGINATION_LIMIT = null,
     setLastPage = null
) => {
     dispatch(startLoading());
     requestServer(
          'fetchProducts',
          debouncedSearchPhrase,
          page,
          PAGINATION_LIMIT
     ).then(({ res }) => {
          dispatch(setProductsData(res.products));
          setLastPage(getLastPageFromLinks(res.links));
          dispatch(stopLoading());
     });
};
