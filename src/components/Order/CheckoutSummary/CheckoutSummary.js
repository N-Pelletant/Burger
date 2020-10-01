import React from 'react';
import Burger from './../../Burger/Burger';
import Button from './../../UI/Button/Button';

import classes from './CheckoutSummary.module.css';

function CheckoutSummary(props) {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it taste well!</h1>
      <div style={{width: "100%", margin: "auto"}}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button 
        BtnType="Danger"
        clicked={props.checkoutCancelled}>CANCEL</Button>
      <Button 
        BtnType="Success"
        clicked={props.checkoutContinued}>CONTINUE</Button>
    </div>
  );
}

export default CheckoutSummary;