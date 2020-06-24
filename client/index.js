import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import history from './history';
import store from './store';
import App from './app';
import { ToastContainer } from 'react-toastify';


// establishes socket connection
import './socket';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>

      <App />

    </Router>
    <ToastContainer />
  </Provider>,
  document.getElementById('app')
);
