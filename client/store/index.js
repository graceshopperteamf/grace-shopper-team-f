import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userReducer from './user';
import orderReducer from './redux-order';
import singleOrderReducer from './redux-single-order';
import products from './product';

const reducer = combineReducers({
  products,
  user: userReducer,
  order: orderReducer,
  singleOrder: singleOrderReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './user';
