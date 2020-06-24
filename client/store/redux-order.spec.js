// import { expect } from 'chai';

// import { GET_ORDERS, fetchOrders } from './redux-order';

// import axios from 'axios';
// import MockAdapter from 'axios-mock-adapter';
// import configureMockStore from 'redux-mock-store';
// import thunkMiddleware from 'redux-thunk';
// import history from '../history';

// const middlewares = [thunkMiddleware];
// const mockStore = configureMockStore(middlewares);

// describe('thunk creators', () => {
//   let store;
//   let mockAxios;

//   const initialState = [];

//   beforeEach(() => {
//     mockAxios = new MockAdapter(axios);
//     store = mockStore(initialState);
//   });

//   afterEach(() => {
//     mockAxios.restore();
//     store.clearActions();
//   });

//   describe('getOrders', () => {
//     it('eventually dispatches the GET ORDER action', async () => {
//       mockAxios.onGet('/api/orders').replyOnce(200);
//       await store.dispatch(fetchOrders());
//       const actions = store.getActions();
//       expect(actions[0].type).to.be.equal(GET_ORDERS);
//     });
//   });

// });
