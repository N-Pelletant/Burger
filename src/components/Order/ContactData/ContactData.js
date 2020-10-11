import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';
import Spinner from '../../UI/Spinner/Spinner';
import AxiosInstance from './../../../axios-orders';
import WithErrorHandler from './../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from './../../../store/actions/index';
import { updateObject, checkValidity } from './../../../shared/utility';
import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your email',
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZipCode',
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ],
        },
        value: 'fastest',
        valid: true,
      }
    },
    formIsValid: false,
  }

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId,
    };

    this.props.onOrderBurger(order, this.props.token)
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
      touched: true,
    });
    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    const formIsValid = Object.values(updatedOrderForm).every(input => input.valid)

    this.setState({ orderForm: updatedOrderForm, formIsValid });
  }

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = <form onSubmit={this.orderHandler}>
      {formElementArray.map(elem => (
        <Input key={elem.id}
          elementType={elem.config.elementType}
          elementConfig={elem.config.elementConfig}
          value={elem.config.value}
          touched={elem.config.touched}
          invalid={!elem.config.valid}
          shouldValidate={elem.config.validation}
          changed={(event) => this.inputChangedHandler(event, elem.id)} />
      ))}
      <Button BtnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
    </form>;

    if (this.props.loading) {
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

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(ContactData, AxiosInstance));