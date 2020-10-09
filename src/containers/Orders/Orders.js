import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import AxiosInstance from './../../axios-orders';
import WithErrorHandler from './../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from './../../store/actions/index';
import Spinner from './../../components/UI/Spinner/Spinner';

class Orders extends Component {
  componentDidMount = () => {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner />

    if (!this.props.loading) {
      orders = this.props.orders.map(elem => (
        <Order
          key={elem.id}
          ingredients={elem.ingredients}
          price={+elem.price}
          delete={() => this.props.onDeleteOrder(elem.id)} />
      ))
    }

    return orders;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
    onDeleteOrder: (orderId) => dispatch(actions.deleteOrder(orderId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Orders, AxiosInstance));