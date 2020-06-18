import { expect } from 'chai';

import {GET_ORDERS } from './redux-order';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Redux - Order', () => {
  let testStore;
  let mockAxios;
  const orders = [];
  // is product inside the order? We need to discuss how the product is getting into cart and cart is turning into order after checkout
  const initialState = [];
  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    testStore = mockStore(initialState);
  });
  afterEach(() => {
    mockAxios.restore();
    testStore.clearActions();
  });
});
