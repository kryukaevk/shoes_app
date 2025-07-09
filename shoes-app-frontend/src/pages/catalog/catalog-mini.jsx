import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ProductMiniCard } from './components';
import { IsLoadingPage } from '../../components/IsLoading';
import { handlerServerForCatalogMini } from '../../actions';

const CatalogMiniContainer = ({
     className,
     debouncedSearchPhrase,
     hideCatalog,
}) => {
     const [products, setProducts] = useState([]);
     const [isLoading, setIsLoading] = useState(false);

     useEffect(() => {
          if (!debouncedSearchPhrase) {
               setProducts([]);
               setIsLoading(false);
               return;
          }

          setIsLoading(true);
          handlerServerForCatalogMini(
               setProducts,
               debouncedSearchPhrase
          ).finally(() => setIsLoading(false));
     }, [debouncedSearchPhrase]);

     return (
          <div className={className}>
               <div className="catalog-page">
                    {isLoading ? (
                         <IsLoadingPage />
                    ) : products.length ? (
                         <div className="products-grid">
                              {products.map(
                                   ({ id, title, imageUrls, price }) => (
                                        <ProductMiniCard
                                             key={id}
                                             id={id}
                                             title={title}
                                             imageUrl={
                                                  imageUrls &&
                                                  imageUrls.length > 0
                                                       ? imageUrls[0]
                                                       : ''
                                             }
                                             price={price}
                                             hideCatalog={hideCatalog}
                                        />
                                   )
                              )}
                         </div>
                    ) : (
                         <div className="no-products-list">Товар не найден</div>
                    )}
               </div>
          </div>
     );
};

export const CatalogMini = styled(CatalogMiniContainer)`
     position: absolute;
     top: 55px;
     left: 7px;
     width: 347px;
     max-height: 50vh;
     border: 1px solid #ddd;
     border-radius: 8px;
     padding: 10px;
     background: #fff;
     overflow: auto;
     z-index: 30;

     display: grid;
     grid-template-columns: 1fr;

     @media (max-width: 768px) {
          left: -54px;
          top: 39px;
     }

     .catalog-page {
          padding: 5px;
     }

     .products-grid {
          display: flex;
          flex-direction: column;
          gap: 5px;
     }

     .no-products-list {
          text-align: center;
          font-size: 12px;
          margin-top: 10px;
     }
`;
