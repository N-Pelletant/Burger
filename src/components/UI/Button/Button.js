import React from 'react';
import classes from './Button.module.css';

function Button(props) {
  return <button
    className={[classes.Button, classes[props.BtnType]].join(" ")}
    onClick={props.clicked}>
    {props.children}
  </button>
}

export default Button;