import axios from 'axios';

const GET_PRODUCTS = 'GET_PRODUCTS';

const defaultProducts = [];

const getProducts = (products) => ({ type: GET_PRODUCTS, products });

export const fetchProductsFromServer = () => async (dispatch) => {
    try {
        const res = await axios.get('/api/products');
        dispatch(getProducts(res.data || defaultProducts));
    } catch (err) {
        console.error(err);
    }
};

export default function (state = defaultProducts, action) {
    switch (action.type) {
        case GET_PRODUCTS:
            return action.products;
        default:
            return state;
    }
}
