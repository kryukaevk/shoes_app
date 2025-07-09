import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import {
     appReducer,
     userReducer,
     usersReducer,
     productReducer,
     productsReducer,
     cartReducer,
     orderReducer,
     ordersReducer,
     isLoadingReducer,
     customerOrdersReducer,
} from './reducers';

const reducer = combineReducers({
     app: appReducer,
     user: userReducer,
     users: usersReducer,
     product: productReducer,
     products: productsReducer,
     cart: cartReducer,
     orders: ordersReducer,
     order: orderReducer,
     customerOrders: customerOrdersReducer,
     isLoading: isLoadingReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_COMPOSE__ || compose;

export const store = createStore(
     reducer,
     composeEnhancers(applyMiddleware(thunk))
);
