import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

function NavigationItems(props) {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger builder</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
  );
}

export default NavigationItems;