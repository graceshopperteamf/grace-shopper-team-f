import axios from 'axios';

// Get all orders for a certain User
// For Admin only
/**
 * ACTION TYPES
 */
export const GET_ORDER = 'GET_ORDER';

/**
 * ACTION CREATORS
 */
export const getSingleOrder = (order) => ({ type: GET_ORDER, order });

//

/**
 * THUNK CREATORS
 */
export const fetchSingleOrder = (orderId) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/api/orders/${orderId}`);
    dispatch(getSingleOrder(data));
  } catch (error) {
    console.log(error, 'Cool cliques throw bricks but seldom hit targets.');
  }
};
/**
 * INITIAL STATE
 */
const initialState = [];
/**
 * REDUCER
 */

export default function singleOrderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDER:
      return action.order;
    default:
      return state;
  }
}
