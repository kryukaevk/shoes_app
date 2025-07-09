import { ACTION_TYPE } from '../actions';
import { saveCartToStorage } from './utils';

export const initialStateCart = {
     items: [],
};

export const cartReducer = (state = initialStateCart, action) => {
     let newState;

     switch (action.type) {
          case ACTION_TYPE.ADD_TO_CART:
               newState = {
                    ...state,
                    items: action.payload.map((item) => ({
                         ...item,
                         totalPrice: item.price * item.quantity,
                    })),
               };
               saveCartToStorage(newState.items);
               return newState;

          case ACTION_TYPE.LOAD_CART_FROM_STORAGE:
               newState = {
                    ...state,
                    items: action.payload.map((item) => ({
                         ...item,
                         totalPrice: item.price * item.quantity,
                    })),
               };
               saveCartToStorage(newState.items);
               return newState;

          case ACTION_TYPE.REMOVE_FROM_CART:
               newState = {
                    ...state,
                    items: action.payload,
               };
               saveCartToStorage(newState.items);
               return newState;

          case ACTION_TYPE.UPDATE_QUANTITY:
               newState = {
                    ...state,
                    items: state.items.map((item) =>
                         item.productId === action.payload.productId &&
                         item.size === action.payload.size
                              ? {
                                     ...item,
                                     quantity: action.payload.quantity,
                                     totalPrice:
                                          item.price * action.payload.quantity,
                                }
                              : item
                    ),
               };
               saveCartToStorage(newState.items);
               return newState;

          case ACTION_TYPE.RESET_CART:
               saveCartToStorage([]);
               return initialStateCart;

          default:
               return state;
     }
};
