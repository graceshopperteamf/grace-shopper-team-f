import React from 'react';

import {Navbar} from './components';
import Routes from './routes';
import AllProducts from './components/AllProducts';
import products from '../script/seed-product';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <AllProducts products={products} />
    </div>
  );
};

export default App;
