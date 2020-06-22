import React from 'react';
import Routes from './routes';
import { Navbar, CheckoutForm } from './components';
import Container from '@material-ui/core/Container';

const App = () => {
  return (
    <Container>
      <Navbar />
      <Routes />
      <CheckoutForm />
    </Container>
  );
};

export default App;
