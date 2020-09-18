import React, { Component } from 'react';

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
          drawerToggleClicked={this.sideDrawerOpenedHandler}/>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </>
    );
  }
}

export default Layout;