import React, { Component } from 'react';
import { connect } from 'react-redux';

import SideDrawer from './../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from './../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';


class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  }

  sideDrawerOpenedHandler = () => {
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
  }

  render() {
    return (
      <>
        <Toolbar
          isAuth={this.props.isAuth}
          drawerToggleClicked={this.sideDrawerOpenedHandler} />
        <SideDrawer
          isAuth={this.props.isAuth}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: !!state.auth.token
  }
}

// const mapDispatchToProps = dispatch => {
//   return {

//   }
// }

export default connect(mapStateToProps)(Layout);