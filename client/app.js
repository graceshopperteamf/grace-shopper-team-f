import React from 'react';
import Routes from './routes';
import { Navbar } from './components';
import Container from '@material-ui/core/Container';

const App = () => {
  return (
    <Container>
      <Navbar />
      <Routes />
    </Container>
  );
};

export default App;
