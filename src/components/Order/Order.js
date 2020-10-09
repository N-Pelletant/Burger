import React from 'react';
import classes from './Order.module.css';

function Order(props) {
  const ingredients = [];

  for (let igName in props.ingredients) {
    if (props.ingredients[igName] > 0) {
      ingredients.push({
        name: igName,
        amount: +props.ingredients[igName],
      });
    }
  }

  const ingredientsOutput = ingredients.map(ig => (
    <span
      key={ig.name}
      style={{ textTransform: "capitalize", display: "inline-block", margin: "0 8px", border: "1px solid #ccc", padding: "5px" }}>
      {ig.name} ({ig.amount})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientsOutput}</p>
      <p>Price: <strong>{props.price.toFixed(2)} €</strong></p>
      <button onClick={props.delete}>Delete order</button>
    </div>
  );
}

export default Order;