import { expect } from 'chai';

import { GET_ORDER, fetchSingleOrder } from './redux-single-order';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';


const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('thunk creators', () => {
  let store;
  let mockAxios;

  const initialState = [];

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  afterEach(() => {
    mockAxios.restore();
    store.clearActions();
  });

  describe('getSingleOrder', (orderId) => {
    it('eventually dispatches the GET SINGLE ORDER action', async () => {
      mockAxios.onGet(`/api/orders/${orderId}`).replyOnce(200);
      await store.dispatch(fetchSingleOrder());
      const actions = store.getActions();
      expect(actions[0].type).to.be.equal(GET_ORDER);
    });
  });

});
