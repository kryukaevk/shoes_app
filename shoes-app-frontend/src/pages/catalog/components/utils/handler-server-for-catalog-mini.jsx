export const handlerServerForCatalogMini = (
     requestServer,
     setProducts,
     debouncedSearchPhrase = ''
) => {
     return requestServer('fetchProducts', debouncedSearchPhrase).then(
          ({ res }) => {
               setProducts(res.products);
          }
     );
};
