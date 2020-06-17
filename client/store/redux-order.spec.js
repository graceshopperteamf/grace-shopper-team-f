import { expect } from 'chai';
import { getOrders, fetchOrders } from './redux-order';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Redux - Order', () => {
  let testStore;
  let mockAxios;

  const initialState = [];

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    testStore = mockStore(initialState);
  });
  afterEach(() => {
    mockAxios.restore();
    testStore.clearActions();
  });
  describe(' Get order action and thunk creator', () => {
    it('getOrders action creator', () => {});
  });
});
