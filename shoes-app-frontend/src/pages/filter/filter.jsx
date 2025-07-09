import styled from 'styled-components';
import { useCategoriesValue, useSeasonsValue } from '../../hooks';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../components';
import {
     selectCategoryId,
     selectMaxPrice,
     selectMinPrice,
     selectSeasonId,
} from '../../selectors';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useCallback, useEffect, useState } from 'react';
import {
     setSelectedCategory,
     setSelectedSeason,
     setMinPrice,
     setMaxPrice,
} from '../../actions';

const FilterContainer = ({
     className,
     setSelectedSize,
     products,
     selectedSize,
     priceRange,
}) => {
     const dispatch = useDispatch();

     const selectedCategory = useSelector(selectCategoryId);
     const selectedSeason = useSelector(selectSeasonId);

     const categories = useCategoriesValue();
     const seasons = useSeasonsValue();

     const maxPrice = useSelector(selectMaxPrice);
     const minPrice = useSelector(selectMinPrice);

     const [currentPrice, setCurrentPrice] = useState([
          minPrice || priceRange[0],
          maxPrice || priceRange[1],
     ]);

     useEffect(() => {
          setCurrentPrice([
               minPrice || priceRange[0],
               maxPrice || priceRange[1],
          ]);
     }, [minPrice, maxPrice, priceRange]);

     const allSizesArray = [
          ...new Set(products.flatMap((product) => product.sizes)),
     ].sort((a, b) => Number(a) - Number(b));

     const onPriceChange = useCallback((value) => {
          setCurrentPrice(value);
     }, []);

     const onPriceChangeComplete = useCallback(
          (value) => {
               if (value[0] !== minPrice || value[1] !== maxPrice) {
                    dispatch(setMinPrice(value[0]));
                    dispatch(setMaxPrice(value[1]));
               }
          },
          [dispatch, minPrice, maxPrice]
     );

     const onReset = () => {
          dispatch(setSelectedCategory(''));
          dispatch(setSelectedSeason(''));
          setCurrentPrice([priceRange[0], priceRange[1]]);
          dispatch(setMinPrice(priceRange[0]));
          dispatch(setMaxPrice(priceRange[1]));
          setSelectedSize('');
     };

     return (
          <div className={className}>
               <div className="filter-block">
                    <h3>Фильтры</h3>
                    <div className="price-filter">
                         <h5>Цена:</h5>
                         <Slider
                              range
                              min={priceRange[0]}
                              max={priceRange[1]}
                              value={currentPrice}
                              onChange={onPriceChange}
                              onChangeComplete={onPriceChangeComplete}
                              trackStyle={{
                                   backgroundColor: '#007bff',
                                   height: 6,
                              }}
                              handleStyle={{
                                   borderColor: '#007bff',
                                   backgroundColor: '#fff',
                                   height: 16,
                                   width: 16,
                                   marginTop: -5,
                                   boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                              }}
                              railStyle={{
                                   backgroundColor: '#e0e0e0',
                                   height: 6,
                              }}
                         />
                         <div className="price-range">
                              <span>{currentPrice[0]} ₽</span>
                              <span>{currentPrice[1]} ₽</span>
                         </div>
                    </div>
                    <select
                         value={selectedSeason}
                         onChange={(e) =>
                              dispatch(setSelectedSeason(e.target.value))
                         }
                         className="season-select"
                    >
                         <option value="" disabled>
                              Выберите сезон
                         </option>
                         {seasons.map(({ id, name }) => (
                              <option key={id} value={id}>
                                   {name}
                              </option>
                         ))}
                    </select>
                    <select
                         value={selectedCategory}
                         onChange={(e) =>
                              dispatch(setSelectedCategory(e.target.value))
                         }
                         className="category-select"
                    >
                         <option value="" disabled>
                              Выберите пол
                         </option>
                         {categories.map(({ id, name }) => (
                              <option key={id} value={id}>
                                   {name}
                              </option>
                         ))}
                    </select>
                    <select
                         value={selectedSize}
                         onChange={(e) => setSelectedSize(e.target.value)}
                         className="size-select"
                    >
                         <option value="" disabled>
                              Выберите размер
                         </option>
                         {allSizesArray.map((size) => (
                              <option key={size} value={size}>
                                   {size}
                              </option>
                         ))}
                    </select>
                    <Button className="reset-button" onClick={onReset}>
                         Сбросить
                    </Button>
               </div>
          </div>
     );
};

export const Filter = styled(FilterContainer)`
     position: absolute;
     top: 120px;
     left: 20px;
     width: 280px;
     height: auto;
     border: none;
     border-radius: 12px;
     padding: 20px;
     background: #ffffff;
     box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
     z-index: 10;
     transition: transform 0.3s ease;

     .filter-block {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
     }

     h3 {
          font-size: 20px;
          font-weight: 600;
          color: #333;
          margin: 0 0 8px;
     }

     h5 {
          font-size: 14px;
          font-weight: 500;
          color: #555;
          margin: 0 0 12px;
     }

     .season-select,
     .category-select,
     .size-select {
          width: 100%;
          height: 44px;
          padding: 10px 14px;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          font-size: 15px;
          font-weight: 400;
          color: #333;
          background: #f8f9fa;
          transition:
               border-color 0.3s ease,
               background 0.3s ease,
               box-shadow 0.3s ease;

          &:hover {
               border-color: #007bff;
               background: #fff;
               cursor: pointer;
          }

          &:focus {
               outline: none;
               border-color: #007bff;
               background: #fff;
               box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
          }
     }

     .price-filter {
          margin-top: 0;
     }

     .price-range {
          display: flex;
          justify-content: space-between;
          margin-top: 12px;
          font-size: 14px;
          font-weight: 500;
          color: #333;
     }

     .reset-button {
          width: 100%;
          height: 44px;
          font-size: 15px;
          font-weight: 500;
          color: #fff;
          background: #ff4d4f;
          border: none;
          border-radius: 8px;
          transition:
               background 0.3s ease,
               transform 0.2s ease;

          &:hover {
               background: #e63946;
               transform: scale(1.02);
          }

          &:active {
               transform: scale(0.98);
          }
     }

     @media (max-width: 770px) {
          position: static;
          width: 100%;
          max-width: 500px;
          margin: 20px auto;
          padding: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
     }

     @media (max-width: 480px) {
          padding: 12px;
          border-radius: 10px;

          .season-select,
          .category-select,
          .size-select {
               font-size: 14px;
               height: 40px;
               padding: 8px 12px;
          }

          h3 {
               font-size: 18px;
          }

          h5 {
               font-size: 13px;
          }

          .reset-button {
               height: 40px;
               font-size: 14px;
          }
     }
`;
