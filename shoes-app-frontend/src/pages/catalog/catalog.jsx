import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Pagination, ProductCard, SearchMobile } from './components';
import { useDispatch, useSelector } from 'react-redux';
import {
     selectCategoryId,
     selectIsLoading,
     selectMaxPrice,
     selectMinPrice,
     selectSeasonId,
} from '../../selectors';
import { IsLoadingPage } from '../../components/IsLoading';
import { Breadcrumbs } from '../../components';
import { PAGINATION_LIMIT } from '../../constants';
import { selectProducts } from '../../selectors';
import { Filter } from '../filter/filter';
import {
     handlerServerForCatalog,
     setMaxPrice,
     setMinPrice,
     setSelectedCategory,
     setSelectedSeason,
} from '../../actions';

const SearchMainStyled = styled(SearchMobile)`
     position: absolute;

     display: none;

     @media (max-width: 770px) {
          display: block;
          position: absolute;
          border: 1px solid black;
          left: 250px;
          top: 108px;
     }

     @media (max-width: 480px) {
          left: 110px;
     }
`;

const CatalogContainer = ({ className }) => {
     const [page, setPage] = useState(1);
     const [lastPage, setLastPage] = useState(1);
     const productsObject = useSelector(selectProducts);
     const products = Array.isArray(productsObject.products)
          ? productsObject.products
          : [];
     const isLoading = useSelector(selectIsLoading);
     const dispatch = useDispatch();
     const selectedCategory = useSelector(selectCategoryId);
     const selectedSeason = useSelector(selectSeasonId);
     const minPrice = useSelector(selectMinPrice);
     const maxPrice = useSelector(selectMaxPrice);
     const [selectedSize, setSelectedSize] = useState('');
     const priceRange = [0, 15000];

     useEffect(() => {
          dispatch(setSelectedCategory(''));
          dispatch(setSelectedSeason(''));
          dispatch(setMinPrice(0));
          dispatch(setMaxPrice(15000));
          setSelectedSize('');
          setPage(1);
     }, [dispatch]);

     useEffect(() => {
          setPage(1);
     }, [selectedCategory, selectedSeason, minPrice, maxPrice, selectedSize]);

     useEffect(() => {
          dispatch(
               handlerServerForCatalog(
                    page,
                    PAGINATION_LIMIT,
                    setLastPage,
                    selectedCategory,
                    selectedSeason,
                    minPrice,
                    maxPrice,
                    selectedSize
               )
          );
     }, [
          dispatch,
          page,
          setLastPage,
          selectedCategory,
          selectedSeason,
          minPrice,
          maxPrice,
          selectedSize,
     ]);

     return (
          <div className={className}>
               <Breadcrumbs
                    mainTo="/"
                    homeText="Главная"
                    currentPage="Каталог"
               />
               <SearchMainStyled />
               <Filter
                    className="filter"
                    setSelectedSize={setSelectedSize}
                    products={products}
                    selectedSize={selectedSize}
                    priceRange={priceRange}
               />
               <div className="products-block">
                    <div className="catalog-page">
                         {isLoading ? (
                              <IsLoadingPage />
                         ) : products.length > 0 ? (
                              <div className="products-grid">
                                   {products.map(
                                        ({
                                             id,
                                             title,
                                             imageUrls,
                                             price,
                                             sizes,
                                             comments,
                                        }) => (
                                             <ProductCard
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
                                                  sizes={sizes}
                                                  commentsCount={
                                                       comments.length
                                                  }
                                             />
                                        )
                                   )}
                              </div>
                         ) : (
                              <div className="no-products-list">
                                   Товар не найден
                              </div>
                         )}
                    </div>
               </div>

               {lastPage > 1 && !isLoading && products.length > 0 && (
                    <Pagination
                         page={page}
                         lastPage={lastPage}
                         setPage={setPage}
                    />
               )}
          </div>
     );
};

export const Catalog = styled(CatalogContainer)`
     margin: 0 0 0 10px;
     padding: 0 10px;
     box-sizing: border-box;

     .content-wrapper {
          display: flex;
          flex-direction: column;
          max-width: 1200px;
          margin: 0 auto;
     }

     .filter {
          margin-bottom: 20px;

          @media (max-width: 768px) {
               margin-top: 110px;
               margin-bottom: 15px;
               width: 415px;
          }

          @media (max-width: 480px) {
               margin-top: 110px;
               margin-bottom: 15px;
               width: 265px;
          }
     }

     .products-block {
          padding: 0 0 30px;

          @media (max-width: 768px) {
               padding: 0 0 20px;
          }
     }

     .catalog-page {
          display: flex;
          justify-content: center;
          padding: 20px;
          max-width: 1200px;
          margin: 0 auto;

          @media (max-width: 768px) {
               padding: 15px;
          }

          @media (max-width: 480px) {
               padding: 10px;
          }
     }

     .products-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;

          @media (max-width: 1024px) {
               grid-template-columns: repeat(2, 1fr);
          }

          @media (max-width: 480px) {
               grid-template-columns: 1fr;
               gap: 15px;
          }
     }

     .no-products-list {
          text-align: center;
          font-size: 18px;
          margin-top: 30px;
          color: #888;

          @media (max-width: 480px) {
               font-size: 16px;
               margin-top: 20px;
          }
     }
`;
