import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

function NavigationItems(props) {
  let isAuthItems = <NavigationItem link="/auth">Authenticate</NavigationItem>

  if (props.isAuthenticated) {
    isAuthItems = <>
      <NavigationItem link="/orders">Orders</NavigationItem>
      <NavigationItem link="/logout">Logout</NavigationItem>
    </>
  }

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger builder</NavigationItem>
      {isAuthItems}
    </ul>
  );
}

export default NavigationItems;