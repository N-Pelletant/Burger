import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Meat", type: "meat" },
  { label: "Cheese", type: "cheese" },
]

function BuildControls(props) {
  return (
    <div className={classes.BuildControls}>
      <p className={classes.Price}>Current price : <strong>${props.price.toFixed(2)}</strong></p>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          isDisabled={props.disabled[ctrl.type]}
          addIngredient={() => props.addIngredient(ctrl.type)} 
          removeIngredient={() => props.removeIngredient(ctrl.type)}/>
      ))}
      <button 
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}>ORDER NOW</button>
    </div>
  );
}

export default BuildControls;