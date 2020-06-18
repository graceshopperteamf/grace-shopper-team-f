import { expect } from 'chai';
import { fetchProductsFromServer } from './product';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import { createRandomProduct } from '../../script/seed';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('thunk creators', () => {
    let store;
    let mockAxios;

    const initialState = {
        products: [],
    };

    beforeEach(() => {
        mockAxios = new MockAdapter(axios);
        store = mockStore(initialState);
    });

    afterEach(() => {
        mockAxios.restore();
        store.clearActions();
    });

    const products = [
        {
            title: 'Black is Beautiful',
            price: 7500,
            image: 'Black_is_beautiful.jpg',
            type: 'Unique Artwork',
        },
        {
            title: 'Fraternity',
            price: 7500,
            image: 'Fraternity.jpg',
            type: 'Unique Artwork',
        },
        {
            title: 'Shades of Pride',
            price: 7500,
            image: 'Shades_of_Pride.jpg',
            type: 'Unique Artwork',
        },
    ];

    describe('fetchProductsFromServer', () => {
        it('eventually dispatches the GET PRODUCTS action', async () => {
            mockAxios.onGet('/api/products').replyOnce(200, products);
            await store.dispatch(fetchProductsFromServer());

            const actions = store.getActions();

            expect(actions[0].type).to.be.equal('GET_PRODUCTS');
            expect(actions[0].products).to.be.deep.equal(products);
        });
    });
});
