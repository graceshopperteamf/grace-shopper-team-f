import axios from 'axios';

const GET_CART = 'GET_CART';

const SET_CART = 'SET_CART';

const defaultCart = [];

const getCart = (cart) => ({ type: GET_CART, cart });

const setCart = (cart) => ({ type: SET_CART, cart });

export const fetchCartFromServer = (userId) => async (dispatch) => {
    try {
        const res = await axios.get(`/api/user/${userId}`);
        dispatch(getCart(res.data || defaultCart));
    } catch (err) {
        console.error(err);
    }
};

export const createCart = (cart) => async (dispatch) => {
    try {
        const res = await axios.post('/api/user', cart);
        dispatch(setCart(res.data || defaultCart));
    } catch (err) {
        console.error(err);
    }
};

export default function (state = defaultCart, action) {
    switch (action.type) {
        case GET_CART:
            return action.cart;
        case SET_CART:
            return action.cart;
        default:
            return state;
    }
}
