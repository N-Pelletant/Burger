import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import Spinner from '../../UI/Spinner/Spinner';
import Axios from './../../../axios-orders';

import classes from './ContactData.module.css'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: '',
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });

    const command = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "Nicolas Pelletant",
        email: "email@test.com",
        addres: {
          street: "742 Evergreen terrace",
          postalCode: 12345
        },
      }
    };

    Axios
      .post('/orders.json', command)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({ loading: false });
      });
  }

  render() {
    let form = <form>
      <input type="text" name="name" placeholder="Your name" />
      <input type="email" name="email" placeholder="Your email" />
      <input type="text" name="street" placeholder="Street" />
      <input type="text" name="postal" placeholder="Postal code" />
      <Button BtnType="Success" clicked={this.orderHandler}>ORDER</Button>
    </form>;

    if (this.state.loading) {
      form = <Spinner />
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;