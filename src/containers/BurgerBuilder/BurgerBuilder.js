import React, { Component } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Modal from './../../components/UI/Modal/Modal';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
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
    this.setState({purchasing: true});
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  }

  purchaseContinueHandler = () => {
    alert("You continue")
  }

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }

    return <>
      <Modal 
        show={this.state.purchasing}
        modalClosed={this.purchaseCancelHandler}>
        <OrderSummary 
          ingredients={this.state.ingredients}
          price={this.state.totalPrice.toFixed(2)}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler} />
      </Modal>
      <Burger ingredients={this.state.ingredients} />
      <BuildControls
        price={this.state.totalPrice}
        disabled={disabledInfo}
        addIngredient={this.addIngredientHandler}
        removeIngredient={this.removeIngredientHandler}
        purchasable={this.state.purchasable} 
        ordered={this.purchaseHandler}/>
    </>;
  }
}

export default BurgerBuilder;