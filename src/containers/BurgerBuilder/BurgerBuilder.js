import React, { Component } from 'react';
import { connect } from 'react-redux';

import AxiosInstance from '../../axios-orders';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from './../../store/actions/index';
import Modal from './../../components/UI/Modal/Modal';



class BurgerBuilder extends Component {
  state = {
    purchasing: false,
  }

  componentDidMount = () => {
    this.props.onInitIngredients()
  }

  updatePurchaseState = () => {
    return Object.values(this.props.ings).some(amount => amount > 0);
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0
    }


    let orderSummary = null;
    let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />

    if (this.props.ings) {
      burger = <>
        <Burger ingredients={this.props.ings} />
        <BuildControls
          price={this.props.price}
          disabled={disabledInfo}
          addIngredient={this.props.onIngredientAdded}
          removeIngredient={this.props.onIngredientRemoved}
          purchasable={this.updatePurchaseState()}
          ordered={this.purchaseHandler} />
      </>;

      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        price={this.props.price.toFixed(2)}
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler} />;
    }

    return <>
      <Modal show={this.state.purchasing} clicked={this.purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </>;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ing => dispatch(actions.addIngredient(ing)),
    onIngredientRemoved: ing => dispatch(actions.removeIngredient(ing)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, AxiosInstance));