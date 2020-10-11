import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from './../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.module.css';

function SideDrawer(props) {
  const attachedClasses = [classes.SideDrawer];
  if(props.open) {
    attachedClasses.push(classes.Open)
  } else {
    attachedClasses.push(classes.Close)
  }

  return <>
    <Backdrop show={props.open} clicked={props.closed}/>
    <div className={attachedClasses.join(" ")}>
      <div className={classes.Logo}>
        <Logo />
      </div>
      <nav>
        <NavigationItems isAuthenticated={props.isAuth} />
      </nav>
    </div>
  </>;
}

export default SideDrawer;