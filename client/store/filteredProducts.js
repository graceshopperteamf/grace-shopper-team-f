import axios from 'axios';

const GET_SELECT_PRODUCTS = 'GET_SELECT_PRODUCTS';

const getSelectProducts = (filteredProducts) => ({
    type: GET_SELECT_PRODUCTS,
    filteredProducts,
});

const defaultProducts = [];

export const fetchFilteredProductsFromServer = (objectOfIds) => async (
    dispatch
) => {
    try {
        const res = await axios.post('/api/products', objectOfIds);
        dispatch(getSelectProducts(res.data));
    } catch (err) {
        console.error(err);
    }
};

export default function (state = defaultProducts, action) {
    switch (action.type) {
        case GET_SELECT_PRODUCTS:
            return action.filteredProducts;
        default:
            return state;
    }
}
