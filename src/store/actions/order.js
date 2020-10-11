import * as actionTypes from './actionTypes';
import AxiosInstance from './../../axios-orders'

export const purchaseBurgerSuccess = (id, orderData) => {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  }
}

export const purchaseBurgerFail = (error) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error,
  }
}

export const purchaseBurgerStart = () => {
  return {
    type: actionTypes.PURCHASE_BURGER_START
  }
}

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(purchaseBurgerStart());
    AxiosInstance
      .post('/orders.json?auth=' + token, orderData)
      .then((resp) => {
        dispatch(purchaseBurgerSuccess(resp.data.name, orderData))
      })
      .catch((error) => {
        dispatch(purchaseBurgerFail(error))
      });
  }
}

export const purchaseInit = () => {
  return {
    type: actionTypes.PURCHASE_INIT
  }
}

export const fetchOrdersStart = () => {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  }
}

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders,
  }
}

export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    error,
  }
}

export const fetchOrders = (token, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart())
    const queryParams = `?auth=${token}&orderBy="userId"&equalTo="${userId}"`;
    AxiosInstance
      .get('/orders.json' + queryParams)
      .then(res => {
        const fetchedOrders = []

        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }

        dispatch(fetchOrdersSuccess(fetchedOrders))
      })
      .catch((e) => {
        dispatch(fetchOrdersFail(e))
      })
  }
}

export const deleteOrder = (orderId) => {
  return dispatch => {
    AxiosInstance
      .delete('/orders.json', {params:{id: orderId}})
      .then(() => dispatch(fetchOrders()))
      .catch((e) => console.log(e))
  }
}