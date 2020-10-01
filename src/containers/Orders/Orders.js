import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import AxiosInstance from './../../axios-orders';
import WithErrorHandler from './../../hoc/WithErrorHandler/WithErrorHandler'

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  }

  componentWillMount = () => {
    AxiosInstance
      .get('/orders.json')
      .then(res => {
        const fetchedOrders = []
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ loading: false, orders: fetchedOrders })
      })
      .catch(() => {
        this.setState({ loading: false })
      });
  }

  render() {
    return this.state.orders.map(elem => (
      <Order
        key={elem.id}
        ingredients={elem.ingredients}
        price={+elem.price} />
    ))
  }
}

export default WithErrorHandler(Orders, AxiosInstance);