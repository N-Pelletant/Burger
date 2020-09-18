import React from 'react';

import burgerLogo from './../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

function Logo(props) {
  return (
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="Burger logo"/>
    </div>
  );
}

export default Logo;