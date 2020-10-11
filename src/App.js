import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';

class App extends Component {
  componentDidMount = () => {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = <Switch>
      <Route exact path="/" component={BurgerBuilder} />
      <Route path="/auth" component={Auth} />
      <Redirect to="/" />
    </Switch>

    if (this.props.isAuthenticated) {
      routes = <Switch>
        <Route exact path="/" component={BurgerBuilder} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/orders" component={Orders} />
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
