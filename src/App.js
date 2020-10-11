import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import asyncComponent from './hoc/AsyncComponent/AsyncComponent'
import * as actions from './store/actions/index';
import { connect } from 'react-redux';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout')
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth')
});

class App extends Component {
  componentDidMount = () => {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = <Switch>
      <Route exact path="/" component={BurgerBuilder} />
      <Route path="/auth" component={asyncAuth} />
      <Redirect to="/" />
    </Switch>

    if (this.props.isAuthenticated) {
      routes = <Switch>
        <Route exact path="/" component={BurgerBuilder} />
        <Route path="/auth" component={asyncAuth} />
        <Route path="/checkout" component={asyncCheckout} />
        <Route path="/orders" component={asyncOrders} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    }

    return <Layout>
      {routes}
    </Layout>;
  }
}

const mapStateToPros = state => {
  return {
    isAuthenticated: !!state.auth.token
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToPros, mapDispatchToProps)(App));
