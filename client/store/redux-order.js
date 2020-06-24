import axios from 'axios';
import getSingleOrder from './redux-single-order';

// [] Get all orders for a certain User

/**
 * ACTION TYPES
 */
export const GET_ORDERS = 'GET_ORDERS';

/**
 * ACTION CREATORS
 */
export const getOrders = (orders) => ({ type: GET_ORDERS, orders });

//

/**
 * THUNK CREATORS
 */
// get only the orders that belong to the user

export const fetchOrders = (userId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/users/${userId}/orders/`);
    dispatch(getOrders(data));
  } catch (error) {
    console.log(error, 'Cool cliques throw bricks but seldom hit targets.');
  }
};
export const fetchUserOrder = (orderId) => async (dispatch) => {
  //this request is sending a literal string and one piece of the string is a variable which is why you need this syntax
  //I need to define my address because I need to specify what I want from the database
  // I need to account for when :id changes.
  try {
    const res = await axios.get(`/api/orders/${orderId}`);
    dispatch(getSingleOrder(res.data));
  } catch (error) {
    console.log(error, 'Cool cliques throw bricks but seldom hit targets.');
  }
};
// --------------------------------------------------------------------

//get order id from the url params
/**
 * INITIAL STATE
 */
const initialState = [];
/**
 * REDUCER
 */

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
