import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './user';
import orderReducer from './redux-order';
import singleOrderReducer from './redux-single-order';
import singleProduct from './singleProduct';
import products from './product';
import cartReducer from './localStorage';
import filteredProductsReducer from './filteredProducts';

const reducer = combineReducers({

    products,
    product: singleProduct,
    filteredProducts: filteredProductsReducer,
    user: userReducer,
    order: orderReducer,
    singleOrder: singleOrderReducer,
    cart: cartReducer,


});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducer, middleware);

export default store;
export * from './user';
