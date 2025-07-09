import { ACTION_TYPE } from '../actions';

const initialProductsState = {
     products: [],
     selectedCategory: '',
     selectedSeason: '',
     maxPrice: '',
     minPrice: '',
};

export const productsReducer = (state = initialProductsState, action) => {
     switch (action.type) {
          case ACTION_TYPE.SET_PRODUCTS_DATA:
               return {
                    ...state,
                    products: action.payload,
               };
          case ACTION_TYPE.SET_SELECTED_CATEGORY:
               return {
                    ...state,
                    selectedCategory: action.payload,
               };
          case ACTION_TYPE.SET_SELECTED_SEASON:
               return {
                    ...state,
                    selectedSeason: action.payload,
               };
          case ACTION_TYPE.SET_MAX_PRICE: {
               return {
                    ...state,
                    maxPrice: action.payload,
               };
          }
          case ACTION_TYPE.SET_MIN_PRICE: {
               return {
                    ...state,
                    minPrice: action.payload,
               };
          }
          default:
               return state;
     }
};
