import React, { Component } from 'react';
import Axios from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Modal from './../../components/UI/Modal/Modal';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
  }

  componentDidMount = () => {
    Axios
      .get('/ingredients.json')
      .then(resp => this.setState({ ingredients: resp.data }));
  }

  updatePurchaseState = (newIngredients) => {
    this.setState({
      purchasable: Object.keys(newIngredients).some(igkey => newIngredients[igkey] > 0)
    });
  }

  addIngredientHandler = type => {
    const newState = {
      ...this.state
    };

    newState.ingredients[type]++;
    newState.totalPrice += INGREDIENT_PRICES[type];

    this.setState(newState);
    this.updatePurchaseState(newState.ingredients);
  }

  removeIngredientHandler = type => {
    const newState = {
      ...this.state
    };

    if (newState.ingredients[type] > 0) {
      newState.ingredients[type]--;
      newState.totalPrice -= INGREDIENT_PRICES[type];

      this.setState(newState);
      this.updatePurchaseState(newState.ingredients);
    }
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.setState({ loading: true });
    // alert("You continue")
    const command = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Nicolas Pelletant",
        addres: {
          street: "742 Evergreen terrace",
          zipcode: 12345,
          country: "France"
        },
        email: "email@test.com",
      },
      deliveryMethod: "fast",
    };

    Axios
      .post('/orders.json', command)
      .then(response => {
        this.setState({
          loading: false,
          purchasing: false,
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          purchasing: false,
        });
      });
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }


    let orderSummary = null;
    let burger = <Spinner />

    if (this.state.ingredients) {
      burger = <>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          disabled={disabledInfo}
          addIngredient={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          purchasable={this.state.purchasable}
          ordered={this.purchaseHandler} />
      </>;

      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        price={this.state.totalPrice.toFixed(2)}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />;
    }

    if (this.state.loading) {
      orderSummary = <Spinner />
    }

    return <>
      <Modal show={this.state.purchasing} clicked={this.purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>;
  }
}

export default WithErrorHandler(BurgerBuilder, Axios);