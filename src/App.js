import React from 'react';
import { Route } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

function App() {
  return <Layout>
    <Route exact path="/" component={BurgerBuilder} />
    <Route path="/checkout" component={Checkout} />
    <Route path="/orders" component={Orders} />
  </Layout>;
}

export default App;
